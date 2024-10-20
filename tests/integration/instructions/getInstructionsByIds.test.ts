import { describe, expect, it, afterAll, beforeAll } from "bun:test";
import { getRandomFakeDataset } from "../../fake-data/fakeDatasets";
import operationsResultsMessages from "../../../src/constants/operationsResultsMessages";
import InstructionModel from "../../../src/models/InstructionModel";
import { getFakeInstructions } from "../../fake-data/fakeInstructions";
import getInstructionsByIds_service from "../../../src/services/instructions/getInstructionsByIds_service";
import { Types } from "mongoose";
import databaseConnection from "../../../src/configurations/databaseConnection";

beforeAll(async () => {
  await databaseConnection();
});

describe("Test `getInstructionsByIds` service function", () => {
  it('Should return an error says that "the instructions ids are not provided"', async () => {
    const result = await getInstructionsByIds_service([]);

    expect(result.isSuccess).toBeFalse();
    expect(result.message).toBe(
      operationsResultsMessages.noInstructionsIdsProvided
    );
  });

  it("Should return an empty array because there are no instructions found in the provided ids", async () => {
    const result = await getInstructionsByIds_service([
      new Types.ObjectId(),
      new Types.ObjectId(),
    ]);

    expect(result.isSuccess).toBeTrue();
    expect(result.result).toBeInstanceOf(Array);
    expect(result.result).toBeEmpty();
    expect(result.message).toBe(
      operationsResultsMessages.noInstructionsFoundByIds
    );
  });

  it("Should get the instructions by their ids successfully", async () => {
    const fakeDatasetId = getRandomFakeDataset();
    const fakeInstructions = getFakeInstructions(fakeDatasetId._id);

    await InstructionModel.insertMany(fakeInstructions);
    const ids = fakeInstructions.map((instruction) => instruction._id);
    const result = await getInstructionsByIds_service(ids);

    expect(result.isSuccess).toBeTrue();
    expect(result.result).toBeInstanceOf(Array);
    expect(result.result?.length).toBe(fakeInstructions.length);
    result.result?.forEach((instruction) => {
      expect(instruction).toBeInstanceOf(InstructionModel);
    });
  });
});

afterAll(async () => {
  await InstructionModel.deleteMany();
});
