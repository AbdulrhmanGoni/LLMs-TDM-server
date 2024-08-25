import addInstruction_service from "./addInstruction_service";
import getInstructions_service from "./getInstructions_service";
import deleteInstruction_service from "./deleteInstruction_service";
import updateInstruction_service from "./updateInstruction_service";

class InstructionsService {
  constructor() {}

  addInstruction = addInstruction_service;

  getInstructions = getInstructions_service;

  updateInstruction = updateInstruction_service;

  deleteInstruction = deleteInstruction_service;
}

const instructionsService = new InstructionsService();

export default instructionsService;
