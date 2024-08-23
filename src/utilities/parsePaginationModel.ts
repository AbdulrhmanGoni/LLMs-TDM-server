import type { PaginationModel } from "../types/response";

const defaultPageSize = 5;
const defaultPageNumber = 1;

export default function parsePaginationModel(model: PaginationModel) {
  const limit = model?.pageSize || defaultPageSize;
  const skip = ((model?.page || defaultPageNumber) - 1) * limit;

  return { limit, skip };
}
