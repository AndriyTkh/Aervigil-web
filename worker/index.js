/**
 * Routes whose page is not part of the current build. Without this the
 * index.html fallback below would answer them with 200 and the homepage, so a
 * disconnected URL would silently serve the wrong page. Redirects are temporary
 * (307) because these pages are expected to come back — drop the entry when its
 * page is reconnected.
 */
const DISCONNECTED_ROUTES = new Map([["/technology", "/"]]);

/** Matches a disconnected route and anything nested under it, ignoring trailing slashes. */
function disconnectedTarget(pathname) {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  for (const [route, target] of DISCONNECTED_ROUTES) {
    if (normalized === route || normalized.startsWith(`${route}/`)) {
      return target;
    }
  }
  return undefined;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (["GET", "HEAD"].includes(request.method)) {
      const target = disconnectedTarget(url.pathname);
      if (target) {
        return Response.redirect(new URL(target, url), 307);
      }
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
