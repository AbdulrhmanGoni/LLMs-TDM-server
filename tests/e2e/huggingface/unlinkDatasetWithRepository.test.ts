import { expect, describe, it, afterEach, afterAll, mock } from "bun:test";
import UserModel from "../../../src/models/UserModel";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";
import { request } from "../..";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";

const deleteRepoMock = mock(() => ({}))
const deleteFileMock = mock(() => ({}))

mock.module("@huggingface/hub", () => {
  return {
    deleteFile: deleteFileMock,
    deleteRepo: deleteRepoMock,
  };
});

const path = "huggingface/datasets/:datasetId/unlink";

describe(`POST /${path}`, () => {
  const datasetRepository = {
    name: "datasetname",
    fileFormat: "JSONL",
    filePath: "data/dataset",
    isUpToDate: false,
    syncedAt: new Date()
  }

  it("Should only unlink the dataset with the repository successfully", async () => {
    const fakeDataset = {
      ...getRandomFakeDataset(),
      repository: datasetRepository
    }

    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount,
      datasets: [fakeDataset],
      datasetsActivities: [],
      instructionsActivities: [],
    })

    const { resBody, status } = await request.POST(
      path.replace(":datasetId", fakeDataset._id.toString()),
      {}
    )

    expect(status).toBe(200)
    expect(resBody.data).toBeTrue()

    const result = await UserModel.findById(process.env.TESTING_USER_ID);

    expect(result?.datasets[0]?.repository).toBeUndefined()
  });

  it("Should unlink the dataset with the repository and delete the dataset file from the repository", async () => {
    const fakeDataset = {
      ...getRandomFakeDataset(),
      repository: datasetRepository
    }

    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount,
      datasets: [fakeDataset],
      datasetsActivities: [],
      instructionsActivities: [],
    })

    const commit = {
      title: "commit title",
      description: "commit description"
    }

    const { resBody, status } = await request.POST(
      path.replace(":datasetId", fakeDataset._id.toString()),
      {
        deleteDatasetFile: true,
        commitTitle: commit.title,
        commitDescription: commit.description
      }
    )

    expect(status).toBe(200)
    expect(resBody.data).toBeTrue()
    expect(deleteFileMock).toHaveBeenCalledWith({
      accessToken: fakeUserHuggingfaceAccount.accessToken,
      repo: {
        name: datasetRepository.name,
        type: "dataset",
      },
      path: datasetRepository.filePath,
      commitTitle: commit.title,
      commitDescription: commit.description,
    })

    const result = await UserModel.findById(process.env.TESTING_USER_ID);

    expect(result?.datasets[0]?.repository).toBeUndefined()
  });

  it("Should unlink the dataset with the repository and delete the entire repository", async () => {
    const fakeDataset = {
      ...getRandomFakeDataset(),
      repository: datasetRepository
    }

    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount,
      datasets: [fakeDataset],
      datasetsActivities: [],
      instructionsActivities: [],
    })

    const { resBody, status } = await request.POST(
      path.replace(":datasetId", fakeDataset._id.toString()),
      { deleteRepository: true }
    )

    expect(status).toBe(200)
    expect(resBody.data).toBeTrue()
    expect(deleteRepoMock).toHaveBeenCalledWith({
      accessToken: fakeUserHuggingfaceAccount.accessToken,
      repo: {
        name: datasetRepository.name,
        type: "dataset",
      },
    })
    const result = await UserModel.findById(process.env.TESTING_USER_ID);

    expect(result?.datasets[0]?.repository).toBeUndefined()
  });
});

afterEach(async () => {
  await UserModel.deleteMany();
});

afterAll(() => { mock.restore() });
