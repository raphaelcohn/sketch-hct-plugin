// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.


import * as js from "@eslint/js"
import { config, configs as typescript_configurations } from 'typescript-eslint'
import { join, dirname } from "node:path"
import { readFileSync } from "node:fs"
import * as JSON5 from "json5"
import * as globals_ from "globals"

const { configs: eslint_configurations } = js

/**
 * @type {{node: {[name: string]: boolean}, browser: {[name: string]: boolean}, worker: {[name: string]: boolean}, nodeBuiltin: {[name: string]: boolean}, devtools: {[name: string]: boolean}, serviceworker: {[name: string]: boolean}, commonjs: {[name: string]: boolean}}}
 */
export const globals = globals_

/**
 * @param {string} import_meta_dirname_of_caller Typically import.meta.dirname
 * @param {string} source_root_prefix
 * @param {string[]} no_require_imports
 * @param {{[name: string]: boolean | "off" | "readonly" | "writable" }} globals
 */
export function configure_eslint_for_typescript(import_meta_dirname_of_caller, source_root_prefix, no_require_imports, globals)
{
	const package_json = package_json_fields(import_meta_dirname_of_caller)
	const tsconfig_json = tsconfig_json_fields(import_meta_dirname_of_caller)

	const parent_folder_name = dirname(import_meta_dirname_of_caller)
	const package_json_name = package_json.name
	if (parent_folder_name !== package_json_name)
	{
		throw new Error(`parent folder name ${parent_folder_name} does not match package.json name ${package_json_name}`)
	}

	return config
	(
	{
			ignores:
			[
				"eslint.config.mjs",
				"**/eslint.config.mjs",
				"*.eslint.mjs",
				"**/*.eslint.mjs",

				"node_modules/**",
				"node_modules.patches/**",
				"bin/**",
				"lib/**",
				"libexec/**",
				"tmp/**",
				"versioning/**",
			],
		},
		eslint_configurations.recommended,

		...typescript_configurations.strictTypeChecked,

		{
			name: package_json_name,

			languageOptions:
			{
				ecmaVersion: tsconfig_json.ecma_script_version,

				sourceType: package_json.type,

				globals,

				parser: undefined,

				parserOptions:
				{
					//project: true,
					projectService: true,

					extraFileExtensions:
					[
						//".vue",
					],

					tsconfigRootDir: import_meta_dirname_of_caller,

					allowReserved: false,

					ecmaFeatures:
					{
						globalReturn: false,

						impliedStrict: true,

						jsx: true,
					}
				},
			},

			linterOptions:
			{
				noInlineConfig: false,

				reportUnusedDisableDirectives: "error",
			},

			files:
			[
				`${source_root_prefix}**/*.js`,
				`${source_root_prefix}**/*.mjs`,
				`${source_root_prefix}**/*.cjs`,
				`${source_root_prefix}**/*.jsx`,
				`${source_root_prefix}**/*.ts`,
				`${source_root_prefix}**/*.mts`,
				`${source_root_prefix}**/*.cts`,
				`${source_root_prefix}**/*.tsx`
			],

			ignores:
			[
				"eslint.config.mjs"
			],

			plugins:
			{
			},

			//processor:

			settings:
			{
			},

			rules:
			{
				"no-unexpected-multiline": "off",

				"no-unused-vars": "off",

				"@typescript-eslint/no-unused-vars":
				[
					"warn",
					{
						varsIgnorePattern: "^_",
						argsIgnorePattern: "^_|this",
						caughtErrorsIgnorePattern: "^_",
						destructuredArrayIgnorePattern: "^_",
						vars: "all",
						args: "all",
						caughtErrors: "all",
						ignoreRestSiblings: false,
						ignoreClassWithStaticInitBlock: true,
						reportUsedIgnorePattern: false,
					}
				],

				"@typescript-eslint/ban-ts-comment":
				[
					"error",
					{
						"ts-expect-error": "allow-with-description",
						"ts-ignore": "allow-with-description",
						"ts-nocheck": "allow-with-description",
						"ts-check": "allow-with-description",
						"minimumDescriptionLength": 10,
					}
				],

				"@typescript-eslint/unbound-method":
				[
					"error",
					{
						ignoreStatic: true,
					}
				],

				"@typescript-eslint/no-empty-object-type":
				[
					"error",
					{
						allowInterfaces: "always",
					}
				],

				"@typescript-eslint/triple-slash-reference":
				[
					"error",
					{
						lib: "never",
						path: "always",
						types: "never",
					}
				],

				"@typescript-eslint/no-require-imports":
				[
					"error",
					{
						allow: no_require_imports,
					}
				]
			},
		}
	)
}

