import type { ValidationError } from "../types/validation";
import type { NumberValidator } from "./numberValidator";
import type { StringValidator } from "./stringValidator";

export default function validateObject<ValidInputType>(
  schema: Record<string, StringValidator | NumberValidator>,
  object: Record<string, any>
) {
  const errors: ValidationError[] = [];
  const validObject: typeof object = {};
  for (const key in schema) {
    const result = schema[key].validate(object[key], key);
    if (typeof result === "string") {
      errors.push({
        filed: key,
        message: result,
        value: object[key],
      });
    }

    if (result === true) {
      validObject[key] = object[key];
    }
  }

  if (errors.length) {
    const error = new Error();
    throw Object.assign(error, { errors });
  }

  return validObject as ValidInputType;
}
