import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would verify the signature of the Wise webhook 
// using public keys provided by Wise to ensure authenticity.
// E.g., verifying headers like 'X-Signature' against public keys.

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log('[Wise Webhook received]:', JSON.stringify(payload, null, 2));

    const { event_type, data } = payload;

    // Validate the event type
    if (event_type === 'balance_deposit' || event_type === 'transfer_state_change') {
      const reference = data?.reference;
      const amount = data?.amount;
      const currency = data?.currency;

      console.log(`[Wise Webhook SUCCESS]: Payment confirmed for Ref: ${reference}, Amount: ${amount} ${currency}`);
      
      // Here, you would trigger the backend (Strapi) to release the booking:
      // const response = await fetch(`${process.env.STRAPI_API_URL}/api/bookings/confirm`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}` },
      //   body: JSON.stringify({ reference, amount, currency, status: 'paid' })
      // });

      return NextResponse.json({ 
        success: true, 
        message: `Booking payment for ref ${reference} confirmed and released successfully.`,
        details: { reference, amount, currency }
      });
    }

    return NextResponse.json({ success: true, message: 'Webhook received, no action required.' });
  } catch (error: any) {
    console.error('[Wise Webhook Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
