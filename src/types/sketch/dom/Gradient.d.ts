// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * An object that represents a Gradient.
		 */
		export interface Gradient
		{
			/**
			 * The type of the Gradient.
			 */
			gradientType: Style.GradientType
			
			/**
			 * The position of the start of the Gradient
			 */
			from: Point
			
			/**
			 * The position of the end of the Gradient.
			 */
			to: Point
			
			/**
			 * The different stops of the Gradient.
			 */
			stops: GradientStop[]
		}
	}
}
