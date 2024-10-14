// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * An object that represents a Gradient Stop.
		 * Each of colors of a Gradient are represented by a Stop.
		 * A Gradient can have as many Stops as you’d like.
		 */
		export interface GradientStop
		{
			/**
			 * The position of the Stop.
			 * 0 represents the start of the gradient while 1 represent the end.
			 */
			position: number
			
			/**
			 * The color of the Stop.
			 */
			color: string
		}
	}
}
