import createHuggingfaceAccount_service from "./createHuggingfaceAccount_service";
import huggingfaceOAuthCallback_service from "./huggingfaceOAuthCallback_service";

export class HuggingfaceService {
  constructor() {}

  createHuggingfaceAccount = createHuggingfaceAccount_service;

  huggingfaceOAuthCallback = huggingfaceOAuthCallback_service;
}

const huggingfaceService = new HuggingfaceService();

export default huggingfaceService;
