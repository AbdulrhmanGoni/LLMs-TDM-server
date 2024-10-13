import type {
  ActivitiesTypes,
  InstructionActivity,
} from "../../types/activities";
import registerActivity_service from "./registerActivity_service";
import datasetsService from "../datasets";
import loggerService from "../logger";

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
    loggerService.error(
      `Failed to register '${activity}' instruction activity`,
      {
        service: "registerInstructionActivity_service",
        userId,
        datasetId: datasetId,
        instructionId: instruction._id.toString(),
      }
    );
  }
}
