import recentActivitiesController from "../controllers/activities";
import type { RouterType } from "../router/Router";

export default function recentActivitiesRoutesRegisterer(
  router: RouterType
): void {
  const baseRoute = "/recent-activities";
  router.GET(baseRoute, recentActivitiesController.getRecentActivities);
}
