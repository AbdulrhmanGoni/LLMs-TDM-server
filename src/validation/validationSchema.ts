import type { NumberValidator } from "./numberValidator";
import type { StringValidator } from "./stringValidator";
import validateObject from "./validateObject";

export default function validationSchema<InputObjectType>(
  schema: Record<keyof InputObjectType, StringValidator | NumberValidator>
) {
  return {
    validate: (object: Record<string, any>) =>
      validateObject<InputObjectType>(schema, object),
  };
}