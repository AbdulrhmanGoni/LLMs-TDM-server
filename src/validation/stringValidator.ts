import {
  isObjectId,
  isRequired,
  isString,
  itContains,
  matches,
  maxLength,
  minLength,
} from "./validationUtils";
import Validator from "./Validator";

export class StringValidator {
  validator: Validator<string>;

  constructor() {
    this.validator = new Validator<string>();
    this.validator.addRule(isString());
  }

  validate(value: any, field?: string) {
    return this.validator.validate(value, field);
  }

  required(message?: string): this {
    this.validator.addRule(isRequired(message));
    this.validator.isOptional = false;
    return this;
  }

  max(min: number, message?: string): this {
    this.validator.addRule(maxLength(min, message));
    return this;
  }

  min(min: number, message?: string): this {
    this.validator.addRule(minLength(min, message));
    return this;
  }

  matches(regExp: RegExp, message?: string): this {
    this.validator.addRule(matches(regExp, message));
    return this;
  }

  objectId(message?: string): this {
    this.validator.addRule(isObjectId(message));
    return this;
  }

  enum(values: string[]): this {
    this.validator.addRule(itContains(values));
    return this;
  }
}

export default function stringValidator() {
  return new StringValidator();
}
