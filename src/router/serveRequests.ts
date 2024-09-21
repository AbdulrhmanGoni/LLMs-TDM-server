import type { Server } from "bun";
import executeRouteHandlers from "./executeRouteHandlers";
import routePathMatcher from "./routePathMatcher";
import type { RoutesHandlersRegistery } from "./Router";
import extractResourceName from "./extractResourceName";
import extractSearchParams from "../utilities/extractSearchParams";
import extractRequestBody from "../utilities/extractRequestBody";
import type { Req, RequestHandler, WebSocketHandlers } from "../types/request";

export default async function serveRequests(
  request: Request,
  server: Server,
  routes: RoutesHandlersRegistery<RequestHandler>,
  websocketRoutes: RoutesHandlersRegistery<WebSocketHandlers>
) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  const requestMethodType = extractResourceName(path) === "ws" ? "WS" : method;

  const matchedRoute =
    requestMethodType === "WS"
      ? routePathMatcher(requestMethodType, path, websocketRoutes)
      : routePathMatcher(method, path, routes);

  if (matchedRoute) {
    const req: Req = Object.assign(request, {
      search: extractSearchParams(new URL(request.url)),
      json: await extractRequestBody(request),
      params: matchedRoute.params,
    });

    if (requestMethodType === "WS") {
      server.upgrade(request, {
        data: { req, handlers: matchedRoute.handlers },
      });
      return;
    } else {
      const res = await executeRouteHandlers(
        req,
        matchedRoute.handlers as RequestHandler[]
      );
      return res;
    }
  }

  return Response.json(
    { message: `There is nothing in this route (${path})` },
    { status: 404 }
  );
}
