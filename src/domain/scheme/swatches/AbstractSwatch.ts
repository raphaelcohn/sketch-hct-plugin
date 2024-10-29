// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {PaletteChoice} from "../PaletteChoice";
import {Palettes} from "../Palettes";
import {TonalPalette, Tone} from "../../color_space/hct";
import {Swatch} from "./Swatch";
import {Scheme} from "../Scheme";
import {ViewingConditions} from "../ViewingConditions";

/**
 * @internal
 */
export abstract class AbstractSwatch implements Swatch
{
	public readonly palette_choice: PaletteChoice
	
	public readonly is_background: boolean
	
	protected constructor(palette: PaletteChoice, is_background: boolean)
	{
		this.palette_choice = palette
		this.is_background = is_background
	}
	
	public choose_palette(palettes: NonNullable<Palettes>): NonNullable<TonalPalette>
	{
		return palettes.choose_palette(this.palette_choice)
	}
	
	public abstract tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	
	public abstract raw_tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
}
