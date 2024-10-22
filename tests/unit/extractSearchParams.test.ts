import { describe, expect, it } from "bun:test";
import extractSearchParams from "../../src/utilities/extractSearchParams";

describe("Test `extractSearchParams` utility function", () => {
  it("Should return an object contains the search params", () => {
    expect(
      extractSearchParams(
        new URL("http://localhost/?searchParam1=value1&searchParam2=value2")
      )
    ).toEqual({
      searchParam1: "value1",
      searchParam2: "value2",
    });
  });

  it("Should return an empty object because there are no search params", () => {
    expect(extractSearchParams(new URL("http://localhost"))).toEqual({});
  });
});
