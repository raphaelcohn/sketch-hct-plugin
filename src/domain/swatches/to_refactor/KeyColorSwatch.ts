// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractSwatch} from "./AbstractSwatch";
import {PaletteChoice} from "../PaletteChoice";
import {ThemeMode} from "../ThemeMode";
import {Variant} from "../Variant";
import {CorePalettes} from "../CorePalettes";
import {HueChromaToneCoordinates, Tone} from "../../color_space/hct";
import {ContrastLevel} from "../../contrast";

export class KeyColorSwatch extends AbstractSwatch
{
	public static readonly PrimaryPaletteKeyColor:        NonNullable<KeyColorSwatch> = new KeyColorSwatch(PaletteChoice.Primary       )
	public static readonly SecondaryPaletteKeyColor:      NonNullable<KeyColorSwatch> = new KeyColorSwatch(PaletteChoice.Secondary     )
	public static readonly TertiaryPaletteKeyColor:       NonNullable<KeyColorSwatch> = new KeyColorSwatch(PaletteChoice.Tertiary      )
	public static readonly NeutralPaletteKeyColor:        NonNullable<KeyColorSwatch> = new KeyColorSwatch(PaletteChoice.Neutral       )
	public static readonly NeutralVariantPaletteKeyColor: NonNullable<KeyColorSwatch> = new KeyColorSwatch(PaletteChoice.NeutralVariant)
	public static readonly ErrorPaletteKeyColor:          NonNullable<KeyColorSwatch> = new KeyColorSwatch(PaletteChoice.Error         )
	
	private constructor(palette_choice: PaletteChoice)
	{
		super(palette_choice, false)
	}
	
	public tone(this: NonNullable<this>, _theme_mode: ThemeMode, _variant: Variant, palettes: NonNullable<CorePalettes>, _source_color: NonNullable<HueChromaToneCoordinates>, _contrast_level: ContrastLevel): NonNullable<Tone>
	{
		return super.choose_palette(palettes).key_colour().tone
	}
}
