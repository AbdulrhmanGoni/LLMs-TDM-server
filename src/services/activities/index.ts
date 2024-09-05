import getRecentActivities_service from "./getRecentActivities_service";
import unregisterInstructionActivity_service from "./unregisterInstructionActivity_service";
import unregisterDatasetActivity_service from "./unregisterDatasetActivity_service";
import registerInstructionActivity_service from "./registerInstructionActivity_service";
import registerDatasetActivity_service from "./registerDatasetActivity_service";

class ActivitiesService {
  constructor() {}

  getRecentActivities = getRecentActivities_service;

  registerDatasetActivity = registerDatasetActivity_service;

  registerInstructionActivity = registerInstructionActivity_service;

  unregisterDatasetActivity = unregisterDatasetActivity_service;

  unregisterInstructionActivity = unregisterInstructionActivity_service;
}

const activitiesService = new ActivitiesService();

export default activitiesService;
