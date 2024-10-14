// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSSymbolInstance = sketchInternal.MSSymbolInstance
		import NSImage = cocoascript.NSImage
		export class SymbolInstance extends StyledLayer<MSSymbolInstance>
		{
			constructor(properties: SymbolInstanceProperties)
			
			type: Types.SymbolInstance
			
			/**
			 * The group the SymbolInstance is in.
			 */
			parent: GroupTypeLayer
			
			/**
			 * The unique ID of the Symbol that the instance and its master share.
			 */
			symbolId: string
			
			/**
			 * The Symbol master that the instance is linked to.
			 */
			master: SymbolMaster
			
			/**
			 * The array of the overrides to modify the instance.
			 */
			overrides: Override[]
			
			/**
			 * Replaces a group that contains a copy of the Symbol this instance refers to.
			 * Returns null if the master contains no layers instead of inserting an empty group.
			 * @param options The options to apply when detaching the instance.
			 * @param options.recursively If it should detach the nested symbols as well.
			 * Default to false.
			 * @return A new Group or null
			 */
			detach(options?: { recursively?: boolean }): Group | null
			
			// /**
			//  * Change the value of the override.
			//  * @param override The override to change.
			//  * @param value The value of override to set.
			//  * Can be a string or an NSImage or a symbolId depending on the type of the override.
			//  */
			setOverrideValue(override: Override, value: string | NSImage): this
			
			/**
			 * In order to trigger a Smart Layout resize in an instance, for example after changing an override value, call the `resizeWithSmartLayout()` method.
			 */
			resizeWithSmartLayout(): void
		}
	}
}
