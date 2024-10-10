// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		export interface ISwatch extends Omit<IColorAsset, "type">
		{
		}
		
		export class Swatch implements ISwatch
		{
			type: "Swatch"
			
			/**
			 * The name of the swatch, or null
			 */
			name?: string
			
			/**
			 * The hex string for the color.
			 */
			color: string
			
			// referencingColor: sketchInternal.MSColor
			
			/**
			 * Get a referencing Color.
			 * @return A Color that references a Color Variable, which you can use anywhere the API expects a Color object.
			 */
			static from(swatch: ISwatch): Swatch
		}
	}
}
