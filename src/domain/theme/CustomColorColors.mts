// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {SRgbCoordinates} from "../color_space/srgb/SRgbCoordinates.mts";
import type {ThemePair} from "../scheme/ThemePair.mts";
import type {CustomColorSchemeLike} from "./CustomColorSchemeLike.mts";

export class CustomColorColors
{
	public constructor(readonly custom_color_name: string, readonly source_color: SRgbCoordinates, readonly harmonized_color: SRgbCoordinates, readonly key_color: SRgbCoordinates, readonly scheme: ThemePair<CustomColorSchemeLike<SRgbCoordinates>>)
	{
	}
}
