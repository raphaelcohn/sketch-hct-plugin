// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * An object that represents a Border.
		 */
		export interface Border
		{
			/**
			 * The type of the fill of the border.
			 */
			fillType: Style.FillType.Color | Style.FillType.Gradient
			
			/**
			 * The color of border.
			 *
			 * Defined if `fillType` is `Style.FillType.Color`.
			 *
			 * A rgba hex-string (`#000000ff` is opaque black).
			 */
			color?: string
			
			/**
			 * The gradient of the border.
			 *
			 * Defined if `fillType` is `Style.FillType.Gradient`.
			 */
			gradient?: Gradient
			
			/**
			 * Whether the border is active or not.
			 */
			enabled?: boolean
			
			/**
			 * The position of the border.
			 */
			position?: Style.BorderPosition
			
			/**
			 * The thickness of the border.
			 */
			thickness?: number
		}
	}
}
