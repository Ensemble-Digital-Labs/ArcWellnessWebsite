/** Local assets under /public/assets — see public/assets/README.md */
/** Stock footage reorganized under `/assets/videos/…` — use `<video>` / multiple `<source>` for production. */
export const videos = {
  /** Ambient / hero-friendly loop (smallest file of the set). */
  heroBackground: "/assets/videos/hero/spa-background-oriental-therapy.mov",
  /** Spacious spa room, massage bed centered. */
  spaRoom: "/assets/videos/environment/spa-room-massage-bed.mov",
  treatments: {
    faceCareCosmetologist: "/assets/videos/treatments/face-care-cosmetologist.mov",
    faceMassageRelaxing: "/assets/videos/treatments/face-massage-relaxing.mov",
    faceHeadMassage: "/assets/videos/treatments/face-head-massage.mov",
  },
  /** Editorial composition — products / spa styling. */
  bodyCareComposition: "/assets/videos/lifestyle/body-care-composition.mov",
} as const;

export const images = {
  /** Header wordmark — RGBA PNG (`scripts/make-logo-transparent.cjs` removes cream plate from source art). */
  logo: "/assets/branding/arc-wellness-logo.png",
  heroBg: "/assets/hero/arc-wellness-exterior-sunset.png",
  heroMedia: "/assets/hero/arc-wellness-reception-entrance.png",
  whoWeAre: "/assets/sections/who-we-are/doctor-consultation-office.png",
  investBanner: "/assets/hero/arc-wellness-lobby-lounge.png",
  services: [
    "/assets/sections/whole-body/facial-aesthetic-treatment.png",
    "/assets/sections/whole-body/body-contouring-session.png",
    "/assets/sections/who-we-are/biometric-consultation-room.png",
    "/assets/hero/arc-wellness-lobby-lounge.png",
    "/assets/hero/arc-wellness-reception-entrance.png",
  ],
} as const;
