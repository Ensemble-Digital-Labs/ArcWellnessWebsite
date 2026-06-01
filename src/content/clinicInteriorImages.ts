/**

 * Production clinic interior photography (St. Louis).

 * Files live under `public/assets/sections/clinic-interiors/`.

 */

export const CLINIC_INTERIOR_IMAGES = {

  consultationLounge: "/assets/sections/clinic-interiors/consultation-lounge-seating.png",

  hallwayAccentSeating: "/assets/sections/clinic-interiors/hallway-accent-seating-view.png",

  ivTherapyReclinerRoom: "/assets/sections/clinic-interiors/iv-therapy-recliner-room.png",

  receptionBacklitLogoWall: "/assets/sections/clinic-interiors/reception-backlit-logo-wall.png",

  receptionGreenWallConsoleDoorway:

    "/assets/sections/clinic-interiors/reception-green-wall-console-doorway.png",

  receptionGreenWallSaltLampDoorway:

    "/assets/sections/clinic-interiors/reception-green-wall-salt-lamp-doorway.png",

  hallwayDaxxifyBannerWaveArt: "/assets/sections/clinic-interiors/hallway-daxxify-banner-wave-art.png",

  retailKneskoSkinProductDisplay:

    "/assets/sections/clinic-interiors/retail-knesko-skin-product-display.png",

} as const;



export const CLINIC_INTERIOR_IMAGE_LIST = [

  CLINIC_INTERIOR_IMAGES.consultationLounge,

  CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,

  CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom,

  CLINIC_INTERIOR_IMAGES.receptionBacklitLogoWall,

  CLINIC_INTERIOR_IMAGES.receptionGreenWallConsoleDoorway,

  CLINIC_INTERIOR_IMAGES.receptionGreenWallSaltLampDoorway,

  CLINIC_INTERIOR_IMAGES.hallwayDaxxifyBannerWaveArt,

  CLINIC_INTERIOR_IMAGES.retailKneskoSkinProductDisplay,

] as const;



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

} as const;


