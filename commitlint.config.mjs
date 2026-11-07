export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [1, "always", ["web", "api", "shared", "ci", "docs", "deps", "infra"]],
    "subject-case": [0],
  },
  // Коммиты Dependabot содержат длинные ссылки и changelog в теле — не проверяем их
  ignores: [(message) => message.includes("Signed-off-by: dependabot[bot]")],
};
