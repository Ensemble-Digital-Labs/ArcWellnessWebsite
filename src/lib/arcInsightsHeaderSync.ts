export const ARC_INSIGHTS_HEADER_CHROME_EVENT = "arc-insights-header-chrome";

/** @deprecated Use `ARC_INSIGHTS_HEADER_CHROME_EVENT` */
export const ARC_INSIGHTS_MASTHEAD_VISIBILITY_EVENT = ARC_INSIGHTS_HEADER_CHROME_EVENT;

export type ArcInsightsHeaderChromeDetail = {
  mastheadVisible: boolean;
  /** Viewport top has reached the invest CTA section (`#book`). */
  ctaSectionVisible: boolean;
};

/** @deprecated Use `ArcInsightsHeaderChromeDetail` */
export type ArcInsightsMastheadVisibilityDetail = {
  mastheadVisible: boolean;
};

export const INSIGHTS_HEADER_CHROME_RESET: ArcInsightsHeaderChromeDetail = {
  mastheadVisible: true,
  ctaSectionVisible: false,
};

let insightsHeaderChrome: ArcInsightsHeaderChromeDetail = {
  ...INSIGHTS_HEADER_CHROME_RESET,
};

export function insightsLogoShouldHide(
  mastheadVisible: boolean,
  ctaSectionVisible: boolean,
): boolean {
  return !mastheadVisible && !ctaSectionVisible;
}

/** Logo home link active near page top, or again once the CTA section top is reached. */
export function insightsLogoHomeLinkActive(
  scrollY: number,
  ctaSectionVisible: boolean,
  topScrollMax = 120,
): boolean {
  return scrollY < topScrollMax || ctaSectionVisible;
}

export function dispatchInsightsHeaderChrome(detail: ArcInsightsHeaderChromeDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ArcInsightsHeaderChromeDetail>(ARC_INSIGHTS_HEADER_CHROME_EVENT, {
      detail,
    }),
  );
}

export function updateInsightsHeaderChrome(patch: Partial<ArcInsightsHeaderChromeDetail>) {
  const next: ArcInsightsHeaderChromeDetail = { ...insightsHeaderChrome, ...patch };
  if (
    next.mastheadVisible === insightsHeaderChrome.mastheadVisible &&
    next.ctaSectionVisible === insightsHeaderChrome.ctaSectionVisible
  ) {
    return;
  }
  insightsHeaderChrome = next;
  dispatchInsightsHeaderChrome(next);
}

export function resetInsightsHeaderChrome() {
  insightsHeaderChrome = { ...INSIGHTS_HEADER_CHROME_RESET };
  dispatchInsightsHeaderChrome(insightsHeaderChrome);
}

/** @deprecated Use `dispatchInsightsHeaderChrome` */
export function dispatchInsightsMastheadVisibility(mastheadVisible: boolean) {
  updateInsightsHeaderChrome({ mastheadVisible, ctaSectionVisible: false });
}

/** @deprecated Use `dispatchInsightsHeaderChrome` */
export function dispatchInsightsFilterVisibility(filterBarVisible: boolean) {
  dispatchInsightsMastheadVisibility(filterBarVisible);
}

export type ArcInsightsFilterVisibilityDetail = {
  filterBarVisible: boolean;
};
