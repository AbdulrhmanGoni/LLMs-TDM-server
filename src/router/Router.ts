import type { RequestHandler } from "../types/request";

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
  }

  return Router;
})();

const Router = new RouterClass();

export type RouterType = typeof Router;

export default Router;
