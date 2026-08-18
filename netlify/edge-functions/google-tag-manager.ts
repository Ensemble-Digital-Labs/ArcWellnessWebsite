/**
 * Inject Google’s official GTM snippets into the HTML Netlify serves.
 *
 * Next.js App Router cannot place these where Search Console requires:
 *  1) first child of <head>
 *  2) first child of <body>
 * This edge function rewrites the document after Next.js, so Googlebot sees
 * the standard install. Do not also render GTM from React or it will duplicate.
 */

declare const Netlify: {
  env: { get(name: string): string | undefined };
};

const DEFAULT_GTM_ID = "GTM-P5JNDDHR";
const SKIP_PREFIXES = ["/_next/", "/assets/", "/api/"];
const SKIP_FILE =
  /\.(ico|png|jpe?g|webp|avif|gif|svg|woff2?|css|js|map|json|xml|txt|webmanifest|mp4|webm)$/i;

function gtmSnippets(gtmId: string) {
  return {
    head: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');</script>
<!-- End Google Tag Manager -->`,
    body: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
  };
}

export default async function googleTagManager(
  request: Request,
  context: { next: () => Promise<Response> },
) {
  const { pathname } = new URL(request.url);
  if (
    SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    SKIP_FILE.test(pathname)
  ) {
    return;
  }

  const gtmId = (Netlify.env.get("NEXT_PUBLIC_GTM_ID") ?? DEFAULT_GTM_ID).trim();
  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html") || !gtmId) {
    return response;
  }

  const html = await response.text();
  if (html.includes("<!-- Google Tag Manager -->")) {
    return new Response(html, response);
  }

  const { head, body } = gtmSnippets(gtmId);
  const withHead = html.replace("<head>", `<head>${head}`);
  if (withHead === html) {
    return new Response(html, response);
  }

  const updated = withHead.replace(/<body([^>]*)>/i, `<body$1>${body}`);
  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(updated, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const config = {
  path: "/*",
  excludedPath: ["/_next/*", "/assets/*", "/api/*"],
  onError: "bypass",
};
