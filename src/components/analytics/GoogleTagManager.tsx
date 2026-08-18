/** Same container as Arc landing pages (e.g. emsella.arcwellness.net). */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-P5JNDDHR";

/** Inline bootstrap — must sit in `<head>` for Search Console GTM verification. */
export const GTM_HEAD_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

/**
 * Google Tag Manager — Google’s install + Search Console verification require:
 * 1) bootstrap script as high as possible in `<head>`
 * 2) noscript iframe immediately after the opening `<body>` tag
 *
 * Do not use `next/script` here: it wraps the snippet in a body loader that
 * Search Console rejects as “wrong location.”
 */
export function GoogleTagManagerHead() {
  if (!GTM_ID) return null;
  return (
    <script
      id="google-tag-manager"
      dangerouslySetInnerHTML={{ __html: GTM_HEAD_SCRIPT }}
    />
  );
}

export function GoogleTagManagerNoscript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
