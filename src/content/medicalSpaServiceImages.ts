/**
 * Medical spa service / modality imagery, see `public/assets/sections/medical-spa-services/README.md`.
 */
/** Production / marketing modality photography (named files). */
export const MEDICAL_SPA_NAMED_IMAGES = {
  emsellaBtlChairRoom: "/assets/sections/medical-spa-services/emsella-btl-chair-treatment-room.webp",
  emsellaChairPatientLifestyle:
    "/assets/sections/medical-spa-services/emsella-chair-patient-lifestyle.webp",
  emsculptNeoArmTreatmentLifestyle:
    "/assets/sections/medical-spa-services/emsculpt-neo-arm-treatment-lifestyle.webp",
  emsculptNeoAbdominalTreatmentMale:
    "/assets/sections/medical-spa-services/emsculpt-neo-abdominal-treatment-male.webp",
  emsculptNeoVanityRoomConsole:
    "/assets/sections/medical-spa-services/emsculpt-neo-vanity-room-console.webp",
  emsculptNeoConsoleCloseup: "/assets/sections/medical-spa-services/emsculpt-neo-console-closeup.webp",
  emfaceCheekApplicatorTreatment:
    "/assets/sections/medical-spa-services/emface-cheek-applicator-treatment.webp",
  emfaceForeheadRedLightTreatment:
    "/assets/sections/medical-spa-services/emface-forehead-red-light-treatment.webp",
  emfaceBtlConsoleFacialTreatment:
    "/assets/sections/medical-spa-services/emface-btl-console-facial-treatment.webp",
  exomindPromotionalDisplayCounter:
    "/assets/sections/medical-spa-services/exomind-promotional-display-counter.webp",
  exomindBtlConsoleTreatmentBed:
    "/assets/sections/medical-spa-services/exomind-btl-console-treatment-bed.webp",
  styku3dBodyScannerSetup: "/assets/sections/medical-spa-services/styku-3d-body-scanner-setup.webp",
} as const;

export const MEDICAL_SPA_SERVICE_IMAGES = [
  "/assets/sections/medical-spa-services/service-01.webp",
  "/assets/sections/medical-spa-services/service-02.webp",
  "/assets/sections/medical-spa-services/service-03.webp",
  "/assets/sections/medical-spa-services/service-04.webp",
  "/assets/sections/medical-spa-services/service-05.webp",
  "/assets/sections/medical-spa-services/service-06.webp",
] as const;

export type MedicalSpaServiceImageSrc = (typeof MEDICAL_SPA_SERVICE_IMAGES)[number];

export type MedicalSpaNamedImageSrc =
  (typeof MEDICAL_SPA_NAMED_IMAGES)[keyof typeof MEDICAL_SPA_NAMED_IMAGES];
