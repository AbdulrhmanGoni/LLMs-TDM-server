import type { RequestHandler } from "../types/request";
import registerRoute from "./registerRoute";

type RouteData = {
  handlers: RequestHandler[];
  pathRegExp: RegExp;
  paramsNames: string[];
};

export type RoutesHandlersRegistery = Record<
  string,
  Record<string, RouteData[]>
>;

const RouterClass = (function () {
  const routes: RoutesHandlersRegistery = {};

  class Router {
    constructor() {}

    registerRoute(method: string, path: string, ...handlers: RequestHandler[]) {
      registerRoute(routes, method, path, ...handlers);
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
