import { describe, expect, it, afterAll, afterEach } from "bun:test";
import { request } from "../..";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import DatasetsModel from "../../../src/models/DatasetsModel";
import { fakeDatasets } from "../../fake-data/fakeDatasets";
import RecentActivitiesModel from "../../../src/models/RecentActivitiesModel";

const path = "datasets";

describe(`GET /${path}`, () => {
  it("Should return an ampty datasets array", async () => {
    await DatasetsModel.create({
      datasets: [],
      _id: process.env.TESTING_USER_ID,
    });

    const { resBody, status } = await request.GET(path);

    expect(status).toBe(200);
    expect(resBody.data).toBeInstanceOf(Array);
    expect(resBody.data).toBeEmpty();
    expect(resBody.message).toBe(operationsResultsMessages.noDatasets);
  });

  it("Should return an array of all datasets", async () => {
    await DatasetsModel.create({
      datasets: fakeDatasets,
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
  await DatasetsModel.deleteMany();
});

afterAll(async () => {
  await RecentActivitiesModel.deleteMany();
});
