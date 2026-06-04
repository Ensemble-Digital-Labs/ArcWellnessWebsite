/** Production contact & booking — source: arcwellness.net */
export const siteMeta = {
  brand: "Arc Wellness",
  tagline: "Elevated care. Extraordinary results. A life well-lived.",
  address: {
    line1: "5000 Cedar Plaza Parkway, Ste. 230",
    line2: "St. Louis, MO 63128",
    mapsQuery: "5000+Cedar+Plaza+Pkwy+Ste+230+St+Louis+MO+63128",
  },
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
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Arc Aesthetics", href: "/aesthetics" },
  { label: "Arc Programs", href: "/programs" },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
] as const;
