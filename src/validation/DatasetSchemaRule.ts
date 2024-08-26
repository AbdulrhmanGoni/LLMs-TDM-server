import stringValidator from "./stringValidator";

export default function DatasetSchemaRule() {
  return {
    name: stringValidator().min(3).max(70),
    description: stringValidator().min(3).max(150),
  };
}
