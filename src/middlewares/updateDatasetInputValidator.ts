import ErrorResponse from "../utilities/ErrorResponse";
import type { Dataset, UpdateDatasetInput } from "../types/datasets";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import DatasetSchemaRule from "../validation/DatasetSchemaRule";
import RequiredObjectIdRule from "../validation/RequiredObjectIdRule";

const updateDatasetInputSchema = validationSchema<
  UpdateDatasetInput & { datasetId: Dataset["id"] }
>({
  datasetId: RequiredObjectIdRule(),
  ...DatasetSchemaRule(),
});

export default function updateDatasetInputValidator(request: Req) {
  try {
    const { datasetId, ...updateData } = updateDatasetInputSchema.validate({
      ...request.json,
      datasetId: request.params.datasetId,
    });
    request.json = updateData;
    request.json.datasetId = datasetId;
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError;
    return ErrorResponse({ validationErrors }, 403);
  }
}
