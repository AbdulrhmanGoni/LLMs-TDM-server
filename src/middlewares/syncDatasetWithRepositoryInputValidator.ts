import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import type { DatasetRepositoryCommit } from "../types/huggingface";
import RepositoryCommitMessageRule from "../validation/RepositoryCommitMessageRule";

const syncDatasetWithRepositoryInputSchema =
  validationSchema<DatasetRepositoryCommit>(RepositoryCommitMessageRule());

export default function syncDatasetWithRepositoryInputValidator(request: Req) {
  try {
    syncDatasetWithRepositoryInputSchema.validate({
      commitTitle: request.json.commitTitle,
      commitDescription: request.json.commitDescription,
    });
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
