import type {
  ActivitiesTypes,
  InstructionActivity,
} from "../../types/activities";
import registerActivity_service from "./registerActivity_service";
import datasetsService from "../datasets";

export default async function registerInstructionActivity_service(
  userId: string,
  datasetId: string,
  instruction: InstructionActivity["instruction"],
  activityDate: Date,
  activity: ActivitiesTypes
) {
  try {
    const { result } = await datasetsService.getDatasetById(userId, datasetId);
    if (result) {
      await registerActivity_service(
        "Instructions",
        {
          dataset: {
            _id: result._id,
            description: result.description,
            name: result.name,
          },
          instruction,
          activityDate,
          activity,
        },
        userId
      );
    }
  } catch {
    // logging system
  }
}
