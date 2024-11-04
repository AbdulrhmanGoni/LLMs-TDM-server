import { expect, describe, it, afterAll, mock } from "bun:test";
import DatasetsModel from "../../../src/models/DatasetsModel";
import { fakeUserHuggingfaceAccount } from "../../fake-data/fakeUserHuggingfaceAccount";
import { request } from "../..";

const exampleDotCom = "https://example.com"

mock.module("@huggingface/hub", () => {
  return {
    createRepo: async () => ({
      repoUrl: exampleDotCom
    }),
  };
});

const path = "huggingface/datasets";

describe(`POST /${path}`, () => {
  it("Should complete creating huggingface dataset repository process successfully", async () => {
    await DatasetsModel.create({
      _id: process.env.TESTING_USER_ID,
      huggingfaceAccount: fakeUserHuggingfaceAccount,
      datasets: []
    })

    const { resBody, status } = await request.POST(path, {
      name: "username",
      license: "mit"
    })

    expect(status).toBe(200)
    expect(resBody.data).toMatchObject({
      repoUrl: exampleDotCom
    })
  });
});

afterAll(async () => {
  mock.restore()
  await DatasetsModel.deleteMany();
});
