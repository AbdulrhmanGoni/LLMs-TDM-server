import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import RequiredObjectIdRule from "../validation/RequiredObjectIdRule";
import validationSchema from "../validation/validationSchema";
import type { Dataset } from "../types/datasets";

const deleteDatasetInputSchema = validationSchema<{
  datasetId: Dataset["id"];
}>({
  datasetId: RequiredObjectIdRule(),
});

export default function deleteDatasetInputValidator(request: Req) {
  try {
    const { datasetId } = deleteDatasetInputSchema.validate({
      datasetId: request.params.datasetId,
    });

    request.params.datasetId = datasetId;
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
