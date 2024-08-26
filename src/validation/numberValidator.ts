import {
  isNumber,
  isRequired,
  max as maxN,
  min as minN,
} from "./validationUtils";
import Validator from "./Validator";

export class NumberValidator {
  validator: Validator<number>;

  constructor() {
    this.validator = new Validator<number>();
    this.validator.addRule(isNumber());
  }

  validate(value: any) {
    return this.validator.validate(value);
  }

  required(): this {
    this.validator.addRule(isRequired());
    this.validator.isOptional = false;
    return this;
  }

  max(max: number, message?: string): this {
    this.validator.addRule(maxN(max, message));
    return this;
  }

  min(min: number, message?: string): this {
    this.validator.addRule(minN(min, message));
    return this;
  }
}

export default function numberValidator() {
  return new NumberValidator();
}
