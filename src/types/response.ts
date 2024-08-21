export type PaginationResponse<Resource, ResourceName extends keyof any> = {
  areThereMore: boolean;
} & {
  [key in ResourceName]: Resource[];
};

export type PaginationModel = {
  page?: number;
  pageSize?: number;
};

export type ServiceOperationResultType<T = any> = {
  result?: T;
  message?: string;
  isSuccess?: boolean;
};
