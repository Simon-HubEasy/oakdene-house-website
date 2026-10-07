// Sends a custom event to Google Analytics 4 (property G-LGB2GV15KV).
// GA4 is installed through Cloudflare's Google tag gateway, which serves the
// tag first-party from /metrics/ and defines window.gtag on every page. There
// is no GA script in this repo, and GA4 must not also be added in Zaraz (that
// was removed on purpose to stop double-counting). If gtag is not loaded
// (blocked, or local preview) this does nothing and never throws.

type EventParams = Record<string, string>;

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: EventParams) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  } catch {
    // Analytics must never break the page.
  }
}

// Which page an event came from, in words GA4 reports can use. Not called
// page_location, because GA4 reserves that name for the full page URL.
export function videoLocation(pathname: string = window.location.pathname): string {
  if (pathname === '/') return 'homepage';
  if (pathname.startsWith('/about/the-oakdene-story/video')) return 'watch_page';
  if (pathname.startsWith('/resources')) return 'resources_page';
  return pathname;
}
