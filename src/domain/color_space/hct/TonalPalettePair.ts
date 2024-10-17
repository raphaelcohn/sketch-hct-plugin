// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {TonalPalette} from "./TonalPalette";

export class TonalPalettePair
{
	public static readonly Error: NonNullable<TonalPalettePair> = new TonalPalettePair(TonalPalette.Error, TonalPalette.Error)
	
	readonly #content: NonNullable<TonalPalette>
	readonly #not_content: NonNullable<TonalPalette>
	
	public constructor(content: NonNullable<TonalPalette>, not_content: NonNullable<TonalPalette>)
	{
		this.#content = content
		this.#not_content = not_content
	}
	
	public get content(): NonNullable<TonalPalette>
	{
		return this.#content
	}
	
	public get not_content(): NonNullable<TonalPalette>
	{
		return this.#not_content
	}
	
	public get default(): NonNullable<TonalPalette>
	{
		throw new Error("Not known if this is the content or not_content TonalPalette")
	}
}
