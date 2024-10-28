import { describe, expect, it, afterAll, beforeAll } from "bun:test";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import DatasetsModel from "../../../src/models/DatasetsModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import databaseConnection from "../../../src/configurations/databaseConnection";
import setDatasetRepository_service from "../../../src/services/datasets/setDatasetRepository_service";
import type { DatasetRepository } from "../../../src/types/huggingface";
import { Types } from "mongoose";

let fakeDataset = {} as any;

beforeAll(async () => {
  await databaseConnection();
  fakeDataset = getRandomFakeDataset();
  await DatasetsModel.create({
    _id: process.env.TESTING_USER_ID,
    datasets: [fakeDataset],
  });
});

describe("Test `setDatasetRepository_service` service function", async () => {
  it("Should set the repository for the dataset and returns the old dataset (without the repository)", async () => {
    const repository: DatasetRepository = {
      fileFormat: "JSONL",
      filePath: "dataset-file",
      isUpToDate: true,
      name: "User/testing-dataset-repo",
      syncedAt: new Date(),
    };

    const result = await setDatasetRepository_service({
      userId: process.env.TESTING_USER_ID,
      datasetId: fakeDataset._id.toString(),
      repository,
    });

    expect(result).toBeDefined();
    expect(result.isSuccess).toBeTrue();
    expect(result.result?._id.toString()).toBe(fakeDataset._id.toString());
    expect(result.result?.repository).toBeUndefined();
  });

  it("Should set the repository for the dataset and returns the updated dataset (wit the repository)", async () => {
    const repository: DatasetRepository = {
      fileFormat: "CSV",
      filePath: "dataset-file",
      isUpToDate: false,
      name: "User/testing-dataset-repo",
      syncedAt: new Date(),
    };

    const result = await setDatasetRepository_service({
      userId: process.env.TESTING_USER_ID,
      datasetId: fakeDataset._id.toString(),
      repository,
      options: { returnUpdatedDocument: true },
    });

    expect(result.isSuccess).toBeTrue();
    expect(result.result?._id.toString()).toBe(fakeDataset._id.toString());
    expect(result.result?.repository).toMatchObject({
      ...repository,
      syncedAt: expect.any(Date),
    });
  });

  it("Should set the repository of the dataset to null (unlinks the repository)", async () => {
    const result = await setDatasetRepository_service({
      userId: process.env.TESTING_USER_ID,
      datasetId: fakeDataset._id.toString(),
      repository: null,
      options: { returnUpdatedDocument: true },
    });

    expect(result).toBeDefined();
    expect(result.isSuccess).toBeTrue();
    expect(result.result?.repository).toBeUndefined();
  });

  it("Should return a failure because the targeted dataset in not existant", async () => {
    const randomFakeDatasetId = new Types.ObjectId()._id.toString();
    const result = await setDatasetRepository_service({
      userId: process.env.TESTING_USER_ID,
      datasetId: randomFakeDatasetId,
      repository: null,
    });

    expect(result.isSuccess).toBeFalse();
    expect(result.message).toBe(
      operationsResultsMessages.noDataset(randomFakeDatasetId)
    );
  });
});

afterAll(async () => {
  await DatasetsModel.deleteMany();
});
