/** Production contact & booking, source: arcwellness.net */
const MAPS_QUERY = "5000+Cedar+Plaza+Pkwy+Ste+230+St+Louis+MO+63128";

/** Official Google Maps place pin for Arc Wellness (Cedar Plaza). */
const MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Arc+Wellness/@38.4850853,-90.3823193,17z/data=!3m1!4b1!4m6!3m5!1s0x87d8cf5bca2cbe1f:0xa1cda901e54088be!8m2!3d38.4850853!4d-90.3823193!16s%2Fg%2F11xrgwdtdt";

export const siteMeta = {
  brand: "Arc Wellness",
  tagline: "Elevated care. Extraordinary results. A life well-lived.",
  address: {
    line1: "5000 Cedar Plaza Parkway, Ste.\u00A0230",
    line2: "St. Louis, MO 63128",
    mapsQuery: MAPS_QUERY,
  },
  /** Opens Google Maps at the Arc Wellness place listing. */
  mapsUrl: MAPS_PLACE_URL,
  /** Embeddable map preview for Contact (clinic coordinates). */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=38.4850853,-90.3823193&z=17&output=embed",
  phone: "636-400-5500",
  phoneTel: "+16364005500",
  email: "info@arcwellness.net",
  hours: ["Monday – Friday: 9 AM – 5 PM"],
  bookingUrl: "https://booking.mangomint.com/892312",
  social: {
    instagram: "https://www.instagram.com/thearcwellness",
    facebook: "https://www.facebook.com/share/1Lx35zTaC7/",
    tiktok: "https://www.tiktok.com/@thearcwellness",
    x: "https://x.com/arcwellness",
  },
} as const;

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/treatments" },
  { label: "Conditions", href: "/conditions" },
  { label: "Start Here", href: "/start-here" },
  { label: "Arc Library", href: "/case-studies" },
  // NOTE (Aug 2026): Financing tab hidden from primaryNav; restore with the ARC_NAV financing item.
  // { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
] as const;
