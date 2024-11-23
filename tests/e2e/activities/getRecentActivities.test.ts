import { describe, expect, it } from "bun:test";
import { request } from "../..";
import UserModel from "../../../src/models/UserModel";
import { afterAll } from "bun:test";
import {
  fakeRecentDatasetActivities,
  fakeRecentInstructionActivities,
} from "../../fake-data/fakeRecentActivities";
import type {
  ActivitiesTypes,
  DatasetActivity,
  InstructionActivity,
} from "../../../src/types/activities";

const path = "recent-activities";

describe(`GET /${path}`, () => {
  it("Should return an object with empty activities arrays because there are no activities", async () => {
    const { resBody, status } = await request.GET(path);
    expect(status).toBe(200);
    expect(resBody.data.datasetsActivities).toBeEmpty();
    expect(resBody.data.instructionsActivities).toBeEmpty();
  });

  it("Should return an object contains activities arrays", async () => {
    await UserModel.create({
      _id: process.env.TESTING_USER_ID,
      datasetsActivities: fakeRecentDatasetActivities,
      instructionsActivities: fakeRecentInstructionActivities,
      datasets: []
    });

    const { resBody, status } = await request.GET(path);
    expect(status).toBe(200);
    expect(resBody.data.datasetsActivities).toHaveLength(
      fakeRecentDatasetActivities.length
    );
    expect(resBody.data.instructionsActivities).toHaveLength(
      fakeRecentInstructionActivities.length
    );

    resBody.data.datasetsActivities.every((activity: DatasetActivity) => {
      activityTypeCheck(activity.activity);
      datasetCheck(activity.dataset);
      expect(new Date(activity.activityDate)).toBeValidDate();
    });

    resBody.data.instructionsActivities.every(
      (activity: InstructionActivity) => {
        activityTypeCheck(activity.activity);
        datasetCheck(activity.dataset);
        expect(new Date(activity.activityDate)).toBeValidDate();
        expect(activity.instruction).toMatchObject({
          _id: expect.toBeObjectId(),
          systemMessage: expect.any(String),
          question: expect.any(String),
          answer: expect.any(String),
        });
      }
    );
  });
});

function activityTypeCheck(activity: ActivitiesTypes) {
  expect(["Modification", "New Resource", "Deletion"].includes(activity)).toBe(
    true
  );
}

function datasetCheck(dataset: DatasetActivity["dataset"]) {
  expect(dataset).toMatchObject({
    _id: expect.toBeObjectId(),
    name: expect.any(String),
    description: expect.any(String),
  });
}

afterAll(async () => {
  await UserModel.deleteMany();
});
