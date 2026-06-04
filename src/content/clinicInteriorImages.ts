/**
 * Production clinic interior photography (St. Louis).
 * Files live under `public/assets/sections/clinic-interiors/`.
 */
export const CLINIC_INTERIOR_IMAGES = {
  consultationLounge: "/assets/sections/clinic-interiors/consultation-lounge-seating.png",
  hallwayAccentSeating: "/assets/sections/clinic-interiors/hallway-accent-seating-view.png",
  ivTherapyReclinerRoom: "/assets/sections/clinic-interiors/iv-therapy-recliner-room.png",
  receptionBacklitLogoWall: "/assets/sections/clinic-interiors/reception-backlit-logo-wall.png",
  /** Stand-in until `reception-green-wall-console-doorway.png` is added to `public/`. */
  receptionGreenWallConsoleDoorway:
    "/assets/sections/clinic-interiors/reception-green-wall-salt-lamp-doorway.png",
  receptionGreenWallSaltLampDoorway:
    "/assets/sections/clinic-interiors/reception-green-wall-salt-lamp-doorway.png",
  hallwayDaxxifyBannerWaveArt: "/assets/sections/clinic-interiors/hallway-daxxify-banner-wave-art.png",
  retailKneskoSkinProductDisplay:
    "/assets/sections/clinic-interiors/retail-knesko-skin-product-display.png",
  receptionFacadeWideSeating: "/assets/sections/clinic-interiors/reception-facade-wide-seating.png",
  lobbyReceptionDeskProducts: "/assets/sections/clinic-interiors/lobby-reception-desk-products.png",
  waitingRoomArmchairGoldArt: "/assets/sections/clinic-interiors/waiting-room-armchair-gold-art.png",
  plantBonsaiWindowSill: "/assets/sections/clinic-interiors/plant-bonsai-window-sill.png",
  /** Hero / architecture — same production photography family as homepage. */
  heroExteriorSunset: "/assets/hero/arc-wellness-exterior-sunset.png",
  heroReceptionInterior: "/assets/hero/arc-wellness-reception-interior.png",
  heroReceptionEntrance: "/assets/hero/arc-wellness-reception-entrance.png",
  heroLobbyLounge: "/assets/hero/arc-wellness-lobby-lounge.png",
} as const;

export const CLINIC_INTERIOR_IMAGE_LIST = Object.values(CLINIC_INTERIOR_IMAGES);

export type ClinicInteriorImageSrc = (typeof CLINIC_INTERIOR_IMAGE_LIST)[number];

/** Short labels for CMS / alt-text starting points */
export const CLINIC_INTERIOR_ALT = {
  consultationLounge:
    "ARC Wellness consultation lounge with leather seating, plants, and abstract wall art",
  hallwayAccentSeating:
    "ARC Wellness hallway with gold accent wall art and view into a seating area",
  ivTherapyReclinerRoom:
    "ARC Wellness IV therapy room with recliners, infusion poles, and windows overlooking greenery",
  receptionBacklitLogoWall:
    "ARC Wellness reception with backlit Arc Wellness logo on a forest-green wall and welcome console",
  receptionGreenWallConsoleDoorway:
    "ARC Wellness reception console with brochures, salt lamp, and view into a seating room",
  receptionGreenWallSaltLampDoorway:
    "ARC Wellness reception with green wall lighting, plants, and doorway to a calm waiting area",
  hallwayDaxxifyBannerWaveArt:
    "ARC Wellness hallway with gold wave art, reception counter, and natural light from treatment rooms",
  retailKneskoSkinProductDisplay:
    "KNESKO SKIN retail display at ARC Wellness with masks, serums, and skincare products on shelf",
  receptionFacadeWideSeating:
    "ARC Wellness reception with gold logo wall, console, and seating area",
  lobbyReceptionDeskProducts:
    "ARC Wellness front desk with product shelving, review sign, and social QR display",
  waitingRoomArmchairGoldArt:
    "ARC Wellness waiting nook with black armchair and gold geometric wall art",
  plantBonsaiWindowSill:
    "Bonsai plant on the clinic windowsill with rolled towels and candle",
  heroExteriorSunset:
    "ARC Wellness exterior at sunset with illuminated signage and landscaping",
  heroReceptionInterior:
    "ARC Wellness reception interior with green accent wall and warm lighting",
  heroReceptionEntrance:
    "ARC Wellness reception entrance with seating and welcoming console",
  heroLobbyLounge:
    "ARC Wellness lobby lounge with comfortable seating and natural light",
} as const;
