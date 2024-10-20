import { describe, expect, it, afterAll, beforeAll } from "bun:test";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import DatasetsModel from "../../../src/models/DatasetsModel";
import incrementInstructionsCount_service from "../../../src/services/datasets/incrementInstructionsCount_service";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import databaseConnection from "../../../src/configurations/databaseConnection";

beforeAll(async () => {
  await databaseConnection();
});

describe("Test `incrementInstructionsCount_service` service function", () => {
  it("Should fail to increment the instructions count of the dataset because the dataset is not exist", async () => {
    const fakeDatasetId = getRandomFakeDataset()._id.toString();

    const result = await incrementInstructionsCount_service(
      process.env.TESTING_USER_ID,
      fakeDatasetId
    );

    expect(result.isSuccess).toBeFalse();
    expect(result.message).toBe(
      operationsResultsMessages.noDataset(fakeDatasetId)
    );
  });

  it("Should increment the instructions count of the dataset successfully", async () => {
    const userId = process.env.TESTING_USER_ID;
    const fakeDataset = getRandomFakeDataset();

    await DatasetsModel.create({ _id: userId, datasets: [fakeDataset] });

    await incrementInstructionsCount_service(
      process.env.TESTING_USER_ID,
      fakeDataset._id.toString()
    );

    const dataset = await DatasetsModel.findOne({ _id: userId });

    expect(dataset).toBeDefined();
    expect(dataset?._id).toBe(userId);
    expect(dataset?.datasets[0].instructionsCount).toBe(1);
  });
});

afterAll(async () => {
  await DatasetsModel.deleteMany();
});
