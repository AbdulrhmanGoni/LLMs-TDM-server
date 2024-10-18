import { expect } from "bun:test";
import { isValidObjectId } from "mongoose";

declare module "bun:test" {
  interface AsymmetricMatchers {
    toBeObjectId(): void;
  }
  interface Matchers<T> {
    toBeObjectId(value: unknown): T;
  }
}

expect.extend({
  toBeObjectId(value) {
    const pass = typeof value === "string" && isValidObjectId(value);
    return {
      pass,
      message: () => `"${value}" is${pass ? "" : " not"} a valid ObjectId`,
    };
  },
});