/**
 * @param {string} import_meta_dirname_of_caller
 * @param {string} file_name
 */
function read_file_as_string(import_meta_dirname_of_caller, file_name)
{
	return readFileSync(join(import_meta_dirname_of_caller, file_name), { encoding: "utf8" })
}

/**
 * @type {Map<"ES3" | "ES5" | "ES6" | "ES2015" | "ES2016" | "ES2017" | "ES2018" | "ES2019" | "ES2020" | "ES2021" | "ES2022" | "ES2023" | "ESNext", "latest" | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025>}
 */
const TsConfigLanguageVersionsToEslintLanguageVersions = new Map
(
	// @ts-ignore Overload mismatch
	[
		["ESNext", "latest"],
		["ES3", 3],
		["ES5", 5],
		["ES6", 6],
		["ES2015", 2015],
		["ES2016", 2016],
		["ES2017", 2017],
		["ES2018", 2018],
		["ES2019", 2019],
		["ES2020", 2020],
		["ES2021", 2021],
		["ES2022", 2022],
		["ES2023", 2023]
		//["ES2024", 2024],
		//["ES2025", 2025],
	]
)
/**
 * @type {Set<string>}
 */
const ValidPackageTypes = new Set(["script", "module", "commonjs"])
/**
 * @param {string} import_meta_dirname_of_caller
 * @return {{name: string, type: "script" | "module" | "commonjs" }}
 */
function package_json_fields(import_meta_dirname_of_caller)
{
	const package_json = read_json_with_object_root(import_meta_dirname_of_caller, "package.json", JSON.parse)

	const type = package_json.type
	if (!ValidPackageTypes.has(type))
	{
		throw new RangeError(`package.json module type ${type} is not valid`)
	}

	return { name: package_json.name, type }
}

/**
 * @param {string} import_meta_dirname_of_caller
 * @return {{ecma_script_version: "latest" | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025}}
 */
function tsconfig_json_fields(import_meta_dirname_of_caller)
{
	/**
	 * @type {{ target?: "ES3" | "ES5" | "ES6" | "ES2015" | "ES2016" | "ES2017" | "ES2018" | "ES2019" | "ES2020" | "ES2021" | "ES2022" | "ES2023" | "ESNext", moduleDetection?: "auto" | "legacy" | "force" }}
	 */
	const tsconfig_json = read_json_with_object_root(import_meta_dirname_of_caller, "tsconfig.json", JSON5.parse)

	const target = tsconfig_json.target ?? 'ES3'
	const ecma_script_version = TsConfigLanguageVersionsToEslintLanguageVersions.get(target)
	if (ecma_script_version === undefined)
	{
		throw new Error(`Unknown mapping to ESLint ecma version for tsconfig JSON target ${target}`)
	}

	const module_detection = tsconfig_json.moduleDetection ?? 'auto'
	if (module_detection !== "auto")
	{
		throw new Error("tsconfig.json moduleDetection is not set to (or defaulting to) 'auto'")
	}

	return {ecma_script_version}
}

/**
 * @param {string} import_meta_dirname_of_caller
 * @param {string} file_name
 * @param {(text: string, reviver?: (this: any, key: string, value: any) => any) => any} json_parser
 */
function read_json_with_object_root(import_meta_dirname_of_caller, file_name, json_parser)
{
	const json = json_parser(read_file_as_string(import_meta_dirname_of_caller, "tsconfig.json"))

	if (typeof(json) !== "object")
	{
		throw new TypeError(`${file_name} root was not an object`)
	}
	if (Array.isArray(json))
	{
		throw new TypeError(`${file_name} root was an array`)
	}

	return json
}
