// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		export namespace Style
		{
			export enum GradientType
			{
				/**
				 * Linear gradients tend to be the most common, where two colors will appear at opposite points of an object and will blend, or transition into each other.
				 */
				Linear = 'Linear',
				
				/**
				 * A radial gradient will create an effect where the transition between color stops will be in a circular pattern.
				 */
				Radial = 'Radial',
				
				/**
				 * This effect allows you to create gradients that sweep around the circumference (measured by the maximum width or height of a layer) in a clockwise direction.
				 */
				Angular = 'Angular',
			}
		}
	}
}
