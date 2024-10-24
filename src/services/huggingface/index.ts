import createHuggingfaceAccount_service from "./createHuggingfaceAccount_service";
import huggingfaceOAuthCallback_service from "./huggingfaceOAuthCallback_service";
import refreshHuggingfaceAccessToken_service from "./refreshHuggingfaceAccessToken_service";
import getHuggingfaceAccount_service from "./getHuggingfaceAccount_service";
import createDatasetRepository_service from "./createDatasetRepository_service";
import getDatasetsRepositories_service from "./getDatasetsRepositories_service";
import uploadDatasetRepository_service from "./uploadDatasetRepository_service";
import pushDatasetToRepository_service from "./pushDatasetToRepository_service";
import syncDatasetWithRepository_service from "./syncDatasetWithRepository_service";
import unlinkDatasetWithRepository_service from "./unlinkDatasetWithRepository_service";

export class HuggingfaceService {
  constructor() {}

  createHuggingfaceAccount = createHuggingfaceAccount_service;

  huggingfaceOAuthCallback = huggingfaceOAuthCallback_service;

  refreshHuggingfaceAccessToken = refreshHuggingfaceAccessToken_service;

  getHuggingfaceAccount = getHuggingfaceAccount_service;

  createDatasetRepository = createDatasetRepository_service;

  getDatasetsRepositories = getDatasetsRepositories_service;

  uploadDatasetRepository = uploadDatasetRepository_service;

  pushDatasetToRepository = pushDatasetToRepository_service;

  syncDatasetWithRepository = syncDatasetWithRepository_service;

  unlinkDatasetWithRepository = unlinkDatasetWithRepository_service;
}

const huggingfaceService = new HuggingfaceService();

export default huggingfaceService;
