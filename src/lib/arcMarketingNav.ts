import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import { RETAIL_IMAGES } from "@/content/retailImages";

/** Nav preview thumbs — string paths only (avoids circular import with `@/content/site`). */
const NAV_PREVIEW = {
  facialAesthetic: "/assets/sections/whole-body/facial-aesthetic-treatment.webp",
  membershipCohort: "/assets/sections/who-we-are/biometric-consultation-room.webp",
} as const;

/** Primary site navigation — @deprecated Use `@/content/navigation` + `ArcNavDrawerMenu`. Kept for treatment thumb previews. */
export const ARC_PRIMARY_NAV_LINKS = [
  {
    label: "About",
    href: "/about",
    shape: "1",
    previewSrc: CLINIC_INTERIOR_IMAGES.receptionBacklitLogoWall,
  },
  {
    label: "Treatments",
    href: "/treatments",
    shape: "2",
    previewSrc: NAV_PREVIEW.facialAesthetic,
  },
  {
    label: "Arc Aesthetics",
    href: "/aesthetics",
    shape: "3",
    previewSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceBtlConsoleFacialTreatment,
  },
  {
    label: "Arc Programs",
    href: "/programs",
    shape: "4",
    previewSrc: NAV_PREVIEW.membershipCohort,
  },
  {
    label: "Financing",
    href: "/financing",
    shape: "5",
    previewSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
  },
  {
    label: "Insights",
    href: "/case-studies",
    shape: "6",
    previewSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
  },
  {
    label: "Contact",
    href: "/contact",
    shape: "7",
    previewSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
  },
] as const;

/** @deprecated Use `ARC_PRIMARY_NAV_LINKS` */
export const ARC_SITE_NAV_LINKS = ARC_PRIMARY_NAV_LINKS;

/** Individual treatment links for nav “See all” expander (excludes overview hub slug). */
export const ARC_TREATMENT_NAV_LINKS = [
  {
    label: "ExoMind",
    href: "/treatments/exomind",
    thumbSrc: MEDICAL_SPA_NAMED_IMAGES.exomindBtlConsoleTreatmentBed,
  },
  {
    label: "EmSella",
    href: "/treatments/emsella",
    thumbSrc: MEDICAL_SPA_NAMED_IMAGES.emsellaBtlChairRoom,
  },
  {
    label: "EmSculpt Neo",
    href: "/treatments/emsculpt-neo",
    thumbSrc: MEDICAL_SPA_NAMED_IMAGES.emsculptNeoConsoleCloseup,
  },
  {
    label: "EmFace",
    href: "/treatments/emface",
    thumbSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceBtlConsoleFacialTreatment,
  },
  {
    label: "Exion",
    href: "/treatments/exion",
    thumbSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceCheekApplicatorTreatment,
  },
  {
    label: "Daxxify",
    href: "/treatments/daxxify",
    thumbSrc: RETAIL_IMAGES.injectionBarMenuDisplay,
  },
  {
    label: "Neuromodulators",
    href: "/treatments/neuromodulators",
    thumbSrc: CLINIC_INTERIOR_IMAGES.hallwayDaxxifyBannerWaveArt,
  },
  {
    label: "RF Microneedling",
    href: "/treatments/rf-microneedling",
    thumbSrc: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
  },
  {
    label: "Clear RF",
    href: "/treatments/clear-rf",
    thumbSrc: CLINIC_INTERIOR_IMAGES.plantBonsaiWindowSill,
  },
  {
    label: "Dermal Fillers",
    href: "/treatments/rha",
    thumbSrc: NAV_PREVIEW.facialAesthetic,
  },
  // NOTE: Knesko nav leaf removed — offering not active. Restore with:
  // { label: "Knesko", href: "/treatments/knesko", thumbSrc: CLINIC_INTERIOR_IMAGES.retailKneskoSkinProductDisplay },
  {
    label: "Infusion Therapy",
    href: "/treatments/infusion-therapy",
    thumbSrc: CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom,
  },
  {
    label: "Peptide Therapy",
    href: "/treatments/peptide-therapy",
    thumbSrc: NAV_PREVIEW.membershipCohort,
  },
  {
    label: "Supplements",
    href: "/treatments/supplements",
    thumbSrc: RETAIL_IMAGES.arcSupplementShelvingUnits,
  },
  {
    label: "Hormone Health",
    href: "/treatments/hormone-health",
    thumbSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
  },
  {
    label: "Metabolic Health",
    href: "/treatments/metabolic-health",
    thumbSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
  },
  {
    label: "Gut Health",
    href: "/treatments/gut-health",
    thumbSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
  },
  {
    label: "Brain Health",
    href: "/treatments/brain-health",
    thumbSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
  },
  {
    label: "Longevity",
    href: "/treatments/longevity",
    thumbSrc: CLINIC_INTERIOR_IMAGES.heroLobbyLounge,
  },
  {
    label: "Medical Weight Loss",
    href: "/treatments/medical-weight-loss",
    thumbSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
  },
] as const;
