import instructionsController from "../controllers/instructions";
import type { RouterType } from "../router/Router";
import addInstructionInputValidator from "../middlewares/addInstructionInputValidator";
import deleteInstructionInputValidator from "../middlewares/deleteInstructionInputValidator";
import updateInstructionInputValidator from "../middlewares/updateInstructionInputValidator";

export default function instructionsRoutesRegisterer(router: RouterType): void {
  const baseRoute = "/instructions";

  router.GET(baseRoute, instructionsController.getInstructions);

  router.POST(
    baseRoute,
    addInstructionInputValidator,
    instructionsController.addInstruction
  );

  router.DELETE(
    baseRoute,
    deleteInstructionInputValidator,
    instructionsController.deleteInstruction
  );

  router.PATCH(
    baseRoute,
    updateInstructionInputValidator,
    instructionsController.updateInstruction
  );
}
