import eslintJs from "@eslint/js";

export default {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    globals: {
      window: "readonly",
      document: "readonly",
      fetch: "readonly",  // Définir fetch comme global
      URLSearchParams: "readonly", // Définir URLSearchParams comme global
    }
  },
  linterOptions: {
    reportUnusedDisableDirectives: true
  },
  rules: {
    "indent": ["error", 2, { "SwitchCase": 1 }],  // Use 2 spaces for indentation
    "quotes": ["error", "double"],  // Use double quotes
    "semi": ["error", "always"],  // Require semicolons
    "no-console": "error",  // Disallow console usage
    "no-unused-vars": ["warn"],  // Warn on unused variables
    "no-undef": ["error"],  // Error on undefined variables
    "no-redeclare": ["error"],  // Disallow variable redeclaration
    "no-trailing-spaces": "error",  // Disallow trailing spaces
  },
  // Include the recommended rules from the eslintJs plugin
  ...eslintJs.configs.recommended
};
