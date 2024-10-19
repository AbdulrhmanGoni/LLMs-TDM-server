import { afterAll, describe, expect, it } from "bun:test";
import { request } from "../..";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import DatasetsModel from "../../../src/models/DatasetsModel";
import RecentActivitiesModel from "../../../src/models/RecentActivitiesModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";

const path = "datasets";

describe(`POST /${path}`, () => {
  it("Should create a dataset successflly", async () => {
    const fakeDataset = getRandomFakeDataset();
    const { resBody, status } = await request.POST(path, fakeDataset);

    expect(status).toBe(201);
    expect(resBody.data).toMatchObject({
      name: expect.any(String),
      description: expect.any(String),
      instructionsCount: 0,
      _id: expect.toBeObjectId(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulDatasetCreation(fakeDataset.name)
    );
  });

  it("Should response validate error 'description filed is required'", async () => {
    const { name } = getRandomFakeDataset();
    const { resBody, status } = await request.POST(path, { name });
    expect(status).toBe(403);
    expect(resBody.error.validationErrors.length).toBeGreaterThan(0);
    const validationError = resBody.error.validationErrors[0];
    expect(validationError.filed).toBe("description");
    expect(validationError.message).toMatch("is required");
  });
});

afterAll(async () => {
  await DatasetsModel.deleteMany();
  await RecentActivitiesModel.deleteMany();
});
