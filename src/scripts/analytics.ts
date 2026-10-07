// Sends a custom event to Google Analytics 4 through Cloudflare Zaraz.
// Zaraz is configured in the Cloudflare dashboard, not in this repo. If it is
// not loaded (blocked, not set up, or local preview) this does nothing and
// never throws.

type EventParams = Record<string, string>;

declare global {
  interface Window {
    zaraz?: { track?: (name: string, params?: EventParams) => unknown };
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  try {
    const result = window.zaraz?.track?.(name, params);
    if (result instanceof Promise) result.catch(() => {});
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
