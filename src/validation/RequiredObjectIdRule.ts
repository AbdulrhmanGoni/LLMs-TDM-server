import stringValidator from "./stringValidator";

export default function RequiredObjectIdRule() {
  return stringValidator().required().objectId();
}
