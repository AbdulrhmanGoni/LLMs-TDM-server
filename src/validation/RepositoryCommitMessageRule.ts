import stringValidator from "./stringValidator";

export default function RepositoryCommitMessageRule() {
  return {
    commitTitle: stringValidator().max(56),
    commitDescription: stringValidator().max(1000),
  };
}
