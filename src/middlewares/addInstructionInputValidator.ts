import ErrorResponse from "../utilities/ErrorResponse";
import type { AddInstructionInput } from "../types/instructions";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import InstructionSchemaRules from "../validation/InstructionSchemaRules";
import RequiredObjectIdRule from "../validation/RequiredObjectIdRule";
import validationSchema from "../validation/validationSchema";

const instructionInput = validationSchema<AddInstructionInput>({
  systemMessage: InstructionSchemaRules().systemMessage,
  question: InstructionSchemaRules().answer.required(),
  answer: InstructionSchemaRules().answer.required(),
  datasetId: RequiredObjectIdRule(),
});

export default function addInstructionInputValidator(request: Req) {
  try {
    request.json = instructionInput.validate(request.json);
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
