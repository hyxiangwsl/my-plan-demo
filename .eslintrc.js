module.exports = {
  env: {
    browser: true,
    es2021: true,
    node:true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",// 使用的是 React 17的新 JSX 转换
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint",'react-hooks'],
  rules: {
    // 在这里配置rule
    "@typescript-eslint/no-explicit-any":"off",// 允许使用any
    // 禁止出现未使用过的变量
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
  },
};
