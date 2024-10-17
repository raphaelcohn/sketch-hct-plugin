// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {PaletteChoice} from "./PaletteChoice";
import {ThemeMode} from "./ThemeMode";
import {Variant} from "./Variant";
import {HueChromaToneCoordinates, Tone} from "../color_space/hct";
import {ContrastLevel} from "../contrast";
import {CorePalettes} from "./CorePalettes";

export interface Swatch
{
	readonly palette_choice: PaletteChoice
	
	readonly is_background: boolean
	
	tone(this: NonNullable<this>, theme_mode: ThemeMode, variant: Variant, palettes: NonNullable<CorePalettes>, source_color: NonNullable<HueChromaToneCoordinates>, contrast_level: ContrastLevel): NonNullable<Tone>
}
