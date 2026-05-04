/**
 * Medical spa service / modality imagery — see `public/assets/sections/medical-spa-services/README.md`.
 * Wire into service pages, pillars, or marketing sections as you map each file to a real offering.
 */
export const MEDICAL_SPA_SERVICE_IMAGES = [
  "/assets/sections/medical-spa-services/service-01.png",
  "/assets/sections/medical-spa-services/service-02.png",
  "/assets/sections/medical-spa-services/service-03.png",
  "/assets/sections/medical-spa-services/service-04.png",
  "/assets/sections/medical-spa-services/service-05.png",
  "/assets/sections/medical-spa-services/service-06.png",
] as const;

export type MedicalSpaServiceImageSrc = (typeof MEDICAL_SPA_SERVICE_IMAGES)[number];
