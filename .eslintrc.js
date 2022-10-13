module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true, // setup 语法糖时开启
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  // parser: "@typescript-eslint/parser",
  parser: "vue-eslint/parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {},
};
