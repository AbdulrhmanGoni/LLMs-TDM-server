import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import stringValidator from "../validation/stringValidator";
import type { CreateDatasetRepositoryInput } from "../types/huggingface";

const datasetRepositorySchema = validationSchema<CreateDatasetRepositoryInput>({
  name: stringValidator().required().min(3).max(95),
  license: stringValidator().min(2).max(35),
});

export default function createDatasetRepositoryInputValidator(request: Req) {
  try {
    request.json = datasetRepositorySchema.validate({
      name: request.json.name,
      license: request.json.license
    });
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
