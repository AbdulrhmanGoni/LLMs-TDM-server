import huggingfaceOAuthCallback_controller from "./huggingfaceOAuthCallback_controller";
import getHuggingfaceAccount_controller from "./getHuggingfaceAccount_controller";

class HuggingfaceController {
  constructor() {}

  huggingfaceOAuthCallback = huggingfaceOAuthCallback_controller;

  getHuggingfaceAccount = getHuggingfaceAccount_controller;

}

const huggingfaceController = new HuggingfaceController();

export default huggingfaceController;
