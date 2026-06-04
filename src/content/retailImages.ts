/**
 * In-clinic retail, financing, and injection-bar photography.
 * Files under `public/assets/sections/retail/`.
 */
export const RETAIL_IMAGES = {
  injectionBarMenuDisplay: "/assets/sections/retail/injection-bar-menu-display.png",
  patientFiFinancingBrochure: "/assets/sections/retail/patientfi-financing-brochure.png",
  arcSupplementShelvingUnits: "/assets/sections/retail/arc-supplement-shelving-units.png",
  foundationSupplementProtocolDisplay:
    "/assets/sections/retail/foundation-supplement-protocol-display.png",
  gutResetSupplementProtocolDisplay:
    "/assets/sections/retail/gut-reset-supplement-protocol-display.png",
} as const;

export type RetailImageSrc = (typeof RETAIL_IMAGES)[keyof typeof RETAIL_IMAGES];
