import { describe, expect, it, afterAll, afterEach } from "bun:test";
import { request } from "../..";
import { getFakeInstructions } from "../../fake-data/fakeInstructions";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import UserModel from "../../../src/models/UserModel";
import InstructionModel from "../../../src/models/InstructionModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";

const path = "instructions";

describe(`DELETE /${path}`, () => {
  it("Should fail to delete the instruction because it doesn't inside the datase", async () => {
    const fakeDataset = getRandomFakeDataset();

    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      datasets: [fakeDataset],
      datasetsActivities: [],
      instructionsActivities: [],
    });

    const randomInstructionToDelete = "5f8d9f1a2d2a1f001d0e002e";

    const searchParams = new URLSearchParams();
    searchParams.append("datasetId", fakeDataset._id.toHexString());
    searchParams.append("instructionId", randomInstructionToDelete);
    const url = `${path}?${searchParams.toString()}`;
    const { resBody, status } = await request.DELETE(url);

    expect(status).toBe(400);
    expect(resBody.message).toBe(
      operationsResultsMessages.noInstructionToDelete
    );
  });

  it("Should delete the instruction from the dataset successfully", async () => {
    const fakeDataset = getRandomFakeDataset();

    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      datasets: [fakeDataset],
      datasetsActivities: [],
      instructionsActivities: [],
    });

    const fakeInstructions = getFakeInstructions(fakeDataset._id);
    await InstructionModel.insertMany(fakeInstructions);

    const instructionToDelete = fakeInstructions[0];

    const searchParams = new URLSearchParams();
    searchParams.append("datasetId", fakeDataset._id.toHexString());
    searchParams.append("instructionId", instructionToDelete._id.toHexString());
    const url = `${path}?${searchParams.toString()}`;
    const { resBody, status } = await request.DELETE(url);

    expect(status).toBe(200);
    expect(resBody.data).toBe(true);
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulInstructionDeletion
    );
  });
});

afterEach(async () => {
  await UserModel.deleteMany();
});

afterAll(async () => {
  await InstructionModel.deleteMany();
});
