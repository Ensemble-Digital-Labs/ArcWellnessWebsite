/**
 * Model / lifestyle photography — patients experiencing care in a medical spa setting.
 * See `public/assets/sections/patient-experience/README.md`.
 */
export const PATIENT_EXPERIENCE_IMAGES = [
  "/assets/sections/patient-experience/patient-experience-01.png",
  "/assets/sections/patient-experience/patient-experience-02.png",
  "/assets/sections/patient-experience/patient-experience-03.png",
  "/assets/sections/patient-experience/patient-experience-04.png",
  "/assets/sections/patient-experience/patient-experience-05.png",
  "/assets/sections/patient-experience/patient-experience-06.png",
  "/assets/sections/patient-experience/patient-experience-07.png",
  "/assets/sections/patient-experience/patient-experience-08.png",
  "/assets/sections/patient-experience/patient-experience-09.png",
  "/assets/sections/patient-experience/patient-experience-10.png",
  "/assets/sections/patient-experience/patient-experience-11.png",
  "/assets/sections/patient-experience/patient-experience-12.png",
  "/assets/sections/patient-experience/patient-experience-13.png",
  "/assets/sections/patient-experience/patient-experience-14.png",
  "/assets/sections/patient-experience/patient-experience-15.png",
  "/assets/sections/patient-experience/patient-experience-16.png",
] as const;

export type PatientExperienceImageSrc = (typeof PATIENT_EXPERIENCE_IMAGES)[number];
