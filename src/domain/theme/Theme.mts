// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {ThemePair} from "../scheme/ThemePair.mjs";
import type {CustomColorColors} from "./CustomColorColors.mts";
import type {Scheme} from "./Scheme.mts";
import type {SourceColors} from "../scheme/palettes/SourceColors.mts";
import type {Palettes} from "../scheme/palettes/Palettes.mts";

export interface Theme<S extends Scheme>
{
	source_colors: SourceColors
	
	scheme: ThemePair<S>,
	
	palettes: Palettes,
	
	custom_colors: CustomColorColors[]
}
