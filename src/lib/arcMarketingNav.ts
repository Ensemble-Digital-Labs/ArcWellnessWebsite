import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import { brainHealthContent } from "@/content/pages/brain-health";
import { clearRfHero } from "@/content/pages/clear-rf";
import { dermalFillersHero } from "@/content/pages/dermal-fillers";
import { emfaceHero } from "@/content/pages/emface";
import { emsculptNeoHero } from "@/content/pages/emsculpt-neo";
import { emsellaHero } from "@/content/pages/emsella";
import { exionHero } from "@/content/pages/exion";
import { exomindHero } from "@/content/pages/exomind";
import { gutHealthContent } from "@/content/pages/gut-health";
import { hormoneHealthContent } from "@/content/pages/hormone-health";
import { infusionHero } from "@/content/pages/infusion";
import { longevityContent } from "@/content/pages/longevity";
import { medicalWeightLossContent } from "@/content/pages/medical-weight-loss";
import { metabolicHealthContent } from "@/content/pages/metabolic-health";
import { neuromodulatorsHero } from "@/content/pages/neuromodulators";
import { peptideTherapyHero } from "@/content/pages/peptide-therapy";
import { rfMicroneedlingHero } from "@/content/pages/rf-microneedling";
import { supplementsHero } from "@/content/pages/supplements";

/** Nav preview thumbs — string paths only (avoids circular import with `@/content/site`). */
const NAV_PREVIEW = {
  facialAesthetic: "/assets/sections/whole-body/facial-aesthetic-treatment.webp",
  membershipCohort: "/assets/sections/who-we-are/biometric-consultation-room.webp",
} as const;

/** Individual service circle previews = right side of each service hero. */
const SERVICE_HERO_OBJECT =
  "object-cover object-[88%_42%] sm:object-[82%_45%]" as const;

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
    label: "From the Arc Desk",
    href: "/blogs",
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
    thumbSrc: exomindHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "EmSella",
    href: "/treatments/emsella",
    thumbSrc: emsellaHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "EmSculpt Neo",
    href: "/treatments/emsculpt-neo",
    thumbSrc: emsculptNeoHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "EmFace",
    href: "/treatments/emface",
    thumbSrc: emfaceHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Exion",
    href: "/treatments/exion",
    thumbSrc: exionHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  // NOTE: Separate Daxxify nav leaf removed — DAXXIFY® lives on Neuromodulators.
  {
    label: "Neuromodulators",
    href: "/treatments/neuromodulators",
    thumbSrc: neuromodulatorsHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "RF Microneedling",
    href: "/treatments/rf-microneedling",
    thumbSrc: rfMicroneedlingHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Clear RF",
    href: "/treatments/clear-rf",
    thumbSrc: clearRfHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Dermal Fillers",
    href: "/treatments/dermal-fillers",
    thumbSrc: dermalFillersHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  // NOTE: Knesko nav leaf removed — offering not active. Restore with:
  // { label: "Knesko", href: "/treatments/knesko", thumbSrc: …, thumbObjectClass: SERVICE_HERO_OBJECT },
  {
    label: "Infusion Therapy",
    href: "/treatments/infusion-therapy",
    thumbSrc: infusionHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Peptide Therapy",
    href: "/treatments/peptide-therapy",
    thumbSrc: peptideTherapyHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Supplements",
    href: "/treatments/supplements",
    thumbSrc: supplementsHero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Hormone Health",
    href: "/treatments/hormone-health",
    thumbSrc: hormoneHealthContent.hero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Metabolic Health",
    href: "/treatments/metabolic-health",
    thumbSrc: metabolicHealthContent.hero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Gut Health",
    href: "/treatments/gut-health",
    thumbSrc: gutHealthContent.hero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Brain Health",
    href: "/treatments/brain-health",
    thumbSrc: brainHealthContent.hero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Longevity",
    href: "/treatments/longevity",
    thumbSrc: longevityContent.hero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
  {
    label: "Medical Weight Loss",
    href: "/treatments/medical-weight-loss",
    thumbSrc: medicalWeightLossContent.hero.imageSrc,
    thumbObjectClass: SERVICE_HERO_OBJECT,
  },
] as const;
