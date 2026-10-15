const HUB_TITLE = "<title>Teaching, Adam Simms</title>";
const HUB_CANONICAL = 'rel="canonical" href="https://teaching.adamsimms.xyz/"';

const ICON_REDIRECTS = {
  "/favicon.ico": "/favicon.svg",
  "/apple-touch-icon.png": "/images/og-square.jpg",
  "/apple-touch-icon-precomposed.png": "/images/og-square.jpg",
};

function notFoundPage() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#f05f40">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fff; color: #111; font: 18px/1.45 system-ui, sans-serif; }
    main { text-align: center; }
    a { color: inherit; }
  </style>
</head>
<body>
  <main>
    <h1>Page not found</h1>
    <p><a href="/">Teaching</a></p>
  </main>
</body>
</html>`;

  return new Response(html, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "syllabi.adamsimms.xyz") {
    url.hostname = "teaching.adamsimms.xyz";
    return Response.redirect(url.toString(), 301);
  }

  const icon = ICON_REDIRECTS[url.pathname];
  if (icon) {
    return Response.redirect(new URL(icon, url.origin).toString(), 301);
  }

  const response = await context.next();
  if (response.status !== 200) return response;
  if (url.pathname === "/" || url.pathname === "/index.html") return response;

  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;

  // Pages serves the hub homepage for unknown paths. That copy is indexable
  // and canonicals to /, so Google files it as an alternate page.
  const body = await response.clone().text();
  if (body.includes(HUB_TITLE) && body.includes(HUB_CANONICAL)) {
    return notFoundPage();
  }

  return response;
}
