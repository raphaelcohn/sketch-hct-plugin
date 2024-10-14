// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		export namespace Style
		{
			export enum BlurType
			{
				/**
				 * A common blur type that will accurately blur in all directions.
				 */
				Gaussian = 'Gaussian',
				
				/**
				 * Blur only in one direction, giving the illusion of motion.
				 */
				Motion = 'Motion',
				
				/**
				 * Will blur from one particular point out.
				 */
				Zoom = 'Zoom',
				
				/**
				 * This will blur any content that appears behind the layer.
				 */
				Background = 'Background',
			}
		}
	}
}
