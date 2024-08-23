import { Types } from "mongoose";
import type { Dataset } from "../../types/datasets";
import type { Instruction } from "../../types/instructions";
import unregisterActivities_service from "./unregisterActivity_service";

export default async function unregisterInstructionActivity_service(
  datasetId: Dataset["id"],
  instructionId: Instruction["id"]
) {
  try {
    await unregisterActivities_service("Instructions", {
      instructionId: new Types.ObjectId(instructionId),
      datasetId: new Types.ObjectId(datasetId),
    });
  } catch {
    // logging system
  }
}
