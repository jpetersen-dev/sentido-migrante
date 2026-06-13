import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCleanBaseHost(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.host; // Includes port if local
    // Clean any leading 'app.' or 'www.' recursively or in sequence
    return host.replace(/^(app\.|www\.)+/i, '');
  }
  // Server-side fallback
  const isLocal = process.env.NEXT_PUBLIC_COOKIE_DOMAIN?.includes('local') || process.env.NODE_ENV !== 'production';
  return isLocal ? 'sentidomigrante.local:3000' : 'sentidomigrante.com';
}

export function getAppUrl(path: string = ''): string {
  const baseHost = getCleanBaseHost();
  const proto = typeof window !== 'undefined' 
    ? `${window.location.protocol}//` 
    : (process.env.NODE_ENV === 'production' ? 'https://' : 'http://');
  return `${proto}app.${baseHost}${path}`;
}

export function getLandingUrl(path: string = ''): string {
  const baseHost = getCleanBaseHost();
  const proto = typeof window !== 'undefined' 
    ? `${window.location.protocol}//` 
    : (process.env.NODE_ENV === 'production' ? 'https://' : 'http://');
  return `${proto}${baseHost}${path}`;
}

