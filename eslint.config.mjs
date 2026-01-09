import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintCustomRules from './eslint-custom-rules.js';

export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["src/**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    plugins: {
      'eslint-custom-rules': eslintCustomRules,
    },
    rules: {
      'eslint-custom-rules/arrow-methods': 'error',  // Enable the custom rule
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-prototype-builtins": "warn",
      "no-case-declarations": "warn",
      "no-dupe-keys": "warn",
      "no-useless-escape": "warn",
      "no-extra-boolean-cast": "warn",
      "no-constant-binary-expression": "warn"
    },
  },
]);
