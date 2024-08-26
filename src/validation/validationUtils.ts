import { isValidObjectId } from "mongoose";
import type { ValidationRule } from "./Validator";

function isRequired(message = "This field is required"): ValidationRule<any> {
  return (value) =>
    (value !== undefined && value !== null && value !== "") || message;
}

function isString(message?: string): ValidationRule<any> {
  return (value) =>
    typeof value === "string" || message || `"${value}" is not string`;
}

function minLength(
  min: number,
  message = `Minimum length is ${min} characters`
): ValidationRule<string> {
  return (value) => value.length >= min || message;
}

function maxLength(
  max: number,
  message = `Maximum length is ${max} characters`
): ValidationRule<string> {
  return (value) => value.length <= max || message;
}

function matches(
  regExp: RegExp,
  message = `This value dont matches this expression: ${regExp}`
): ValidationRule<string> {
  return (value) => !!regExp.exec(value) || message;
}

function isNumber(message = "Value must be a number"): ValidationRule<any> {
  return (value) => !isNaN(Number(value)) || message;
}

function min(
  minValue: number,
  message = `Minimum value is ${minValue}`
): ValidationRule<number> {
  return (value) => value >= minValue || message;
}

function max(
  maxValue: number,
  message = `Maximum value is ${maxValue}`
): ValidationRule<number> {
  return (value) => value <= maxValue || message;
}

function isObjectId(message?: string): ValidationRule<string> {
  return (value) =>
    isValidObjectId(value) || message || `"${value}" is not a valid "ObjectId"`;
}

export {
  isRequired,
  isString,
  minLength,
  maxLength,
  matches,
  isNumber,
  min,
  max,
  isObjectId,
};
