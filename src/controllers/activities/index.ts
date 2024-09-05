import getRecentActivities_controller from "./getRecentActivities_controller.ts";

class RecentActivitiesController {
  constructor() {}

  getRecentActivities = getRecentActivities_controller;
}

const recentActivitiesController = new RecentActivitiesController();

export default recentActivitiesController;
