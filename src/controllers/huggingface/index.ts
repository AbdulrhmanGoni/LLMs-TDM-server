import huggingfaceOAuthCallback_controller from "./huggingfaceOAuthCallback_controller";
import getHuggingfaceAccount_controller from "./getHuggingfaceAccount_controller";
import createDatasetRepository_controller from "./createDatasetRepository_controller";
import getDatasetsRepositories_controller from "./getDatasetsRepositories_controller";
import pushDatasetToRepository_controller from "./pushDatasetToRepository_controller";
import syncDatasetWithRepository_controller from "./syncDatasetWithRepository_controller";
import unlinkDatasetWithRepository_controller from "./unlinkDatasetWithRepository_controller";

class HuggingfaceController {
  constructor() {}

  huggingfaceOAuthCallback = huggingfaceOAuthCallback_controller;

  getHuggingfaceAccount = getHuggingfaceAccount_controller;

  createDatasetRepository = createDatasetRepository_controller;

  getDatasetsRepositories = getDatasetsRepositories_controller;

  pushDatasetToRepository = pushDatasetToRepository_controller;

  syncDatasetWithRepository = syncDatasetWithRepository_controller;

  unlinkDatasetWithRepository = unlinkDatasetWithRepository_controller;
}

const huggingfaceController = new HuggingfaceController();

export default huggingfaceController;
