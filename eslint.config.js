import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import ts from "typescript-eslint";
import globals from "globals";

export default [
  // add more generic rule sets here, such as:
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    // we need these globals across all filetypes
    languageOptions: {
      globals: {
        ...globals.browser, // Adds browser globals like setTimeout
      },
    },
  },
];
