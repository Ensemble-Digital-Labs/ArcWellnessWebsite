/**
 * Medical spa service / modality imagery — see `public/assets/sections/medical-spa-services/README.md`.
 */
/** Production / marketing modality photography (named files). */
export const MEDICAL_SPA_NAMED_IMAGES = {
  emsellaBtlChairRoom: "/assets/sections/medical-spa-services/emsella-btl-chair-treatment-room.png",
  emsellaChairPatientLifestyle:
    "/assets/sections/medical-spa-services/emsella-chair-patient-lifestyle.png",
  emsculptNeoArmTreatmentLifestyle:
    "/assets/sections/medical-spa-services/emsculpt-neo-arm-treatment-lifestyle.png",
  emsculptNeoAbdominalTreatmentMale:
    "/assets/sections/medical-spa-services/emsculpt-neo-abdominal-treatment-male.png",
  emsculptNeoVanityRoomConsole:
    "/assets/sections/medical-spa-services/emsculpt-neo-vanity-room-console.png",
  emsculptNeoConsoleCloseup: "/assets/sections/medical-spa-services/emsculpt-neo-console-closeup.png",
  emfaceCheekApplicatorTreatment:
    "/assets/sections/medical-spa-services/emface-cheek-applicator-treatment.png",
  emfaceForeheadRedLightTreatment:
    "/assets/sections/medical-spa-services/emface-forehead-red-light-treatment.png",
  emfaceBtlConsoleFacialTreatment:
    "/assets/sections/medical-spa-services/emface-btl-console-facial-treatment.png",
  exomindPromotionalDisplayCounter:
    "/assets/sections/medical-spa-services/exomind-promotional-display-counter.png",
  exomindBtlConsoleTreatmentBed:
    "/assets/sections/medical-spa-services/exomind-btl-console-treatment-bed.png",
  styku3dBodyScannerSetup: "/assets/sections/medical-spa-services/styku-3d-body-scanner-setup.png",
} as const;

export const MEDICAL_SPA_SERVICE_IMAGES = [
  "/assets/sections/medical-spa-services/service-01.png",
  "/assets/sections/medical-spa-services/service-02.png",
  "/assets/sections/medical-spa-services/service-03.png",
  "/assets/sections/medical-spa-services/service-04.png",
  "/assets/sections/medical-spa-services/service-05.png",
  "/assets/sections/medical-spa-services/service-06.png",
] as const;

export type MedicalSpaServiceImageSrc = (typeof MEDICAL_SPA_SERVICE_IMAGES)[number];

export type MedicalSpaNamedImageSrc =
  (typeof MEDICAL_SPA_NAMED_IMAGES)[keyof typeof MEDICAL_SPA_NAMED_IMAGES];
