// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSAvailableOverride = sketchInternal.MSAvailableOverride
		
		/**
		 * A Symbol override.
		 * This component is not exposed, it is only returned when accessing the overrides of a Symbol Instance.
		 * Can't be constructed: only returned from a SymbolInstance.
		 */
		export abstract class Override extends Component<MSAvailableOverride>
		{
			type: Types.Override
			
			/**
			 * The path to the override.
			 * It is formed by the symbolId of the nested symbols separated by a `/`.
			 */
			path: string
			
			/**
			 * The property that this override controls.
			 * It can be "stringValue" for a text override, "symbolId" for a nested symbol, or "image" for an image override.
			 */
			property: 'stringValue' | 'symbolID' | 'image' | 'textStyle'
			
			/**
			 * The unique ID of the override (${path}_${property}).
			 */
			id: string
			
			/**
			 * If the override is a nested symbol override.
			 */
			symbolOverride: boolean
			
			/**
			 * The value of the override which can be change.
			 */
			value: string | ImageData
			
			/**
			 * If the override hasn’t been changed and is the default value.
			 */
			
			isDefault: boolean
			/**
			 * The layer the override applies to. It will be an immutable version of the layer
			 */
			affectedLayer: Text | Image | SymbolInstance
			
			/**
			 * If the value of the override can be changed.
			 */
			editable: boolean
			
			/**
			 * If the override is selected.
			 */
			selected: boolean
		}
	}
}
