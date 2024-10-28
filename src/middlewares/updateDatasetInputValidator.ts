import ErrorResponse from "../utilities/ErrorResponse";
import type { Dataset, UpdateDatasetInput } from "../types/datasets";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import DatasetSchemaRule from "../validation/DatasetSchemaRule";
import RequiredObjectIdRule from "../validation/RequiredObjectIdRule";
import haveSharedKey from "../utilities/haveSharedKey";

const DatasetBaseRules = DatasetSchemaRule();

const updateDatasetInputSchema = validationSchema<
  UpdateDatasetInput & { datasetId: Dataset["id"] }
>({
  datasetId: RequiredObjectIdRule(),
  ...DatasetBaseRules,
});

export const emptyUpdateDatasetBodyMessage =
  "You have to choose at least one field of the dataset to update it";

export default function updateDatasetInputValidator(request: Req) {
  try {
    if (haveSharedKey(DatasetBaseRules, request.json)) {
      return ErrorResponse(emptyUpdateDatasetBodyMessage, 400);
    }

    const { datasetId, ...updateData } = updateDatasetInputSchema.validate({
      ...request.json,
      datasetId: request.params.datasetId,
    });
    request.json = updateData;
    request.json.datasetId = datasetId;
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
