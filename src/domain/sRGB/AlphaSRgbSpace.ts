// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {SRgbSpace} from "./SRgbSpace.js";
import {Component} from "./Component.js";
import {argbFromRgba, Cam16, Rgba, rgbaFromArgb} from "@material/material-color-utilities";
import {HctSpace} from "../hct/HctSpace";
import {TonalPalette} from "../hct/TonalPalette";
import {HctSpaceTone} from "../hct/HctSpaceTone";

export class AlphaSRgbSpace extends SRgbSpace
{
	public readonly alpha: NonNullable<Component>
	
	constructor(alpha: NonNullable<Component>, red: NonNullable<Component>, green: NonNullable<Component>, blue: NonNullable<Component>)
	{
		super(red, green, blue)
		this.alpha = alpha
	}
	
	public override toString(this: NonNullable<this>): NonNullable<string>
	{
		return `(${this.alpha}, ${this.red}, ${this.green}, ${this.blue})`
	}
	
	public into_hct_space(this: NonNullable<this>): NonNullable<HctSpace>
	{
		return HctSpace.from_alpha_srgb_space(this)
	}
	
	public into_tonal_palette(this: NonNullable<this>): NonNullable<TonalPalette>
	{
		return TonalPalette.from_alpha_srgb_space(this)
	}
	
	public into_tone(this: NonNullable<this>): NonNullable<HctSpaceTone>
	{
		return HctSpaceTone.from_alpha_srgb_space(this)
	}
	
	static from_argb(argb: NonNullable<number>): NonNullable<AlphaSRgbSpace>
	{
		guard_number(argb, "argb")
		
		return AlphaSRgbSpace.from_rgba(rgbaFromArgb(argb))
	}
	
	static from_rgba(rgba: NonNullable<Rgba>): NonNullable<AlphaSRgbSpace>
	{
		return new AlphaSRgbSpace(Component.alpha_from_rgba(rgba), Component.red_from_rgba(rgba), Component.green_from_rgba(rgba), Component.blue_from_rgba(rgba))
	}
	
	into_rgba(this: NonNullable<this>): NonNullable<Rgba>
	{
		return {r: this.red.value, g: this.green.value, b: this.blue.value, a: this.alpha.value}
	}
	
	#into_argb(this: NonNullable<this>): NonNullable<number>
	{
		return argbFromRgba(this.into_rgba())
	}
	
	into_cam16(this: NonNullable<this>): NonNullable<Cam16>
	{
		return Cam16.fromInt(this.#into_argb())
	}
}
