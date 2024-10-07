const operationsResultsMessages = {
  successfulDatasetCreation: (datasetName: string) =>
    `"${datasetName}" dataset created successfuly`,
  successfulDatasetUpdate: "The dataset was updated successfully",
  failedDatasetCreation: (datasetName: string) =>
    `"${datasetName}" dataset creation failed`,
  noDatasets: "There are no datasets yet",
  noDataset: (datasetId: string) =>
    `There is no dataset with "${datasetId}" id`,
  successfulDatasetDeletion: "The dataset was deleted successfully",
  noInstructionsForDataset: (datasetId: string) =>
    `No instructions found for a dataset with this id: ${datasetId}`,
  successfulInstructionsCountIncrement:
    "Instructions count incremented successfully",
  failedInstructionsCountIncrement: "Faild to increment instructions count",
  successfulAllInstructionsDeletion:
    "The instructions of the dataset was deleted successfully",
  failedDeletingAllInstructions:
    "Deleting the instructions of this dataset failed",
  noInstructionsToDelete:
    "There are no instructions to delete from this dataset",

  successfulInstructionAddition:
    "The instruction was added to the dataset successfully",
  failedInstructionAddition: "Adding the instruction to the dataset failed",
  successfulInstructionDeletion:
    "The instruction was deleted from the dataset successfully",
  failedInstructionDeletion:
    "Failed to delete the instruction from the dataset",
  noInstructionToDelete:
    "The targeted instruction not found to delete it from the dataset",
  successfulInstructionUpdate: "The instruction updated successfully",
  failedInstructionUpdate: "Failed to update the instruction",

  noUser: (userId: string) => `There is no user with "${userId}" id`,
};

export default operationsResultsMessages;
