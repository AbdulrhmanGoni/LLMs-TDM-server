import extractResourceName from "./extractResourceName";
import type { RoutesHandlersRegistery } from "./Router";

export default function registerRoute<HandlersT>(
  routes: RoutesHandlersRegistery<HandlersT>,
  method: string,
  path: string,
  ...handlers: HandlersT[]
) {
  const paramsNames: string[] = [];
  const regexPath = path.replace(/:([^\/]+)/g, (_, key: string) => {
    paramsNames.push(key);
    return "([^\\/]+)";
  });

  const routeData = {
    pathRegExp: new RegExp(`^${regexPath}$`),
    handlers,
    paramsNames,
  };

  const resourceName = extractResourceName(path);

  if (routes[method]) {
    if (routes[method][resourceName]) {
      routes[method][resourceName].push(routeData);
    } else {
      routes[method][resourceName] = [routeData];
    }
  } else {
    Object.assign(routes, {
      [method]: { [resourceName]: [routeData] },
    });
  }
}
