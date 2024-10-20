import { describe, expect, it, afterAll } from "bun:test";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import InstructionModel from "../../../src/models/InstructionModel";
import { getFakeInstructions } from "../../fake-data/fakeInstructions";
import deleteAllDatasetInstructions_service from "../../../src/services/instructions/deleteAllDatasetInstructions_service";

describe("Test `deleteAllDatasetInstructions` service function", () => {
  it("Should not delete anything because there are no instructions in the dataset", async () => {
    const fakeDatasetId = getRandomFakeDataset();

    const result = await deleteAllDatasetInstructions_service(
      fakeDatasetId._id.toString()
    );

    expect(result.isSuccess).toBeTrue();
    expect(result.message).toBe(
      operationsResultsMessages.noInstructionsToDelete
    );
  });

  it("Should delete the all instructions of the dataset successfully", async () => {
    const fakeDatasetId = getRandomFakeDataset();
    const fakeInstructions = getFakeInstructions(fakeDatasetId._id);

    await InstructionModel.insertMany(fakeInstructions);

    const result = await deleteAllDatasetInstructions_service(
      fakeDatasetId._id.toString()
    );

    expect(result.isSuccess).toBeTrue();
    expect(result.message).toBe(
      operationsResultsMessages.successfulAllInstructionsDeletion
    );

    const instructionsCount = await InstructionModel.find({
      datasetId: fakeDatasetId._id.toString(),
    }).countDocuments();

    expect(instructionsCount).toBe(0);
  });
});

afterAll(async () => {
  await InstructionModel.deleteMany();
});
