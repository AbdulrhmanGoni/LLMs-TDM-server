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
import haveSharedKey from "../utilities/haveSharedKey";

const InstructionBaseRules = InstructionSchemaRules();

const updateInstructionInputSchema = validationSchema<
  {
    datasetId: Dataset["id"];
    instructionId: Instruction["id"];
  } & UpdateInstructionInput
>({
  datasetId: RequiredObjectIdRule(),
  instructionId: RequiredObjectIdRule(),
  ...InstructionBaseRules,
});

export const emptyUpdateInstructionBodyMessage =
  "You have to choose at least one field of the instruction to update it";

export default function updateInstructionInputValidator(request: Req) {
  try {
    if (haveSharedKey(InstructionBaseRules, request.json)) {
      return ErrorResponse(emptyUpdateInstructionBodyMessage, 400);
    }

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
