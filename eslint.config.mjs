import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import-x";
import prettierPlugin from "eslint-plugin-prettier";
import vuePlugin from "eslint-plugin-vue";
import globals from "globals";
import vueParser from "vue-eslint-parser";

const isProd = process.env.NODE_ENV === "production";

export default [
  {
    ignores: [
      "examples/**",
      "nuxt/plugin.js",
      "node_modules/**",
      "dist/**",
      "coverage/**",
      ".github/**",
      ".vscode/**",
      ".eslintrc.js",
      "jest.config.js",
      "eslint.config.mjs",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs["flat/recommended"],
  ...vuePlugin.configs["flat/recommended"],
  prettierConfig,
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: "module",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      "import-x": importPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": isProd ? "error" : "off",
      "no-debugger": isProd ? "error" : "off",
      "@typescript-eslint/no-empty-function": "off",
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "object",
            "type",
            "sibling",
            "index",
          ],
          warnOnUnassignedImports: true,
          pathGroups: [
            {
              pattern: "vue",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "**/*.{css,scss}",
              group: "index",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "vue", "**/*.{css,scss}"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import-x/first": "error",
      "import-x/no-duplicates": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-unassigned-import": [
        "error",
        { allow: ["**/*.css", "**/*.scss", "**/*.sass"] },
      ],
      "import-x/no-named-default": "error",
    },
    settings: {
      "import-x/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  },
  {
    files: [
      "**/__tests__/*.{j,t}s?(x)",
      "**/tests/unit/**/*.spec.{j,t}s?(x)",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ["tests/utils/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        require: "readonly",
        module: "writable",
      },
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
