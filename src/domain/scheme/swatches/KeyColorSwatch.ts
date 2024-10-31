// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractSwatch} from "./AbstractSwatch";
import {PaletteChoice} from "../palettes/PaletteChoice";
import {Tone} from "../../color_space/hct";
import {Scheme} from "./Scheme";
import {ViewingConditions} from "../ViewingConditions";

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
	
	public override tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return this.raw_tone(scheme, viewing_conditions)
	}
	
	public override raw_tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, _viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return super.choose_palette(scheme.palettes).key_colour().tone
	}
}
