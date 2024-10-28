export default function haveSharedKey(object: object, target: object): boolean {
  return !Object.keys(object).some((key) => Object.hasOwn(target, key));
}
