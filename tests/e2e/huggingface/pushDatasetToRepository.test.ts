import { expect, describe, it, afterAll, mock } from "bun:test";
import UserModel from "../../../src/models/UserModel";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";
import { request } from "../..";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";

const uploadFileMock = mock(() => ({}))

mock.module("@huggingface/hub", () => {
  return { uploadFile: uploadFileMock };
});

const path = "huggingface/datasets/:datasetId/push";

describe(`POST /${path}`, () => {
  it("Should complete pushing a dataset to repository process successfully", async () => {
    const fakeDataset = getRandomFakeDataset()
    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount,
      datasets: [fakeDataset],
      datasetsActivities: [],
      instructionsActivities: [],
    })

    const datasetRepository = {
      name: "datasetname",
      fileFormat: "JSONL",
      filePath: "data/dataset",
    }

    const commit = {
      commitTitle: "commit title",
      commitDescription: "commit description"
    }

    const { resBody, status } = await request.POST(
      path.replace(":datasetId", fakeDataset._id.toString()),
      {
        repository: datasetRepository,
        ...commit,
      }
    )

    expect(status).toBe(200)
    expect(resBody.data).toBeTrue()
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
    })

    const result = await UserModel.findById(process.env.TESTING_USER_ID);

    expect(result?.datasets[0]?.repository).toMatchObject({
      name: datasetRepository.name,
      fileFormat: datasetRepository.fileFormat,
      filePath: datasetRepository.filePath,
      syncedAt: expect.any(Date),
      isUpToDate: true,
    })
  });
});

afterAll(async () => {
  mock.restore()
  await UserModel.deleteMany();
});
