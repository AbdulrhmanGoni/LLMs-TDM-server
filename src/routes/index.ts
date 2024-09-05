import type { RouterType } from "../router/Router";
import datasetsRoutesRegisterer from "./datasetsRoutes";
import instructionsRoutesRegisterer from "./instructionsRoutes";
import recentActivitiesRoutesRegisterer from "./recentActivitiesRoutes";

export default function routesRegistering(router: RouterType) {
  datasetsRoutesRegisterer(router);
  instructionsRoutesRegisterer(router);
  recentActivitiesRoutesRegisterer(router);
}
