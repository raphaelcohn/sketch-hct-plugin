// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Swatch} from "./Swatch";

export class Backgrounds
{
	public readonly primary_background: Swatch | null
	
	public readonly secondary_background: Swatch | null
	
	/**
	 * @internal
	 */
	static readonly NoBackground: NonNullable<Backgrounds> = new Backgrounds(null, null)
	
	/**
	 * @internal
	 */
	static with_primary_background(primary_background: Swatch): NonNullable<Backgrounds>
	{
		return new Backgrounds(primary_background, null)
	}
	
	/**
	 * @internal
	 */
	static with_primary_and_secondary_background(primary_background: Swatch, secondary_background: Swatch): NonNullable<Backgrounds>
	{
		return new Backgrounds(primary_background, secondary_background)
	}
	
	private constructor(primary_background: Swatch | null, secondary_background: Swatch | null)
	{
		this.primary_background = primary_background
		this.secondary_background = secondary_background
	}
}
