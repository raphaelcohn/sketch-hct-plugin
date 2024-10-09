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
	
	constructor(alpha: NonNullable<Component>, red: NonNullable<Component>, green: NonNullable<Component>, blue: NonNullable<Component>)
	{
		super(red, green, blue)
		this.alpha = alpha
	}
	
	public override toString(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${SRgbCoordinates.component_hexadecimal_upper_case_string(this.alpha)}${this.red_green_blue_hexadecimal_upper_case_string()}`
	}
	
	public override valueOf(this: NonNullable<this>): number
	{
		return this.#into_argb()
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
	
	static from_argb(argb: number): NonNullable<AlphaSRgbCoordinates>
	{
		return AlphaSRgbCoordinates.from_rgba(rgbaFromArgb(argb))
	}
	
	static from_rgba(rgba: NonNullable<Rgba>): NonNullable<AlphaSRgbCoordinates>
	{
		return new AlphaSRgbCoordinates(Component.alpha_from_rgba(rgba), Component.red_from_rgba(rgba), Component.green_from_rgba(rgba), Component.blue_from_rgba(rgba))
	}
	
	into_rgba(this: NonNullable<this>): NonNullable<Rgba>
	{
		return {r: this.red.valueOf(), g: this.green.valueOf(), b: this.blue.valueOf(), a: this.alpha.valueOf()}
	}
	
	#into_argb(this: NonNullable<this>): number
	{
		return argbFromRgba(this.into_rgba())
	}
	
	into_cam16(this: NonNullable<this>): NonNullable<Cam16>
	{
		return Cam16.fromInt(this.#into_argb())
	}
}
