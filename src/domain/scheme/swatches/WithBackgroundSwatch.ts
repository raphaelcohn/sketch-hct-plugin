// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ThemeMode} from "../ThemeMode";
import {ContrastLevel, ContrastRatio} from "../../contrast";
import {Swatch} from "./Swatch";

export interface WithBackgroundSwatch extends Swatch
{
	primary_background(this: NonNullable<this>, theme_mode: ThemeMode): NonNullable<Swatch>
	
	contrast_ratio_for_contrast_level(contrast_level: ContrastLevel): NonNullable<ContrastRatio>
}
