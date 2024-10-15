// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * A utility class to represent the layers selection.
		 * Contains some methods to make interacting with a selection easier.
		 * All the properties are read-only.
		 */
		export abstract class Selection
		{
			/**
			 * The Layers in the selection.
			 * Setting this property will change the selection.
			 */
			layers: PageChildLayer[]
			
			/**
			 * The number of Layers in the selection.
			 */
			readonly length: number
			
			/**
			 * Does the selection contain any layers?
			 */
			readonly isEmpty: boolean
			
			/**
			 * Even though a selection isn’t an array, it defines map, forEach and reduce by just forwarding the arguments to its layers.
			 * Those are just convenience methods to avoid getting the layers every time.
			 */
			map<T>(func: (layer: PageChildLayer) => T): T[]
			
			/**
			 * Even though a selection isn’t an array, it defines map, forEach and reduce by just forwarding the arguments to its layers.
			 * Those are just convenience methods to avoid getting the layers every time.
			 */
			forEach(func: (layer: PageChildLayer) => void): void
			
			/**
			 * Even though a selection isn’t an array, it defines map, forEach and reduce by just forwarding the arguments to its layers.
			 * Those are just convenience methods to avoid getting the layers every time.
			 */
			reduce<T>(func: (initial: T, layer: PageChildLayer) => T): T
			
			/**
			 * Clear the selection.
			 */
			clear(): this
		}
	}
}
