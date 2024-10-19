import { describe, expect, it, afterEach, afterAll } from "bun:test";
import { request } from "../..";
import DatasetsModel from "../../../src/models/DatasetsModel";
import { fakeDatasets } from "../../fake-data/fakeDatasets";
import RecentActivitiesModel from "../../../src/models/RecentActivitiesModel";

const path = "datasets/overview";

describe(`GET /${path}`, () => {
  it("Should return the default datasets overview", async () => {
    await DatasetsModel.create({
      datasets: [],
      _id: process.env.TESTING_USER_ID,
    });

    const { resBody, status } = await request.GET(path);

    expect(status).toBe(200);
    expect(resBody.data).toMatchObject({
      totalDatasets: 0,
      addedDatasetsLastMonth: 0,
    });
  });

  it("Should return the datasets overview", async () => {
    await DatasetsModel.create({
      datasets: fakeDatasets,
      _id: process.env.TESTING_USER_ID,
    });

    const { resBody, status } = await request.GET(path);

    expect(status).toBe(200);
    expect(resBody.data).toMatchObject({
      totalDatasets: fakeDatasets.length,
      addedDatasetsLastMonth: fakeDatasets.length,
    });
  });
});

afterEach(async () => {
  await DatasetsModel.deleteMany();
});

afterAll(async () => {
  await RecentActivitiesModel.deleteMany();
});
