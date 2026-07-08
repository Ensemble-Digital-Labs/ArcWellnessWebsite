/**
 * Model / lifestyle photography, patients experiencing care in a medical spa setting.
 * See `public/assets/sections/patient-experience/README.md`.
 */
export const PATIENT_EXPERIENCE_NAMED_IMAGES = {
  consultationLoungeSofaConversation:
    "/assets/sections/patient-experience/consultation-lounge-sofa-conversation.webp",
  weightLossResultsJeansWaistGap:
    "/assets/sections/patient-experience/weight-loss-results-jeans-waist-gap.webp",
  nutritionMealTimingClock: "/assets/sections/patient-experience/nutrition-meal-timing-clock.webp",
} as const;

export const PATIENT_EXPERIENCE_IMAGES = [
  "/assets/sections/patient-experience/patient-experience-01.webp",
  "/assets/sections/patient-experience/patient-experience-02.webp",
  "/assets/sections/patient-experience/patient-experience-03.webp",
  "/assets/sections/patient-experience/patient-experience-04.webp",
  "/assets/sections/patient-experience/patient-experience-05.webp",
  "/assets/sections/patient-experience/patient-experience-06.webp",
  "/assets/sections/patient-experience/patient-experience-07.webp",
  "/assets/sections/patient-experience/patient-experience-08.webp",
  "/assets/sections/patient-experience/patient-experience-09.webp",
  "/assets/sections/patient-experience/patient-experience-10.webp",
  "/assets/sections/patient-experience/patient-experience-11.webp",
  "/assets/sections/patient-experience/patient-experience-12.webp",
  "/assets/sections/patient-experience/patient-experience-13.webp",
  "/assets/sections/patient-experience/patient-experience-14.webp",
  "/assets/sections/patient-experience/patient-experience-15.webp",
  "/assets/sections/patient-experience/patient-experience-16.webp",
  PATIENT_EXPERIENCE_NAMED_IMAGES.consultationLoungeSofaConversation,
  PATIENT_EXPERIENCE_NAMED_IMAGES.weightLossResultsJeansWaistGap,
  PATIENT_EXPERIENCE_NAMED_IMAGES.nutritionMealTimingClock,
] as const;

export type PatientExperienceImageSrc = (typeof PATIENT_EXPERIENCE_IMAGES)[number];
