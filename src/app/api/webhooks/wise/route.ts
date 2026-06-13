import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Verifies the cryptographic signature of the Wise webhook request.
 * Supports RSA-SHA256 (standard Wise format), symmetric token match, or HMAC-SHA256.
 * Bypasses verification only in non-production environments when the signature key is not configured.
 */
function verifyWiseSignature(rawBody: string, signature: string | null): boolean {
  const secretKey = process.env.WISE_WEBHOOK_SIGNATURE_KEY;

  if (!secretKey) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Wise Webhook Verification Error]: WISE_WEBHOOK_SIGNATURE_KEY is missing in production. Signature verification rejected.');
      return false;
    }
    console.warn('[Wise Webhook Warning]: WISE_WEBHOOK_SIGNATURE_KEY is not defined. Bypassing signature verification in non-production.');
    return true;
  }

  if (!signature) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Wise Webhook Verification Error]: Signature header (X-Signature-SHA256) is missing in production.');
      return false;
    }
    console.warn('[Wise Webhook Warning]: Signature header (X-Signature-SHA256) is missing. Bypassing signature verification in non-production for local simulation.');
    return true;
  }

  // Normalize newlines in PEM format (replaces escaped newlines like "\\n" with real newlines)
  const normalizedKey = secretKey.replace(/\\n/g, '\n').trim();

  // Case 1: RSA Public Key Signature Verification (Wise Standard)
  if (normalizedKey.includes('-----BEGIN PUBLIC KEY-----') || normalizedKey.length > 150) {
    try {
      const verifier = crypto.createVerify('RSA-SHA256');
      verifier.update(rawBody, 'utf8');
      
      let pemKey = normalizedKey;
      if (!pemKey.includes('-----BEGIN PUBLIC KEY-----')) {
        pemKey = `-----BEGIN PUBLIC KEY-----\n${pemKey}\n-----END PUBLIC KEY-----`;
      }

      const isRsaValid = verifier.verify(pemKey, signature, 'base64');
      if (isRsaValid) {
        console.log('[Wise Webhook Verification]: RSA Signature successfully verified.');
        return true;
      }
    } catch (err: any) {
      console.error('[Wise Webhook Verification Error]: RSA signature check failed:', err.message);
    }
  }

  // Case 2: Direct token comparison (for mock testing / sandbox environments)
  if (signature === secretKey) {
    console.log('[Wise Webhook Verification]: Signature matches the configured key directly (Token Mode).');
    return true;
  }

  // Case 3: HMAC-SHA256 comparison fallback (supports base64 or hex outputs)
  try {
    const hmacBase64 = crypto.createHmac('sha256', secretKey).update(rawBody).digest('base64');
    const hmacHex = crypto.createHmac('sha256', secretKey).update(rawBody).digest('hex');
    if (signature === hmacBase64 || signature === hmacHex) {
      console.log('[Wise Webhook Verification]: HMAC Signature successfully verified.');
      return true;
    }
  } catch (err: any) {
    console.error('[Wise Webhook Verification Error]: HMAC verification fallback failed:', err.message);
  }

  console.error('[Wise Webhook Verification Error]: Signature verification failed.');
  return false;
}

/**
 * Maps the Wise status or state and event type to a standard status used by Strapi.
 */
function mapWiseStatusToStrapi(status: string, eventType: string): 'paid' | 'pending' | 'failed' {
  const normalizedStatus = status.toLowerCase();
  
  if (eventType === 'balance_deposit' || eventType === 'balances#credit') {
    // For balance_deposit or balances#credit, if the status is not explicitly failed or cancelled, it means the deposit succeeded
    if (normalizedStatus === 'failed' || normalizedStatus === 'cancelled') {
      return 'failed';
    }
    return 'paid';
  }

  // For transfer_state_change or transfers#state-change
  if (['completed', 'processing', 'outgoing_payment_sent', 'funds_delivered', 'paid'].includes(normalizedStatus)) {
    return 'paid';
  }
  
  if (['failed', 'cancelled', 'bounced', 'returned'].includes(normalizedStatus)) {
    return 'failed';
  }

  return 'pending';
}

