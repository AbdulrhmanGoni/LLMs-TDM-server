import huggingfaceOAuthCallback_controller from "./huggingfaceOAuthCallback_controller";
import getHuggingfaceAccount_controller from "./getHuggingfaceAccount_controller";
import createDatasetRepository_controller from "./createDatasetRepository_controller";

class HuggingfaceController {
  constructor() {}

  huggingfaceOAuthCallback = huggingfaceOAuthCallback_controller;

  getHuggingfaceAccount = getHuggingfaceAccount_controller;

  createDatasetRepository = createDatasetRepository_controller;
}

const huggingfaceController = new HuggingfaceController();

export default huggingfaceController;
