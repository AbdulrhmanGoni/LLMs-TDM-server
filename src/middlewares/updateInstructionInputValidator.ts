import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import RequiredObjectIdRule from "../validation/RequiredObjectIdRule";
import type { Dataset } from "../types/datasets";
import type {
  Instruction,
  UpdateInstructionInput,
} from "../types/instructions";
import InstructionSchemaRules from "../validation/InstructionSchemaRules";

const updateInstructionInputSchema = validationSchema<
  {
    datasetId: Dataset["id"];
    instructionId: Instruction["id"];
  } & UpdateInstructionInput
>({
  datasetId: RequiredObjectIdRule(),
  instructionId: RequiredObjectIdRule(),
  ...InstructionSchemaRules(),
});

export default function updateInstructionInputValidator(request: Req) {
  try {
    const { datasetId, instructionId, ...updateData } =
      updateInstructionInputSchema.validate({
        datasetId: request.search.datasetId,
        instructionId: request.search.instructionId,
        ...request.json,
      });

    request.json = updateData;
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError;
    return ErrorResponse({ validationErrors }, 403);
  }
}
