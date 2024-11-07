// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {DynamicScheme as MaterialDesignDynamicScheme} from "@material/material-color-utilities";
import {AlphaSRgbCoordinates} from "../color_space/srgb/AlphaSRgbCoordinates.mjs";
import {AbstractScheme} from "./AbstractScheme.mjs";

export class DynamicScheme extends AbstractScheme
{
	public constructor(dynamic_scheme: MaterialDesignDynamicScheme)
	{
		super
		(
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.primary),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onPrimary),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.primaryContainer),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onPrimaryContainer),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.secondary),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onSecondary),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.secondaryContainer),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onSecondaryContainer),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.tertiary),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onTertiary),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.tertiaryContainer),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onTertiaryContainer),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.error),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onError),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.errorContainer),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onErrorContainer),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.background),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onBackground),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surface),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onSurface),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceVariant),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onSurfaceVariant),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.outline),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.outlineVariant),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.shadow),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.scrim),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.inverseSurface),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.inverseOnSurface),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.inversePrimary),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.primaryPaletteKeyColor),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.secondaryPaletteKeyColor),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.tertiaryPaletteKeyColor),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.neutralPaletteKeyColor),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.neutralVariantPaletteKeyColor),
		
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceDim),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceBright),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceContainerLowest),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceContainerLow),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceContainer),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceContainerHigh),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceContainerHighest),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.surfaceTint),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.primaryFixed),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.primaryFixedDim),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onPrimaryFixed),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onPrimaryFixedVariant),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.secondaryFixed),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.secondaryFixedDim),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onSecondaryFixed),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onSecondaryFixedVariant),
			
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.tertiaryFixed),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.tertiaryFixedDim),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onTertiaryFixed),
			AlphaSRgbCoordinates.from_argb(dynamic_scheme.onTertiaryFixedVariant),
		)
	}
}
