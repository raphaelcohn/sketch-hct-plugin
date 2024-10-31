// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

export class SchemeLike<X>
{
	constructor
	(
		readonly primary: X,
		readonly on_primary: X,
		readonly primary_container: X,
		readonly on_primary_container: X,
		
		readonly secondary: X,
		readonly on_secondary: X,
		readonly secondary_container: X,
		readonly on_secondary_container: X,
		
		readonly tertiary: X,
		readonly on_tertiary: X,
		readonly tertiary_container: X,
		readonly on_tertiary_container: X,
		
		readonly error: X,
		readonly on_error: X,
		readonly error_container: X,
		readonly on_error_container: X,
		
		readonly background: X,
		readonly on_background: X,
		
		readonly surface: X,
		readonly on_surface: X,
		readonly surface_variant: X,
		readonly on_surface_variant: X,
		
		readonly outline: X,
		readonly outline_variant: X,
		
		readonly shadow: X,
		readonly scrim: X,
		
		readonly inverse_surface: X,
		readonly inverse_on_surface: X,
		
		readonly inverse_primary: X,
	)
	{
	}
}
