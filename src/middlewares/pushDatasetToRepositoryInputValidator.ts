import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import stringValidator from "../validation/stringValidator";
import type { PushDatasetToRepositoryInputSchema } from "../types/huggingface";
import { DatasetsFormats } from "../services/export/datasetsFormatsRegistry";
import RepositoryCommitMessageRule from "../validation/RepositoryCommitMessageRule";

const pushDatasetToRepositoryInputSchema =
  validationSchema<PushDatasetToRepositoryInputSchema>({
    name: stringValidator().required().min(3).max(96),
    fileFormat: stringValidator().required().enum(DatasetsFormats),
    filePath: stringValidator().required().min(3).max(96),
    ...RepositoryCommitMessageRule(),
  });

export default function pushDatasetToRepositoryInputValidator(request: Req) {
  try {
    pushDatasetToRepositoryInputSchema.validate({
      ...request.json.repository,
      commitTitle: request.json.commitTitle,
      commitDescription: request.json.commitDescription,
    });
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
