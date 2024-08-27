export type ValidationErrorDetails = {
  filed: string;
  message: string;
  value: any;
};

export class ValidationError extends Error {
  constructor(public errors: ValidationErrorDetails[], message?: string) {
    super(message || "Validation Error !");
    this.name = "ValidationError";
  }
}
