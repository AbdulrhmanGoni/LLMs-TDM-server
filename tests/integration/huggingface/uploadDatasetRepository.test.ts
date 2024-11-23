import { describe, expect, it, afterAll, beforeAll, mock } from "bun:test";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import UserModel from "../../../src/models/UserModel";
import databaseConnection from "../../../src/configurations/databaseConnection";
import huggingfaceService from "../../../src/services/huggingface";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";

const uploadFileMock = mock(async () => ({}))
mock.module("@huggingface/hub", () => {
  return { uploadFile: uploadFileMock };
});

let fakeDataset = getRandomFakeDataset()

beforeAll(async () => {
  await databaseConnection();
  await UserModel.create({
    _id: process.env.TESTING_USER_ID,
    datasets: [fakeDataset],
    datasetsActivities: [],
    instructionsActivities: [],
    huggingfaceAccount: fakeUserHuggingfaceAccount
  })
});

describe("Test `uploadDatasetRepository` service method", () => {
  it("Should fail to upload the dataset because the dataset has not linked repository", async () => {
    const result = await huggingfaceService.uploadDatasetRepository({
      userId: process.env.TESTING_USER_ID,
      datasetId: fakeDataset._id.toString(),
    });

    expect(result.isSuccess).toBeFalse();
    expect(uploadFileMock).not.toHaveBeenCalled();
    expect(result.message).toBe(operationsResultsMessages.noLinkedDatasetRepository);
  });

  it("Should complete uploading dataset repository process successully", async () => {

    const datasetRepository = {
      fileFormat: "CSV",
      filePath: "data/filePath",
      name: "username/datasetname",
    }

    const commit = {
      commitTitle: "commit title",
      commitDescription: "commit description",
    }

    await UserModel.updateOne(
      { _id: process.env.TESTING_USER_ID },
      {
        datasets: [
          {
            ...fakeDataset,
            repository: datasetRepository
          }
        ],
      }
    )

    const result = await huggingfaceService.uploadDatasetRepository({
      userId: process.env.TESTING_USER_ID,
      datasetId: fakeDataset._id.toString(),
      ...commit
    });

    expect(result.isSuccess).toBeTrue();
    expect(uploadFileMock).toHaveBeenCalledWith({
      ...commit,
      file: {
        path: datasetRepository.filePath,
        content: expect.any(Blob),
      },
      repo: {
        name: datasetRepository.name,
        type: "dataset",
      },
      accessToken: fakeUserHuggingfaceAccount.accessToken,
    });
    expect(result.message).toBe(operationsResultsMessages.successullyDatasetUpload);
  });
});

afterAll(async () => {
  mock.restore()
  await UserModel.deleteMany();
});
