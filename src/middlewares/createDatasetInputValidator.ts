import ErrorResponse from "../utilities/ErrorResponse";
import type { DatasetInput } from "../types/datasets";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import DatasetSchemaRule from "../validation/DatasetSchemaRule";
import validationSchema from "../validation/validationSchema";

const datasetInput = validationSchema<DatasetInput>({
  name: DatasetSchemaRule().name.required(),
  description: DatasetSchemaRule().description.required(),
});

export default function createDatasetInputValidator(request: Req) {
  try {
    request.json = datasetInput.validate(request.json);
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
