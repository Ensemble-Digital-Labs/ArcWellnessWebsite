/** Production contact & booking, source: arcwellness.net */
const MAPS_QUERY = "5000+Cedar+Plaza+Pkwy+Ste+230+St+Louis+MO+63128";

export const siteMeta = {
  brand: "Arc Wellness",
  tagline: "Elevated care. Extraordinary results. A life well-lived.",
  address: {
    line1: "5000 Cedar Plaza Parkway, Ste. 230",
    line2: "St. Louis, MO 63128",
    mapsQuery: MAPS_QUERY,
  },
  /** Opens Google Maps at the clinic. */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
  /** Embeddable map preview for Contact. */
  mapsEmbedUrl: `https://maps.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`,
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
  { label: "Case Study", href: "/case-studies" },
  // NOTE (Aug 2026): Financing tab hidden from primaryNav; restore with the ARC_NAV financing item.
  // { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
] as const;
