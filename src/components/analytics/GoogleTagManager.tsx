/** Same container as Arc landing pages (e.g. emsella.arcwellness.net). */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-P5JNDDHR";

/**
 * Google’s official GTM install, as React:
 * 1) bootstrap script in `<head>`
 * 2) noscript iframe immediately after `<body>`
 *
 * Inline `<script>`, not `next/script` — Next’s Script loader moves the snippet
 * into a body loader that Search Console rejects.
 *
 * Renders on Netlify and GoDaddy static export. Do not also inject GTM from a
 * Netlify edge function or tags will duplicate.
 */
export function GoogleTagManagerHead() {
  if (!GTM_ID) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
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
      />
    </noscript>
  );
}
