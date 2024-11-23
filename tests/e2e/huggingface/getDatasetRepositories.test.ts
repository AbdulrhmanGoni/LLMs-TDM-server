import { expect, describe, it, afterAll, mock } from "bun:test";
import UserModel from "../../../src/models/UserModel";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";
import { request } from "../..";

const fakeHFDatasetRepositories = [
  { name: "datasetName1" },
  { name: "datasetName2" },
  { name: "datasetName3" }
]

const listDatasetsMock = mock(() => {
  return (function* () {
    for (const repo of fakeHFDatasetRepositories) {
      yield repo
    }
  })()
})

mock.module("@huggingface/hub", () => {
  return {
    listDatasets: listDatasetsMock,
  };
});

const path = "huggingface/datasets";

describe(`GET /${path}`, () => {
  it("Should return an array of user's huggingface dataset repositories successfully", async () => {
    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount,
      datasets: [],
      datasetsActivities: [],
      instructionsActivities: [],
    })

    const { resBody, status } = await request.GET(path)

    expect(status).toBe(200)
    expect(listDatasetsMock).toHaveBeenCalledWith({
      accessToken: fakeUserHuggingfaceAccount.accessToken,
      search: {
        owner: fakeUserHuggingfaceAccount.username,
      },
    })
    expect(resBody.data).toBeInstanceOf(Array)
    expect(resBody.data).toHaveLength(3)
    expect(resBody.data).toEqual(fakeHFDatasetRepositories)
  });
});

afterAll(async () => {
  mock.restore()
  await UserModel.deleteMany();
});
