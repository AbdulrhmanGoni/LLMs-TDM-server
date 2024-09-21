import type { Server } from "bun";
import type { RequestHandler, WebSocketHandlers } from "../types/request";
import registerRoute from "./registerRoute";
import serveRequests from "./serveRequests";

type RouteData<handlersT> = {
  handlers: handlersT[];
  pathRegExp: RegExp;
  paramsNames: string[];
};

export type RoutesHandlersRegistery<handlersT> = Record<
  string,
  Record<string, RouteData<handlersT>[]>
>;

const RouterClass = (function () {
  const routes: RoutesHandlersRegistery<RequestHandler> = {};
  const websocketRoutes: RoutesHandlersRegistery<WebSocketHandlers> = {};

  class Router {
    constructor() {}

    async serve(request: Request, server: Server) {
      return serveRequests(request, server, routes, websocketRoutes);
    }

    registerRoute(method: string, path: string, ...handlers: RequestHandler[]) {
      registerRoute<RequestHandler>(routes, method, path, ...handlers);
    }

    GET(path: string, ...handlers: RequestHandler[]) {
      this.registerRoute(this.GET.name, path, ...handlers);
    }

    POST(path: string, ...handlers: RequestHandler[]) {
      this.registerRoute(this.POST.name, path, ...handlers);
    }

    DELETE(path: string, ...handlers: RequestHandler[]) {
      this.registerRoute(this.DELETE.name, path, ...handlers);
    }

    PUT(path: string, ...handlers: RequestHandler[]) {
      this.registerRoute(this.PUT.name, path, ...handlers);
    }

    PATCH(path: string, ...handlers: RequestHandler[]) {
      this.registerRoute(this.PATCH.name, path, ...handlers);
    }
  }

  return Router;
})();

const Router = new RouterClass();

export type RouterType = typeof Router;

export default Router;
