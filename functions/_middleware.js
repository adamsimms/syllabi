export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "syllabi.adamsimms.xyz") {
    url.hostname = "teaching.adamsimms.xyz";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
