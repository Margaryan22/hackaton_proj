export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [1, "always", ["web", "api", "shared", "ci", "docs", "deps", "infra"]],
    "subject-case": [0],
  },
};
