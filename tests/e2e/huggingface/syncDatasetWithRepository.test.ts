import { expect, describe, it, afterAll, mock } from "bun:test";
import UserModel from "../../../src/models/UserModel";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";
import { request } from "../..";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";

const uploadFileMock = mock(() => ({}))

mock.module("@huggingface/hub", () => {
  return { uploadFile: uploadFileMock };
});

const path = "huggingface/datasets/:datasetId/sync";

describe(`POST /${path}`, () => {
  it("Should complete syncing a dataset with its repository process successfully", async () => {
    const datasetRepository = {
      name: "datasetname",
      fileFormat: "JSONL",
      filePath: "data/dataset",
      isUpToDate: false,
      syncedAt: new Date()
    }

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
      commitTitle: "commit title",
      commitDescription: "commit description"
    }

    const { resBody, status } = await request.POST(
      path.replace(":datasetId", fakeDataset._id.toString()),
      commit
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

    expect(result?.datasets[0]?.repository?.isUpToDate).toBeTrue()

    const lastSync = result?.datasets[0]?.repository?.syncedAt
    const beforeLastSync = datasetRepository.syncedAt.getTime()
    expect(lastSync).toBeInstanceOf(Date)
    expect(lastSync?.getTime() as number).toBeGreaterThan(beforeLastSync)
  });
});

afterAll(async () => {
  mock.restore()
  await UserModel.deleteMany();
});
