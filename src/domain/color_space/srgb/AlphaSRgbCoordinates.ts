// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {SRgbCoordinates} from "./SRgbCoordinates.js";
import {Component} from "./Component.js";
import {argbFromRgba, Cam16, Rgba, rgbaFromArgb} from "@material/material-color-utilities";
import {HueChromaToneCoordinates} from "../hct";
import {TonalPalette} from "../hct";
import {Tone} from "../hct";

export class AlphaSRgbCoordinates extends SRgbCoordinates
{
	public readonly alpha: NonNullable<Component>
	
	public constructor(alpha: NonNullable<Component>, red: NonNullable<Component>, green: NonNullable<Component>, blue: NonNullable<Component>)
	{
		super(red, green, blue)
		this.alpha = alpha
	}
	
	public override toString(this: NonNullable<this>): string
	{
		return this.to_upper_case_hexadecimal_string()
	}
	
	public override valueOf(this: NonNullable<this>): number
	{
		return this.#into_argb()
	}
	
	public override to_upper_case_hexadecimal_string(this: NonNullable<this>): string
	{
		return this.to_upper_case_hexadecimal_string_alpha_last()
	}
	
	public override to_lower_case_hexadecimal_string(this: NonNullable<this>): string
	{
		return this.to_lower_case_hexadecimal_string_alpha_last()
	}
	
	public to_upper_case_hexadecimal_string_alpha_first(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${SRgbCoordinates.component_hexadecimal_upper_case_string(this.alpha)}${this.red_green_blue_hexadecimal_upper_case_string()}`
	}
	
	public to_lower_case_hexadecimal_string_alpha_first(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${SRgbCoordinates.component_hexadecimal_lower_case_string(this.alpha)}${this.red_green_blue_hexadecimal_lower_case_string()}`
	}
	
	public to_upper_case_hexadecimal_string_alpha_last(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${this.red_green_blue_hexadecimal_upper_case_string()}${SRgbCoordinates.component_hexadecimal_upper_case_string(this.alpha)}`
	}
	
	public to_lower_case_hexadecimal_string_alpha_last(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${this.red_green_blue_hexadecimal_lower_case_string()}${SRgbCoordinates.component_hexadecimal_lower_case_string(this.alpha)}`
	}
	
	public into_hue_chroma_tone_coordinates(this: NonNullable<this>): NonNullable<HueChromaToneCoordinates>
	{
		return HueChromaToneCoordinates.from_alpha_srgb_space(this)
	}
	
	public into_tonal_palette(this: NonNullable<this>): NonNullable<TonalPalette>
	{
		return TonalPalette.from_alpha_srgb_space(this)
	}
	
	public into_tone(this: NonNullable<this>): NonNullable<Tone>
	{
		return Tone.from_alpha_srgb_space(this)
	}
	
	public static override try_from_css_hex_color_or_hex_color(hex_color: string): NonNullable<AlphaSRgbCoordinates>
	{
		const length = hex_color.length
		if (length == 0)
		{
			throw new RangeError("hex_color can not be an empty string")
		}
		const first = hex_color.charAt(0)
		const index = (first === '#') ? 1 : 0
		return AlphaSRgbCoordinates.try_from_hex_color(hex_color.substring(index))
	}
	
	// See <https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color>
	public static override try_from_css_hex_color(css_hex_color_string: string): NonNullable<AlphaSRgbCoordinates>
	{
		const length = css_hex_color_string.length
		if (length == 0)
		{
			throw new RangeError("css_hex_color_string can not be an empty string")
		}
		const first = css_hex_color_string.charAt(0)
		if (first !== '#')
		{
			throw new RangeError(`css_hex_color_string starts with ${first} not #`)
		}
		
		return AlphaSRgbCoordinates.try_from_hex_color(css_hex_color_string.substring(1))
	}
	
	public static override try_from_hex_color(hex_color_string: string): NonNullable<AlphaSRgbCoordinates>
	{
		switch (hex_color_string.length)
		{
			case 3:
				return SRgbCoordinates.try_from_hex_color(hex_color_string).with_alpha(Component.TwoHundredAndFiftyFive)
			
			case 4:
				return SRgbCoordinates.try_from_hex_color(hex_color_string.substring(0, 3)).with_alpha(Component.try_from_hex_color_coordinates_string(hex_color_string, 3, 1))
			
			case 6:
				return SRgbCoordinates.try_from_hex_color(hex_color_string).with_alpha(Component.TwoHundredAndFiftyFive)
			
			case 8:
				return SRgbCoordinates.try_from_hex_color(hex_color_string.substring(0, 6)).with_alpha(Component.try_from_hex_color_coordinates_string(hex_color_string, 6, 2))
			
			default:
				throw new RangeError(`${hex_color_string} did not have a recognised length of CSS hex-color string less one`)
		}
	}
	
	/**
	 * @internal
	 */
	static from_argb(argb: number): NonNullable<AlphaSRgbCoordinates>
	{
		return AlphaSRgbCoordinates.from_rgba(rgbaFromArgb(argb))
	}
	
	/**
	 * @internal
	 */
	static from_rgba(rgba: NonNullable<Rgba>): NonNullable<AlphaSRgbCoordinates>
	{
		return new AlphaSRgbCoordinates(Component.alpha_from_rgba(rgba), Component.red_from_rgba(rgba), Component.green_from_rgba(rgba), Component.blue_from_rgba(rgba))
	}
	
	/**
	 * @internal
	 */
	into_rgba(this: NonNullable<this>): NonNullable<Rgba>
	{
		return {r: this.red.valueOf(), g: this.green.valueOf(), b: this.blue.valueOf(), a: this.alpha.valueOf()}
	}
	
	#into_argb(this: NonNullable<this>): number
	{
		return argbFromRgba(this.into_rgba())
	}
	
	/**
	 * @internal
	 */
	into_cam16(this: NonNullable<this>): NonNullable<Cam16>
	{
		return Cam16.fromInt(this.#into_argb())
	}
}
