import type { Server } from "bun";
import executeRouteHandlers from "./executeRouteHandlers";
import routePathMatcher from "./routePathMatcher";
import type { RoutesHandlersRegistery } from "./Router";
import extractResourceName from "./extractResourceName";
import extractSearchParams from "../utilities/extractSearchParams";
import extractRequestBody from "../utilities/extractRequestBody";
import type { Req, RequestHandler, WebSocketHandlers } from "../types/request";
import crosHeadersSetters from "../utilities/crosHeadersSetters";

export default async function serveRequests(
  request: Request,
  server: Server,
  routes: RoutesHandlersRegistery<RequestHandler>,
  websocketRoutes: RoutesHandlersRegistery<WebSocketHandlers>
) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // For the preflight requests by the browsers for CORS policy
  if (method === "OPTIONS") {
    const headers = new Headers()
    crosHeadersSetters(headers)
    return new Response("{}", { status: 200, headers })
  }

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
      userId: "",
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
      res && crosHeadersSetters(res.headers)
      return res;
    }
  }

  return Response.json(
    { message: `There is nothing in this route (${path})` },
    { status: 404 }
  );
}
