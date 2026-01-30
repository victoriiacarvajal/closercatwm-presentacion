export const encodeQuoteData = (data: any) => {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    console.error('Error encoding quote data:', e);
    return '';
  }
};

export const decodeQuoteData = (str: string) => {
  try {
    // URL safe base64 decode
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
  } catch (e) {
    console.error('Error decoding quote data:', e);
    return null;
  }
};

export function clarityEvent(name: string, data?: any) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.clarity === 'function') {
    try {
      w.clarity('event', name, data);
    } catch {
      // ignore
    }
  }
}

export async function sendWebhookEvent(payload: any) {
  const webhookUrl = import.meta.env?.VITE_MAKE_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    // We add common fields to every webhook event
    const enrichedPayload = {
      ...payload,
      created_at: new Date().toISOString(),
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrichedPayload),
    });
  } catch (error) {
    console.warn('Webhook error:', error);
  }
}

/**
 * Unified helper to track events in both Clarity and our central Webhook (Make)
 */
export async function trackFunnelEvent(name: string, data: any = {}, quoteData?: any) {
  const currentParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const utm = getUtmParams(currentParams);

  const eventPayload = {
    ...data,
    quoteId: quoteData?.id || data.quoteId,
    lead: quoteData?.formData || data.lead,
    utm
  };

  // 1. Analytics (Clarity)
  clarityEvent(name, eventPayload);

  // 2. Automation (Webhook/Make)
  await sendWebhookEvent({
    event: name,
    ...eventPayload
  });
}

export function claritySet(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.clarity === 'function') {
    try {
      w.clarity('set', key, value);
    } catch {
      // ignore
    }
  }
}

export function getUtmParams(params: URLSearchParams) {
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
  };
}

export function buildUrlWithUtm(baseUrl: string, additionalParams?: Record<string, string>): string {
  const currentParams = new URLSearchParams(window.location.search);
  const utm = getUtmParams(currentParams);

  const url = new URL(baseUrl, window.location.origin);

  // Add UTM params
  Object.entries(utm).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  // Add additional params
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url.pathname + url.search;
}

export function trackPricingCardView(tier: string) {
  clarityEvent(`pricing_card_${tier}_view`);
}

export function trackPricingCardClick(tier: string, ctaText: string) {
  clarityEvent(`cta_${tier}_click`);
  claritySet('last_pricing_cta', ctaText);
}

export function trackPlanSelection(plan: string) {
  claritySet('selected_plan', plan);
}
