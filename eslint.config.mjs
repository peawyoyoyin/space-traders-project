import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginPrettier from 'eslint-config-prettier';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginPrettier
];
