import type { Server } from "bun";
import executeRouteHandlers from "./executeRouteHandlers";
import routePathMatcher from "./routePathMatcher";
import type { RoutesHandlersRegistery } from "./Router";

export default async function serveRequests(
  routes: RoutesHandlersRegistery,
  request: Request,
  _server: Server
) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  const matchedRoute = routePathMatcher(method, path, routes);

  if (matchedRoute) {
    const res = await executeRouteHandlers(request, matchedRoute);
    if (res) return res;
  }

  return Response.json(
    { message: `There is nothing in this route (${path})` },
    { status: 404 }
  );
}
