/**
 * Staggered vw/vh frames for full-viewport immersive collages (#about, #founder).
 * Scaled ~1.2× vs CodePen reference so the collage reads closer to full-bleed.
 */
export const IMMERSIVE_COLLAGE_FRAME_CLASSES: readonly string[] = [
  "w-[30vw] h-[30vh]",
  "w-[42vw] h-[36vh] -top-[36vh] left-[6vw]",
  "w-[24vw] h-[62vh] -top-[18vh] -left-[28vw]",
  "w-[19vw] h-[26vh] left-[28vw] -top-[1vh] sm:w-[20vw] sm:h-[30vh] sm:left-[30vw] sm:-top-[2vh] md:w-[20vw] md:h-[46vh] md:left-[28vw] md:-top-[5vh]",
  "w-[24vw] h-[34vh] top-[34vh] left-[6vw]",
  "w-[38vw] h-[30vh] top-[32vh] -left-[27vw]",
  "w-[15vw] h-[16vh] top-[34vh] left-[28vw] sm:w-[16vw] sm:h-[17vh] sm:top-[36vh] sm:left-[30vw] md:w-[18vw] md:h-[18vh] md:top-[34vh] md:left-[32vw]",
];
