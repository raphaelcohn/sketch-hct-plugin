// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * An object that represents a Fill.
		 */
		export interface Fill
		{
			/**
			 * The type of the fill.
			 */
			fillType: Style.FillType
			
			/**
			 * A rgba hex-string (#000000ff is opaque black).
			 */
			color?: string
			
			/**
			 * The gradient of the fill.
			 */
			gradient?: Gradient
			
			/**
			 * Whether the fill is active or not.
			 */
			enabled?: boolean
			
			pattern?: Pattern
		}
	}
}
