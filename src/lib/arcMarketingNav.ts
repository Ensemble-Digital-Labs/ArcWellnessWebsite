import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";

/** Nav preview thumbs — string paths only (avoids circular import with `@/content/site`). */
const NAV_PREVIEW = {
  facialAesthetic: "/assets/sections/whole-body/facial-aesthetic-treatment.png",
  membershipCohort: "/assets/sections/who-we-are/biometric-consultation-room.png",
} as const;

/** Primary site navigation — header menu on homepage and marketing pages. */
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
    label: "Programs",
    href: "/programs",
    shape: "3",
    previewSrc: NAV_PREVIEW.membershipCohort,
  },
  {
    label: "Insights",
    href: "/case-studies",
    shape: "4",
    previewSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
  },
  {
    label: "Contact",
    href: "/contact",
    shape: "5",
    previewSrc: CLINIC_INTERIOR_IMAGES.receptionGreenWallConsoleDoorway,
  },
] as const;

/** @deprecated Use `ARC_PRIMARY_NAV_LINKS` */
export const ARC_SITE_NAV_LINKS = ARC_PRIMARY_NAV_LINKS;
