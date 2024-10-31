// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {SRgbCoordinates} from "../../color_space/srgb";
import {CustomColorValue} from "./CustomColorValue";
import {MaterialThemeInput} from "./MaterialThemeInput";
import {SourceColors} from "../../scheme/palettes/SourceColors";

export class MaterialThemeBuilderUrlParser
{
	readonly #search_parameters: URLSearchParams
	
	public constructor(search_parameters: URLSearchParams)
	{
		this.#search_parameters = search_parameters
	}
	
	parse(this: NonNullable<this>, harmonize_custom_colors: boolean): MaterialThemeInput
	{
		const primary = this.parse_core_color("primary") as SRgbCoordinates
		const secondary = this.parse_core_color("secondary")
		const tertiary = this.parse_core_color("tertiary")
		const error = this.parse_core_color("error")
		const neutral = this.parse_core_color("neutral")
		const neutral_variant = this.parse_core_color("neutralVariant")
		
		const custom_colors = this.parse_custom_colors(harmonize_custom_colors)
		
		const color_match = this.parse_color_match()
		
		return new MaterialThemeInput(new SourceColors(primary, secondary, tertiary, error, neutral, neutral_variant), custom_colors, color_match)
	}
	
	parse_core_color(this: NonNullable<this>, core_color_name: "primary" | "secondary" | "tertiary" | "error" | "neutral" | "neutralVariant"): SRgbCoordinates | null
	{
		const core_color_strings = this.#search_parameters.getAll(core_color_name)
		const number = core_color_strings.length
		
		switch (number)
		{
			case 0:
				const is_mandatory = core_color_name === "primary"
				if (is_mandatory)
				{
					throw new RangeError(`${core_color_name} not present`)
				}
				return null
			
			case 1:
				break
			
			default:
				throw new RangeError(`${core_color_name} present more than 1 times, not once`)
		}
		
		const core_color_string = core_color_strings[0] as string
		return MaterialThemeBuilderUrlParser.#parse_color_string(core_color_string)
	}
	
	static #parse_color_string(color_string: string): SRgbCoordinates
	{
		const length = color_string.length
		const ExpectedLength = 7
		if (length != ExpectedLength)
		{
			throw new RangeError(`color_string length was ${length} and not ${ExpectedLength}`)
		}
		if (color_string.charAt(0) != '#')
		{
			throw new RangeError(`core_color_string ${color_string} did not start with #`)
		}
		for (let index = 1; index < length; index++)
		{
			const character_code = color_string.charCodeAt(index)
			if ((character_code >= 48 && character_code <= 57) || (character_code >= 65 && character_code <= 70))
			{
				continue
			}
			throw new RangeError(`core_color_string ${color_string} character at zero-based index ${index} was not an uppercase hexadecimal digit`)
		}
		return SRgbCoordinates.try_from_css_hex_color(color_string)
	}
	
	static readonly #CustomColorKeyPrefix: string = "custom:"
	parse_custom_colors(this: NonNullable<this>, harmonize_custom_colors: boolean): Map<string, CustomColorValue>
	{
		const custom_colors = new Map()
		
		this.#search_parameters.forEach((value: string, key: string, _parent: URLSearchParams): void =>
		{
			if (!key.startsWith(MaterialThemeBuilderUrlParser.#CustomColorKeyPrefix))
			{
				return
			}
			const custom_color_name = key.substring(MaterialThemeBuilderUrlParser.#CustomColorKeyPrefix.length)
			if (custom_colors.has(custom_color_name))
			{
				throw new Error(`Duplicate custom color ${custom_color_name} with ${custom_color_name}`)
			}
			
			const custom_color_value = MaterialThemeBuilderUrlParser.#parse_color_string(value)
			custom_colors.set(custom_color_name, new CustomColorValue(custom_color_value, harmonize_custom_colors))
		})
		
		return custom_colors
	}
	
	parse_color_match(this: NonNullable<this>): boolean
	{
		const color_match_strings = this.#search_parameters.getAll("colorMatch")
		const number = color_match_strings.length
		if (number != 1)
		{
			throw new RangeError(`colorMatch present 0 or ${number} times, not once`)
		}
		
		const color_match_string = color_match_strings[0]
		switch (color_match_string)
		{
			case "true":
				return true
			
			case "false":
				return false
			
			default:
				throw new RangeError(`color_match_string was ${color_match_string}, neither true or false`)
		}
	}
	
	static readonly #ExpectedProtocol: string = "http"
	
	static readonly #ExpectedHost: string = "material-foundation.github.io"
	
	static readonly DefaultUrlString: string = `${MaterialThemeBuilderUrlParser.#ExpectedProtocol}://${MaterialThemeBuilderUrlParser.#ExpectedHost}?primary=%23FFE13E&colorMatch=false"`
	
	static from_url_string(url_string: string): MaterialThemeBuilderUrlParser
	{
		let url: URL
		try
		{
			url = new URL(url_string)
		}
		catch(type_error: any)
		{
			throw new Error(`Material Theme Builder URL was not a URL (${type_error.message})`)
		}
		
		const protocol = url.protocol
		if (protocol !== MaterialThemeBuilderUrlParser.#ExpectedProtocol)
		{
			throw new Error(`Material Theme Builder URL host was ${protocol} and not ${MaterialThemeBuilderUrlParser.#ExpectedProtocol}`)
		}
		
		const username = url.username
		if (username !== "")
		{
			throw new Error(`Material Theme Builder URL username was ${username} and not empty`)
		}
		
		const password = url.password
		if (password !== "")
		{
			throw new Error(`Material Theme Builder URL password was ${password} and not empty`)
		}
		
		const host = url.host
		if (host !== MaterialThemeBuilderUrlParser.#ExpectedHost)
		{
			throw new Error(`Material Theme Builder URL host was ${host} and not ${MaterialThemeBuilderUrlParser.#ExpectedHost}`)
		}
		
		const port = url.port
		if (port !== "")
		{
			throw new Error(`Material Theme Builder URL port was ${port} and not empty`)
		}
		
		const pathname = url.pathname
		if (pathname !== "/")
		{
			throw new Error(`Material Theme Builder URL pathname was ${pathname} and not /`)
		}
		
		const hash = url.hash
		if (hash !== "")
		{
			throw new Error(`Material Theme Builder URL hash was ${hash} and not empty`)
		}
		
		return new MaterialThemeBuilderUrlParser(url.searchParams)
	}
}
