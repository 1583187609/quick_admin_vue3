// module.exports = {
//   extends: ["@commitlint/config-conventional"],
//   rules: {
//     "type-enum": [
//       2,
//       "always",
//       ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
//     ],
//     "subject-full-stop": [0, "never"],
//     "subject-case": [0, "never"],
//   },
// };
// commit 的内容，只允许使用下面7个标识。

// feat: 新功能
// fix: 修补bug
// docs: 文档（documentation）
// style: 样式/格式（不影响代码运行的变动）
// refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
// test: 增加测试
// chore: 构建过程或辅助工具的变动

const types = ["chore", "docs", "feat", "fix", "refactor", "revert", "test", "style"];

module.exports = {
  extents: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", types],
  },
};
