import huggingfaceController from "../controllers/huggingface";
import createDatasetRepositoryInputValidator from "../middlewares/createDatasetRepositoryInputValidator";
import pushDatasetToRepositoryInputValidator from "../middlewares/pushDatasetToRepositoryInputValidator";
import syncDatasetWithRepositoryInputValidator from "../middlewares/syncDatasetWithRepositoryInputValidator";
import unlinkDatasetWithRepositoryInputValidator from "../middlewares/unlinkDatasetWithRepositoryInputValidator";
import type { RouterType } from "../router/Router";

export default function huggingfaceRoutesRegisterer(router: RouterType): void {
  router.GET(
    "/huggingface/oauth-callback",
    huggingfaceController.huggingfaceOAuthCallback
  );

  router.GET(
    "/huggingface/account",
    huggingfaceController.getHuggingfaceAccount
  );

  router.GET(
    "/huggingface/datasets",
    huggingfaceController.getDatasetsRepositories
  );

  router.POST(
    "/huggingface/datasets",
    createDatasetRepositoryInputValidator,
    huggingfaceController.createDatasetRepository
  );

  router.POST(
    "/huggingface/datasets/:datasetId/push",
    pushDatasetToRepositoryInputValidator,
    huggingfaceController.pushDatasetToRepository
  );

  router.POST(
    "/huggingface/datasets/:datasetId/sync",
    syncDatasetWithRepositoryInputValidator,
    huggingfaceController.syncDatasetWithRepository
  );

  router.POST(
    "/huggingface/datasets/:datasetId/unlink",
    unlinkDatasetWithRepositoryInputValidator,
    huggingfaceController.unlinkDatasetWithRepository
  );
}
