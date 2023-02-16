module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: [
    "**/api/src/gql/types.ts",
    "**/node_modules",
    "node_modules"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-empty": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
