import eslintJs from "@eslint/js";
import globals from "globals";

export default [
	eslintJs.configs.recommended,
	{
		// files: ['**/*.js', '**/*.cjs', '**/*.mjs'], // = default, not needed
		languageOptions: { globals: { ...globals.node } },
		rules: { "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }] },
	},
];
