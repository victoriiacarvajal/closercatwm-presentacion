export function clarityEvent(name: string) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.clarity === 'function') {
    try {
      w.clarity('event', name);
    } catch {
      // ignore
    }
  }
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
