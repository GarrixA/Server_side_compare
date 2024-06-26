import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["**/__test__", ""],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: 2020,
			},
		},
	},
	{
		files: ["*.ts", "*.js"],
		...tseslint.configs.disableTypeChecked,
	},
	{
		files: ["*.test *.js"],
		rules: {
			"@typescript-eslint/no-unused-vars": 0,
			"@typescript-eslint/no-unsafe-call": 0,
			languageOptions: {
				globals: {
					it: "readonly",
					describe: "readonly",
				},
			},
		},
	},
	{
		rules: {
			semi: 2,
			"@typescript-eslint/no-unused-vars": 2,
			"@typescript-eslint/no-explicit-any": 0,
			"no-shadow": [2, { allow: ["req", "res", "err"] }],
			"new-cap": 0,
			"one-var-declaration-per-line": 0,
			"consistent-return": 0,
			"no-param-reassign": 0,
			"comma-dangle": 0,
			"no-console": 0,
			curly: ["error", "multi-line"],
			strict: 0,
			"valid-jsdoc": [
				"error",
				{
					requireReturn: true,
					requireReturnType: true,
					requireParamDescription: false,
					requireReturnDescription: true,
				},
			],
			"require-jsdoc": [
				"error",
				{
					require: {
						FunctionDeclaration: true,
						MethodDefinition: true,
						ClassDeclaration: true,
					},
				},
			],
		},
	},
);
