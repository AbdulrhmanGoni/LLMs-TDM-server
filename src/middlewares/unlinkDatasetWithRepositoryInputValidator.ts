import ErrorResponse from "../utilities/ErrorResponse";
import type { Req } from "../types/request";
import type { ValidationError } from "../types/validation";
import validationSchema from "../validation/validationSchema";
import type { UnlinkDatasetWithRepositoryInputSchema } from "../types/huggingface";
import RepositoryCommitMessageRule from "../validation/RepositoryCommitMessageRule";
import booleanValidator from "../validation/booleanValidator";

const unlinkDatasetWithRepositoryInputSchema =
  validationSchema<UnlinkDatasetWithRepositoryInputSchema>({
    deleteDatasetFile: booleanValidator(),
    deleteRepository: booleanValidator(),
    ...RepositoryCommitMessageRule(),
  });

export default function unlinkDatasetWithRepositoryInputValidator(
  request: Req
) {
  try {
    unlinkDatasetWithRepositoryInputSchema.validate({
      deleteDatasetFile: request.json.deleteDatasetFile,
      deleteRepository: request.json.deleteRepository,
      commitTitle: request.json.commitTitle,
      commitDescription: request.json.commitDescription,
    });
  } catch (e: any) {
    const validationErrors = e.errors as ValidationError["errors"];
    return ErrorResponse({ validationErrors }, 403);
  }
}
