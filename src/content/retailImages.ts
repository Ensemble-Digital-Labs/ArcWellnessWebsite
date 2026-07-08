/**
 * In-clinic retail, financing, and injection-bar photography.
 * Files under `public/assets/sections/retail/`.
 */
export const RETAIL_IMAGES = {
  injectionBarMenuDisplay: "/assets/sections/retail/injection-bar-menu-display.webp",
  patientFiFinancingBrochure: "/assets/sections/retail/patientfi-financing-brochure.webp",
  arcSupplementShelvingUnits: "/assets/sections/retail/arc-supplement-shelving-units.webp",
  foundationSupplementProtocolDisplay:
    "/assets/sections/retail/foundation-supplement-protocol-display.webp",
  gutResetSupplementProtocolDisplay:
    "/assets/sections/retail/gut-reset-supplement-protocol-display.webp",
} as const;

export type RetailImageSrc = (typeof RETAIL_IMAGES)[keyof typeof RETAIL_IMAGES];
