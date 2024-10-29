// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {TonalPalette, Tone} from "../../color_space/hct";
import {Scheme} from "../Scheme";
import {ViewingConditions} from "../ViewingConditions";
import {Palettes} from "../Palettes";

export interface Swatch
{
	//readonly palette_choice: PaletteChoice
	
	//readonly is_background: boolean
	
	choose_palette(palettes: NonNullable<Palettes>): NonNullable<TonalPalette>
	
	/**
	 * Equivalent to material design's `DynamicColor.getTone()` instance method.
	 */
	tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	
	/**
	 * Equivalent to material design's `DynamicColor.tone` instance readonly property.
	 */
	raw_tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
}
