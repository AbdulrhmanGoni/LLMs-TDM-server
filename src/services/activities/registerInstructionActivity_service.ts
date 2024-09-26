import type {
  ActivitiesTypes,
  InstructionActivity,
} from "../../types/activities";
import registerActivity_service from "./registerActivity_service";

export default async function registerInstructionActivity_service(
  userId: string,
  dataset: InstructionActivity["dataset"],
  instruction: InstructionActivity["instruction"],
  activityDate: Date,
  activity: ActivitiesTypes
) {
  try {
    await registerActivity_service(
      "Instructions",
      {
        dataset,
        instruction,
        activityDate,
        activity,
      },
      userId
    );
  } catch {
    // logging system
  }
}
