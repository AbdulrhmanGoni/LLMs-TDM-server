import { describe, expect, it, afterAll, afterEach } from "bun:test";
import { request } from "../..";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import UserModel from "../../../src/models/UserModel";
import { fakeDatasets } from "../../fake-data/fakeDatasets";

const path = "datasets";

describe(`GET /${path}`, () => {
  it("Should return an ampty datasets array", async () => {
    await UserModel.create({
      datasets: [],
      datasetsActivities: [],
      instructionsActivities: [],
      _id: process.env.TESTING_USER_ID,
    });

    const { resBody, status } = await request.GET(path);

    expect(status).toBe(200);
    expect(resBody.data).toBeInstanceOf(Array);
    expect(resBody.data).toBeEmpty();
    expect(resBody.message).toBe(operationsResultsMessages.noDatasets);
  });

  it("Should return an array of all datasets", async () => {
    await UserModel.create({
      datasets: fakeDatasets,
      datasetsActivities: [],
      instructionsActivities: [],
      _id: process.env.TESTING_USER_ID,
    });

    const { resBody, status } = await request.GET(path);

    expect(status).toBe(200);
    expect(resBody.data).toBeInstanceOf(Array);
    expect(resBody.data.length).toBe(fakeDatasets.length);
    expect(resBody.data).toContainEqual({
      _id: expect.toBeObjectId(),
      name: expect.any(String),
      description: expect.any(String),
      instructionsCount: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

afterEach(async () => {
  await UserModel.deleteMany();
});
