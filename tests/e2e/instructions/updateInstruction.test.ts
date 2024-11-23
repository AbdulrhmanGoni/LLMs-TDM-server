import { afterAll, describe, expect, it } from "bun:test";
import { request } from "../..";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import UserModel from "../../../src/models/UserModel";
import InstructionModel from "../../../src/models/InstructionModel";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import { emptyUpdateInstructionBodyMessage } from "../../../src/middlewares/updateInstructionInputValidator";
import { getFakeInstructions } from "../../fake-data/fakeInstructions";

const path = "instructions";

describe(`PATCH /${path}`, async () => {
  const fakeDataset = getRandomFakeDataset();
  const fakeDatasetId = fakeDataset._id;
  const fakeInstructions = getFakeInstructions(fakeDatasetId);
  await UserModel.create({
    _id: process.env.TESTING_USER_ID,
    datasets: [fakeDataset],
    datasetsActivities: [],
    instructionsActivities: [],
  });
  await InstructionModel.insertMany(fakeInstructions);

  it("Should update the `systemMessage` field of the instruction successflly", async () => {
    const fakeInstructionToUpdate = fakeInstructions[0];
    const fakeInstructionIdToUpdate = fakeInstructionToUpdate._id.toHexString();

    const updateData = {
      systemMessage: "New system message for the instruction",
    };
    const searchParams = new URLSearchParams();
    searchParams.set("instructionId", fakeInstructionIdToUpdate);
    searchParams.set("datasetId", fakeDatasetId.toHexString());

    const { resBody, status } = await request.PATCH(
      `${path}?${searchParams}`,
      updateData
    );

    expect(status).toBe(200);
    expect(resBody.data).toMatchObject({
      _id: fakeInstructionIdToUpdate,
      systemMessage: updateData.systemMessage,
      question: expect.any(String),
      answer: expect.any(String),
      datasetId: fakeDatasetId.toHexString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulInstructionUpdate
    );
  });

  it("Should update `question` & `answer` fields of the instruction successflly", async () => {
    const fakeInstructionToUpdate = fakeInstructions[1];
    const fakeInstructionIdToUpdate = fakeInstructionToUpdate._id.toHexString();

    const updateData = {
      question: "Is this the new question for the instruction?",
      answer: "Yes, this is the new question for the instruction?",
    };
    const searchParams = new URLSearchParams();
    searchParams.set("instructionId", fakeInstructionIdToUpdate);
    searchParams.set("datasetId", fakeDatasetId.toHexString());

    const { resBody, status } = await request.PATCH(
      `${path}?${searchParams}`,
      updateData
    );

    expect(status).toBe(200);
    expect(resBody.data).toMatchObject({
      _id: fakeInstructionIdToUpdate,
      ...updateData,
      systemMessage: expect.any(String),
      datasetId: fakeDatasetId.toHexString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(resBody.message).toBe(
      operationsResultsMessages.successfulInstructionUpdate
    );
  });

  it("Should return an error because the request body is empty", async () => {
    const fakeInstructionToUpdate = fakeInstructions[2];
    const fakeInstructionIdToUpdate = fakeInstructionToUpdate._id.toHexString();

    const searchParams = new URLSearchParams();
    searchParams.set("instructionId", fakeInstructionIdToUpdate);
    searchParams.set("datasetId", fakeDatasetId.toHexString());

    const { resBody, status } = await request.PATCH(
      `${path}?${searchParams}`,
      {}
    );

    expect(status).toBe(400);
    expect(resBody.message).toBe(emptyUpdateInstructionBodyMessage);
  });
});

afterAll(async () => {
  await UserModel.deleteMany();
  await InstructionModel.deleteMany();
});
