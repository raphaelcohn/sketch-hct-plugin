// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { createRequire } from "module"
const require = createRequire(import.meta.url)

const globals = require("globals")
const js = require("@eslint/js")
const { configs: eslint_configurations } = js

import { config, configs as typescript_configurations } from 'typescript-eslint'

export default config
(
{
			ignores:
			[
				"eslint.config.mjs",
				"lib/**",
				"libexec/**",
				"node_modules/**",
				"node_modules.patches/**",
			],
	},
	eslint_configurations.recommended,
	
	...typescript_configurations.strictTypeChecked,
	
	//...typescript_configurations.stylisticTypeChecked,
	
	{
		name: "sketch-hct-plugin",
		
		languageOptions:
		{
			// TODO: Extract from tsconfig.json.
			ecmaVersion: 6,
			
			// TODO: Extract from package.json.
			sourceType: "module",
			
			globals:
			{
				...globals.node,
			},
			
			parser: undefined,
			
			parserOptions:
			{
				//project: true,
				projectService: true,
				
				extraFileExtensions:
				[
					//".vue",
				],
				
				tsconfigRootDir: import.meta.dirname,
				
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
			"src/**/*.js",
			"src/**/*.mjs",
			"src/**/*.cjs",
			"src/**/*.jsx",
			"src/**/*.ts",
			"src/**/*.mts",
			"src/**/*.cts",
			"src/**/*.tsx",
			"@types/**/*.d.ts"
		],
		
		ignores:
		[
			"eslint.config.mjs",
			"lib/bun/.bun/install/cache/**"
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
					allow:
					[
						'^sketch.*'
					],
				}
			]
		},
	}
)
