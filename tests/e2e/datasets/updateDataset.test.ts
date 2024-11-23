import { afterAll, describe, expect, it, beforeAll } from "bun:test";
import { request } from "../..";
import { fakeDatasets } from "../../fake-data/fakeDatasets";
import UserModel from "../../../src/models/UserModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import { emptyUpdateDatasetBodyMessage } from "../../../src/middlewares/updateDatasetInputValidator";

beforeAll(async () => {
  await UserModel.create({
    _id: process.env.TESTING_USER_ID,
    datasets: fakeDatasets,
    datasetsActivities: [],
    instructionsActivities: [],
  });
});

const path = "datasets/:datasetId";

describe(`PATCH /${path}`, () => {
  it("Should update the name of the dataset successflly", async () => {
    const fakeDatasetToUpdate = fakeDatasets[0];
    const fakeDatasetIdToUpdate = fakeDatasetToUpdate._id.toHexString();

    const updateData = { name: "New Dataset Name" };

    const { resBody, status } = await request.PATCH(
      path.replace(":datasetId", fakeDatasetIdToUpdate),
      updateData
    );

    expect(status).toBe(200);
    expect(resBody.data).toMatchObject({
      name: updateData.name,
      description: expect.any(String),
      instructionsCount: 0,
      _id: expect.toBeObjectId(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulDatasetUpdate
    );
  });

  it("Should update the description of the dataset successflly", async () => {
    const fakeDatasetToUpdate = fakeDatasets[1];
    const fakeDatasetIdToUpdate = fakeDatasetToUpdate._id.toHexString();

    const updateData = { description: "New Dataset Description" };

    const { resBody, status } = await request.PATCH(
      path.replace(":datasetId", fakeDatasetIdToUpdate),
      updateData
    );

    expect(status).toBe(200);
    expect(resBody.data).toMatchObject({
      name: expect.any(String),
      description: updateData.description,
      instructionsCount: 0,
      _id: expect.toBeObjectId(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulDatasetUpdate
    );
  });

  it("Should return an error because the request body is empty", async () => {
    const fakeDatasetToUpdate = fakeDatasets[2];
    const fakeDatasetIdToUpdate = fakeDatasetToUpdate._id.toHexString();

    const { resBody, status } = await request.PATCH(
      path.replace(":datasetId", fakeDatasetIdToUpdate),
      {}
    );

    expect(status).toBe(400);
    expect(resBody.message).toBe(emptyUpdateDatasetBodyMessage);
  });
});

afterAll(async () => {
  await UserModel.deleteMany();
});
