import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import RequiredObjectIdRule from "../validation/RequiredObjectIdRule";
import type { Dataset } from "../types/datasets";
import type { Instruction } from "../types/instructions";

const deleteInstructionInputSchema = validationSchema<{
  datasetId: Dataset["id"];
  instructionId: Instruction["id"];
}>({
  datasetId: RequiredObjectIdRule(),
  instructionId: RequiredObjectIdRule(),
});

export default function deleteInstructionInputValidator(request: Req) {
  try {
    const { datasetId, instructionId } = deleteInstructionInputSchema.validate({
      datasetId: request.search.datasetId,
      instructionId: request.search.instructionId,
    });
    request.json.instructionId = instructionId;
    request.json.datasetId = datasetId;
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
