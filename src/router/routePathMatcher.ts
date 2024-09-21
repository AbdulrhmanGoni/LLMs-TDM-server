import type { PathParams } from "../types/request";
import extractResourceName from "./extractResourceName";
import type { RoutesHandlersRegistery } from "./Router";

export default function routePathMatcher<HandlersT>(
  method: string,
  path: string,
  routes: RoutesHandlersRegistery<HandlersT>
) {
  if (routes[method]) {
    const resourceName = extractResourceName(path);
    if (routes[method][resourceName]) {
      for (const route of routes[method][resourceName]) {
        const match = route.pathRegExp.exec(path);
        if (match) {
          const params: PathParams = {};
          route.paramsNames.forEach((name: string, index: number) => {
            params[name] = match[index + 1];
          });
          return { handlers: route.handlers, params };
        }
      }
    }
  }
}
