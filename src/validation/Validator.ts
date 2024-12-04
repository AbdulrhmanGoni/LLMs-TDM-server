export type ValidationRule<T> = (value: T) => boolean | string;

export default class Validator<T> {
  private rules: ValidationRule<T>[] = [];
  public isOptional: boolean = true;

  addRule(rule: ValidationRule<T>): this {
    this.rules.push(rule);
    return this;
  }

  validate(value: T, field?: string): string | true {
    if (value === undefined || value === "") {
      if (this.isOptional) {
        return true;
      } else {
        return `${field} field is required !`;
      }
    }

    for (const rule of this.rules) {
      const result = rule(value);
      if (typeof result === "string") {
        return result;
      }
    }

    return true;
  }
}
