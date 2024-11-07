// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {Swatch} from "./Swatch.mts";
import type {PaletteChoice} from "../palettes/PaletteChoice.mts";
import type {ThemePair} from "../ThemePair.mts";
import type {Tone} from "../../color_space/hct/Tone.mts";

export class SwatchUsage
{
	public constructor(readonly swatch: NonNullable<Swatch>, readonly palette_choice: PaletteChoice, readonly tone_pair: NonNullable<ThemePair<Tone>> | null, readonly description: string | null, readonly is_deprecated: boolean, readonly is_fixed: boolean, readonly is_on: boolean, readonly is_container: boolean, readonly is_variant: boolean, readonly is_add_on: boolean)
	{
	}
}
