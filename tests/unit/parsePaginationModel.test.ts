import { describe, expect, it } from "bun:test";
import parsePaginationModel from "../../src/utilities/parsePaginationModel";

describe("Test `parsePaginationModel` utility function", () => {
  it("Should return an object contains right`skip` and `limit` values", () => {
    expect(parsePaginationModel({ page: 1, pageSize: 20 })).toEqual({
      skip: 0,
      limit: 20,
    });
  });

  it("Should return an object contains right `skip` and `limit` values", () => {
    expect(parsePaginationModel({ page: 5, pageSize: 5 })).toEqual({
      skip: 20,
      limit: 5,
    });
  });
});
