import addInstruction_controller from "./addInstruction_controller";
import deleteInstruction_controller from "./deleteInstruction_controller";
import getInstructions_controller from "./getInstructions_controller";
import updateInstruction_controller from "./updateInstruction_controller";

class InstructionsController {
  constructor() {}

  addInstruction = addInstruction_controller;

  getInstructions = getInstructions_controller;

  updateInstruction = updateInstruction_controller;

  deleteInstruction = deleteInstruction_controller;
}

const instructionsController = new InstructionsController();

export default instructionsController;
