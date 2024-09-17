import ServiceOperationResult from "../../utilities/ServiceOperationResult";
import RecentActivitiesModel from "../../models/RecentActivitiesModel";
import type { ServiceOperationResultType } from "../../types/response";
import instructionsService from "../instructions";
import type {
  DatasetActivity,
  InstructionActivity,
} from "../../types/activities";
import type { Instruction } from "../../types/instructions";
import type { Types } from "mongoose";
import type { Dataset } from "../../types/datasets";

type InstructionActivityFromPipeline = InstructionActivity & {
  dataset: Dataset;
};

type DatasetActivityFromPipeline = DatasetActivity & {
  dataset: Dataset;
};

type AggregationResultType = {
  datasetsActivities: DatasetActivityFromPipeline[];
  instructionsActivities: InstructionActivityFromPipeline[];
};

export default async function getRecentActivities_service(): Promise<ServiceOperationResultType> {
  const [result] = await RecentActivitiesModel.aggregate<AggregationResultType>(
    [
      {
        $facet: {
          datasetsActivities: [
            { $unwind: "$recentActivitiesOfDatasets" },
            { $replaceRoot: { newRoot: "$recentActivitiesOfDatasets" } },
            {
              $lookup: {
                from: "datasets",
                let: { targetId: "$datasetId" },
                as: "dataset",
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$targetId"] } } },
                ],
              },
            },
            {
              $project: {
                dataset: { $first: "$dataset" },
                activity: 1,
                activityDate: 1,
              },
            },
          ],
          instructionsActivities: [
            { $unwind: "$recentActivitiesOfInstructions" },
            { $replaceRoot: { newRoot: "$recentActivitiesOfInstructions" } },
            {
              $lookup: {
                from: "datasets",
                let: { targetId: "$datasetId" },
                as: "dataset",
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$targetId"] } } },
                ],
              },
            },
            {
              $set: {
                dataset: { $first: "$dataset" },
              },
            },
          ],
        },
      },
    ]
  );

  if (result) {
    const datasetsInstructionsData: datasetsInstructionsData = {};

    // Collects the ids of instructions in instructions activities array
    // that exist in the same dataset in one array property inside
    // `datasetsInstructionsMap` object (preperty name is their dataset id).
    const datasetsInstructionsMap = createDatasetsInstructionsMap(
      result.instructionsActivities
    );

    // Queries the instructions of each dataset in `datasetsInstructionsMap`
    // object and adds the queried instructions of each dataset to
    // `datasetsInstructionsData` object as { [datasetId]: [...instructions] }
    await queryDatasetsInstructions(
      datasetsInstructionsMap,
      datasetsInstructionsData
    );

    return ServiceOperationResult.success({
      ...result,
      // takes the instructions activities array that contains instructions ids
      // converts returns instructions activities array contains the actually
      // instructions data.
      instructionsActivities: rechapeInstructionsActivities(
        result.instructionsActivities,
        datasetsInstructionsData
      ),
    });
  }

  return ServiceOperationResult.failure("No Activities had registered", false);
}

type DatasetsInstructionsMap = Record<string, Types.ObjectId[]>;
type datasetsInstructionsData = Record<string, Instruction[]>;

function createDatasetsInstructionsMap(
  instructionsActivities: InstructionActivityFromPipeline[]
) {
  const datasetsInstructionsMap: DatasetsInstructionsMap = {};

  instructionsActivities.forEach((act) => {
    const key = act.datasetId.toString();
    const instructionsIds = datasetsInstructionsMap[key];
    if (instructionsIds instanceof Array) {
      instructionsIds.push(act.instructionId);
      datasetsInstructionsMap[key] = instructionsIds;
    } else {
      datasetsInstructionsMap[key] = [act.instructionId];
    }
  }, {});

  return datasetsInstructionsMap;
}

async function queryDatasetsInstructions(
  datasetsInstructionsMap: DatasetsInstructionsMap,
  datasetsInstructionsData: datasetsInstructionsData
) {
  for (const key in datasetsInstructionsMap) {
    const { isSuccess, result } =
      await instructionsService.getInstructionsByIds(
        key,
        datasetsInstructionsMap[key]
      );

    if (isSuccess && result) {
      datasetsInstructionsData[key] = result;
    }
  }
}

function rechapeInstructionsActivities(
  instructions: InstructionActivityFromPipeline[],
  datasetsInstructionsData: datasetsInstructionsData
) {
  return instructions.map((act) => {
    const data = datasetsInstructionsData[act.datasetId.toString()].find(
      (ins) => ins.id === act.instructionId.toString()
    );

    const { dataset, activity, activityDate } = act;

    return {
      activityDate,
      activity,
      dataset,
      instruction: data,
    };
  });
}
