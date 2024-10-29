// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import Ajv from "ajv8"

const schema = () =>
{
	const color = { $ref: "#/$defs/color" }
	const palette = { $ref: "#/$defs/palette" }
	const scheme = { $ref: "#/$defs/scheme" }
	
	function text(description: string)
	{
		return {
			description: description,
			type: "string"
		}
	}
	
	function boolean(description: string)
	{
		return {
			description: description,
			type: "boolean"
		}
	}

	return {
		"$schema": "https://json-schema.org/draft/2020-12/schema",
		"$id": "https://example.com/material-design-color-theme.schema.json",
		title: "JSON schema to validate material design color scheme JSON created by export from the Material Theme Builder (MTB) as https://material-foundation.github.io/material-theme-builder/",
		
		description: "",
		type: "object",
		properties:
		{
			"description": text("material design color theme"),
			
			"seed": color,
			
			"coreColors":
			{
				description: "core colors",
				type: "object",
				properties:
				{
					"primary": color,
					
					"secondary": color,
					
					"tertiary": color,
					
					"error": color,
					
					"neutral": color,
					
					"neutralVariant": color,
				},
				required:
				[
					"primary"
				],
				additionalProperties: false
			},
			
			"extendedColors":
			{
				description: "extended colors",
				type: "array",
				items:
				{
					minItems: 0,
					uniqueItems: true,
					type: "object",
					properties:
					{
						"name": text("extended color name"),
						
						"color": color,
						
						"description": text("extended color description"),
						
						"harmonized": boolean("harmonized"),
					},
					required:
					[
						"name",
						"color",
						"description",
						"harmonized",
					],
					additionalProperties: false
				}
			},
			
			"schemes":
			{
				description: "schemes by theme and contrast level",
				type: "object",
				properties:
				{
					"light": scheme,
					
					"light-medium-contrast": scheme,
					
					"light-high-contrast": scheme,
					
					"dark": scheme,
					
					"dark-medium-contrast": scheme,
					
					"dark-high-contrast": scheme,
				},
				required:
				[
					"light",
					"light-medium-contrast",
					"light-high-contrast",
					"dark",
					"dark-medium-contrast",
					"dark-high-contrast",
				],
				additionalProperties: false
			},
			
			"palettes":
			{
				description: "tonal palettes (not defined for custom colors, oddly)",
				type: "object",
				properties:
				{
					"primary": palette,
					
					"secondary": palette,
					
					"tertiary": palette,
					
					"neutral": palette,
					
					"neutral-variant": palette,
				},
				required:
				[
					"primary",
					"secondary",
					"tertiary",
					"neutral",
					"neutral-variant",
				],
				additionalProperties: false
			}
		},
		required:
		[
			"description",
			"seed",
			"coreColors",
			"extendedColors",
			"schemes",
			"palettes",
		],
		additionalProperties: false,
		
		$defs:
		{
			"color":
			{
				description: "Color definition in 6-digit, hash-leading uppercase hexadecimal for red, green and blue channels",
				type: "string",
				minLength: 7,
				maxLength: 7,
				pattern: "^\#[0-9A-F]{6}$",
				examples:
				[
					"#01AB34"
				]
			},
			
			"scheme":
			{
				description: "Theme with contrast level",
				type: "object",
				properties:
				{
					"primary": color,

					"surfaceTint": color,

					"onPrimary": color,

					"primaryContainer": color,

					"onPrimaryContainer": color,

					"secondary": color,

					"onSecondary": color,

					"secondaryContainer": color,

					"onSecondaryContainer": color,

					"tertiary": color,

					"onTertiary": color,

					"tertiaryContainer": color,

					"onTertiaryContainer": color,

					"error": color,

					"onError": color,

					"errorContainer": color,

					"onErrorContainer": color,

					"background": color,

					"onBackground": color,

					"surface": color,

					"onSurface": color,

					"surfaceVariant": color,

					"onSurfaceVariant": color,

					"outline": color,

					"outlineVariant": color,

					"shadow": color,

					"scrim": color,

					"inverseSurface": color,

					"inverseOnSurface": color,

					"inversePrimary": color,

					"primaryFixed": color,

					"onPrimaryFixed": color,

					"primaryFixedDim": color,

					"onPrimaryFixedVariant": color,

					"secondaryFixed": color,

					"onSecondaryFixed": color,

					"secondaryFixedDim": color,

					"onSecondaryFixedVariant": color,

					"tertiaryFixed": color,

					"onTertiaryFixed": color,

					"tertiaryFixedDim": color,

					"onTertiaryFixedVariant": color,

					"surfaceDim": color,

					"surfaceBright": color,

					"surfaceContainerLowest": color,

					"surfaceContainerLow": color,

					"surfaceContainer": color,

					"surfaceContainerHigh": color,

					"surfaceContainerHighest": color
				},
				required:
				[
					"primary",
					"surfaceTint",
					"onPrimary",
					"primaryContainer",
					"onPrimaryContainer",
					"secondary",
					"onSecondary",
					"secondaryContainer",
					"onSecondaryContainer",
					"tertiary",
					"onTertiary",
					"tertiaryContainer",
					"onTertiaryContainer",
					"error",
					"onError",
					"errorContainer",
					"onErrorContainer",
					"background",
					"onBackground",
					"surface",
					"onSurface",
					"surfaceVariant",
					"onSurfaceVariant",
					"outline",
					"outlineVariant",
					"shadow",
					"scrim",
					"inverseSurface",
					"inverseOnSurface",
					"inversePrimary",
					"primaryFixed",
					"onPrimaryFixed",
					"primaryFixedDim",
					"onPrimaryFixedVariant",
					"secondaryFixed",
					"onSecondaryFixed",
					"secondaryFixedDim",
					"onSecondaryFixedVariant",
					"tertiaryFixed",
					"onTertiaryFixed",
					"tertiaryFixedDim",
					"onTertiaryFixedVariant",
					"surfaceDim",
					"surfaceBright",
					"surfaceContainerLowest",
					"surfaceContainerLow",
					"surfaceContainer",
					"surfaceContainerHigh",
					"surfaceContainerHighest"
				],
				additionalProperties: false,
			},
			
			"palette":
			{
				description: `Palette tones`,
				type: "object",
				properties:
				{
					"0": color,
					
					"5": color,
					
					"10": color,
					
					"15": color,
					
					"20": color,
					
					"25": color,
					
					"30": color,
					
					"35": color,
					
					"40": color,
					
					"45": color,
					
					"50": color,
					
					"55": color,
					
					"60": color,
					
					"65": color,
					
					"70": color,
					
					"75": color,
					
					"80": color,
					
					"85": color,
					
					"90": color,
					
					"95": color,
					
					"98": color,
					
					"99": color,
					
					"100": color,
				},
				required:
				[
					"0",
					"5",
					"10",
					"15",
					"20",
					"25",
					"30",
					"35",
					"40",
					"45",
					"50",
					"55",
					"60",
					"65",
					"70",
					"75",
					"80",
					"85",
					"90",
					"95",
					"98",
					"99",
					"100"
				],
				additionalProperties: false,
			}
		}
	}
}

const ajv = new Ajv();

export const SchemaValidator = ajv.compile(schema)

ajv.compileParser()
