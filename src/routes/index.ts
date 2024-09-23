import type { RouterType } from "../router/Router";
import datasetsRoutesRegisterer from "./datasetsRoutes";
import instructionsRoutesRegisterer from "./instructionsRoutes";
import recentActivitiesRoutesRegisterer from "./recentActivitiesRoutes";
import exportRoutesRegisterer from "./exportRoutes";

export default function routesRegistering(router: RouterType) {
  datasetsRoutesRegisterer(router);
  instructionsRoutesRegisterer(router);
  recentActivitiesRoutesRegisterer(router);
  exportRoutesRegisterer(router);
}
