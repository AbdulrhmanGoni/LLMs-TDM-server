const operationsResultsMessages = {
  successfulDatasetCreation: (datasetName: string) =>
    `"${datasetName}" dataset created successfuly`,
  successfulDatasetUpdate: "The dataset was updated successfully",
  noDatasets: "There are no datasets yet",
  noDataset: (datasetId: string) =>
    `There is no dataset with "${datasetId}" id`,
  successfulDatasetDeletion: "The dataset was deleted successfully",
  maxDatasetsReached: "You have reached the maximum number of datasets",
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
  noInstructionsFoundByIds: "No instructions found by the provided ids",
  noInstructionsIdsProvided: "No instructions ids provided",

  noUser: (userId: string) => `There is no user with "${userId}" id`,

  failedActivityRegistration: "Activity registration failed",

  successfulHuggingfaceAccountCreation:
    "Your huggingface account was created successfully",
  failedHuggingfaceAccountCreation: "Failed to create Your huggingface account",
  failedHuggingfaceOAuthProcess:
    "Huggingface OAuth callback failed to complete",
  noHuggingfaceAccount: "You don't have a linked huggingface account",
  successullyDatasetUpload:
    "The dataset has been uploaded to the repository successfully",
  noLinkedDatasetRepository: "The dataset has no linked huggingface repository",
  successfulDatasetSyncWithRepository:
    "The Dataset has been synced with the repository successfully",
};

export default operationsResultsMessages;