export async function POST(req: NextRequest) {
  let rawBody = '';
  try {
    // 1. Extract raw request body for signature verification
    rawBody = await req.text();
    
    // 2. Retrieve the signature header (case-insensitive)
    const signature = req.headers.get('x-signature-sha256') || req.headers.get('X-Signature-SHA256');

    // 3. Verify authenticity of the sender
    const isValid = verifyWiseSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid signature' },
        { status: 401 }
      );
    }

    // 4. Parse the payload
    const payload = JSON.parse(rawBody);
    console.log('[Wise Webhook Received]: parsed payload successfully', JSON.stringify(payload, null, 2));

    const { event_type, data } = payload;
    const eventType = event_type || payload.event_type;

    // Supported event types
    const supportedEvents = [
      'balance_deposit',
      'balances#credit',
      'transfer_state_change',
      'transfers#state-change',
      'balances#update'
    ];

    if (!supportedEvents.includes(eventType)) {
      console.log(`[Wise Webhook]: Event type "${eventType}" is not processed by this handler.`);
      return NextResponse.json({ success: true, message: `Event type "${eventType}" ignored.` });
    }

    // 5. Extract payment data safely
    const reference = data?.reference || 
                      data?.payment_reference ||
                      data?.details?.payment_reference ||
                      data?.description ||
                      data?.resource?.id?.toString() || 
                      payload?.resource_id?.toString() || 
                      data?.transferId?.toString();

    let amount = data?.amount;
    if (typeof amount === 'object' && amount !== null) {
      amount = amount.value || amount.amount;
    }

    const currency = data?.currency || 
                     (typeof data?.amount === 'object' ? data?.amount?.currency : undefined) || 
                     data?.resource?.currency ||
                     data?.amount?.currency;

    const status = data?.status || 
                   data?.current_state || 
                   data?.state || 
                   payload?.current_state || 
                   'unknown';

    if (!reference) {
      console.error('[Wise Webhook Error]: Could not extract payment reference from payload:', payload);
      return NextResponse.json(
        { success: false, error: 'Bad Request: Missing payment reference' },
        { status: 400 }
      );
    }

    const strapiStatus = mapWiseStatusToStrapi(status, eventType);

    console.log(`[Wise Webhook SUCCESS]: Payment extracted. Ref: ${reference}, Amount: ${amount || 'N/A'} ${currency || 'N/A'}, Status: ${status} (Mapped to: ${strapiStatus})`);

    // 6. Notify backend (Strapi) to confirm the appointment
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
    const strapiToken = process.env.STRAPI_API_TOKEN;

    if (!strapiToken) {
      console.warn('[Wise Webhook Warning]: STRAPI_API_TOKEN is not configured.');
    }

    const targetUrl = `${strapiUrl}/api/bookings/confirm`;
    console.log(`[Wise Webhook Callback]: Forwarding status update to Strapi at ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(strapiToken ? { 'Authorization': `Bearer ${strapiToken}` } : {})
      },
      body: JSON.stringify({
        reference,
        amount: amount ? Number(amount) : undefined,
        currency,
        status: strapiStatus,
        rawStatus: status,
        eventType
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Wise Webhook Error]: Strapi booking confirmation failed with status ${response.status}:`, errorText);
      return NextResponse.json({
        success: false,
        error: `Strapi API failed with status ${response.status}`,
        details: errorText
      }, { status: 502 });
    }

    const responseData = await response.json();
    console.log('[Wise Webhook Success]: Booking successfully updated in Strapi backend:', JSON.stringify(responseData));

    return NextResponse.json({
      success: true,
      message: `Booking payment for ref ${reference} processed. Strapi status: ${strapiStatus}`,
      details: { reference, amount, currency, status: strapiStatus }
    });

  } catch (error: any) {
    console.error('[Wise Webhook Error]: Unhandled exception processing webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 400 }
    );
  }
}
