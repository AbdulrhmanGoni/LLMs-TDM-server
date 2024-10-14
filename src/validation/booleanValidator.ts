import { isBoolean, isRequired } from "./validationUtils";
import Validator from "./Validator";

export class BooleanValidator {
  validator: Validator<string>;

  constructor() {
    this.validator = new Validator<string>();
    this.validator.addRule(isBoolean());
  }

  validate(value: any, field?: string) {
    return this.validator.validate(value, field);
  }

  required(message?: string): this {
    this.validator.addRule(isRequired(message));
    this.validator.isOptional = false;
    return this;
  }
}

export default function booleanValidator() {
  return new BooleanValidator();
}
