import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import svelteParser from 'svelte-eslint-parser'
import ts from 'typescript-eslint';
import globals from "globals";


export default [
  // add more generic rule sets here, such as:
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.svelte'],
    // See more details at: https://typescript-eslint.io/packages/parser/
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: ts.parser,
      }
    }
  },
  {
    // we need these globals across all filetypes
    languageOptions: {
      globals: {
        ...globals.browser, // Adds browser globals like setTimeout
      }
    }
  }
];
