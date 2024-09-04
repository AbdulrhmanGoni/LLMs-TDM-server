import Router from "./router/Router";
import configurations from "./configurations";
import routesRegistering from "./routes";

export default async function app() {
  routesRegistering(Router);
  await configurations();
  return Router.serve;
}
