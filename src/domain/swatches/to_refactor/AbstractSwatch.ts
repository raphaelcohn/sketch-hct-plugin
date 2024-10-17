// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {PaletteChoice} from "../PaletteChoice";
import {CorePalettes} from "../CorePalettes";
import {HueChromaToneCoordinates, TonalPalette, Tone} from "../../color_space/hct";
import {ThemeMode} from "../ThemeMode";
import {Variant} from "../Variant";
import {ContrastLevel} from "../../contrast";
import {Swatch} from "../Swatch";

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
	
	protected choose_palette(core_palettes: NonNullable<CorePalettes>): NonNullable<TonalPalette>
	{
		return core_palettes.choose_palette(this.palette_choice).default
	}
	
	public abstract tone(this: NonNullable<this>, theme_mode: ThemeMode, variant: Variant, palettes: NonNullable<CorePalettes>, source_color: NonNullable<HueChromaToneCoordinates>, contrast_level: ContrastLevel): NonNullable<Tone>
}
