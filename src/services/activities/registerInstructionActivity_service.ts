import { Types } from "mongoose";
import type { ActivitiesTypes } from "../../types/activities";
import registerActivity_service from "./registerActivity_service";

export default async function registerInstructionActivity_service(
  userId: string,
  datasetId: Types.ObjectId | string,
  instructionId: Types.ObjectId | string,
  activityDate: Date,
  activity: ActivitiesTypes
) {
  try {
    await registerActivity_service(
      "Instructions",
      {
        instructionId:
          typeof instructionId === "string"
            ? new Types.ObjectId(instructionId)
            : instructionId,
        datasetId:
          typeof datasetId === "string"
            ? new Types.ObjectId(datasetId)
            : datasetId,
        activityDate,
        activity,
      },
      userId
    );
  } catch {
    // logging system
  }
}
