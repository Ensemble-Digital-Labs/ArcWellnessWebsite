/**
 * St. Louis location decoration imagery — see `public/assets/location/st-louis/README.md`.
 *
 * **labeled/** — shots that include on-frame typography / signage / watermarks (editorial use).
 * **unlabeled/** — clean plates (no labels); prefer for overlays and floating cards.
 */

export const STL_LOUIS_LABELED_DECORATION = [
  "/assets/location/st-louis/labeled/decoration-01.png",
  "/assets/location/st-louis/labeled/decoration-02.png",
  "/assets/location/st-louis/labeled/decoration-03.png",
  "/assets/location/st-louis/labeled/decoration-04.png",
  "/assets/location/st-louis/labeled/decoration-05.png",
  "/assets/location/st-louis/labeled/decoration-06.png",
] as const;

export const STL_LOUIS_UNLABELED_DECORATION = [
  "/assets/location/st-louis/unlabeled/decoration-01.png",
  "/assets/location/st-louis/unlabeled/decoration-02.png",
  "/assets/location/st-louis/unlabeled/decoration-03.png",
  "/assets/location/st-louis/unlabeled/decoration-04.png",
  "/assets/location/st-louis/unlabeled/decoration-05.png",
  "/assets/location/st-louis/unlabeled/decoration-06.png",
] as const;

/** All 12 assets: labeled first (01–06), then unlabeled (01–06). */
export const STL_DECORATION_IMAGES = [
  ...STL_LOUIS_LABELED_DECORATION,
  ...STL_LOUIS_UNLABELED_DECORATION,
] as const;

export type StlLabeledDecorationSrc = (typeof STL_LOUIS_LABELED_DECORATION)[number];
export type StlUnlabeledDecorationSrc = (typeof STL_LOUIS_UNLABELED_DECORATION)[number];
export type StlDecorationSrc = (typeof STL_DECORATION_IMAGES)[number];
