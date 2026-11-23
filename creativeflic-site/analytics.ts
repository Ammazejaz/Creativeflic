// Our own site analytics (Google Analytics 4).
// Paste the GA4 Measurement ID below (it looks like 'G-XXXXXXXXXX').
// While it is empty, nothing loads and track() does nothing.
export const GA_MEASUREMENT_ID = 'G-S0T7HF3KDY';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || window.gtag) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

/** Send a custom event, e.g. track('generate_lead', { form: 'free_audit' }). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (window.gtag) window.gtag('event', event, params);
}
