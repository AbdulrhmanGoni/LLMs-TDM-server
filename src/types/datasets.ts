export type DatasetInput = {
  name: string;
  description: string;
};

export type UpdateDatasetInput = DatasetInput;
export type Dataset = DatasetInput & {
  id: string;
  instructionsCount: number;
  createdAt: Date;
  updatedAt: Date;
};
