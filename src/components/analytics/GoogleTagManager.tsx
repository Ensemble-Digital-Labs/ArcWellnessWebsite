import { isStaticExport } from "@/lib/staticExport";

/** Same container as Arc landing pages (e.g. emsella.arcwellness.net). */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-P5JNDDHR";

const GTM_HEAD_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

/**
 * GTM for GoDaddy/cPanel static export only.
 *
 * On Netlify, `netlify/edge-functions/google-tag-manager.ts` injects the official
 * snippets first-in-head / first-in-body. Do not render these there or tags duplicate.
 * Apache static hosting has no edge function, so we bake the snippets into HTML.
 */
export function StaticExportGoogleTagManagerHead() {
  if (!isStaticExport || !GTM_ID) return null;
  return (
    <>
      {/* Google Tag Manager */}
      <script
        id="google-tag-manager"
        dangerouslySetInnerHTML={{ __html: GTM_HEAD_SCRIPT }}
      />
      {/* End Google Tag Manager */}
    </>
  );
}

export function StaticExportGoogleTagManagerNoscript() {
  if (!isStaticExport || !GTM_ID) return null;
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
