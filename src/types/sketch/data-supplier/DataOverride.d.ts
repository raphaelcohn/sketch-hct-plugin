// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/data-supplier"
{
	import {dom} from "sketch/dom"
	
	export namespace data
	{
		import MSDataOverride = sketchInternal.MSDataOverride
		
		/**
		 * A special object passed in the context of the action to supply data when the item is an Override.
		 */
		export abstract class DataOverride extends dom.Component<MSDataOverride>
		{
			/**
			 * The name of the override.
			 */
			readonly id: string
			
			/**
			 * The override whose value will replaced by the supplied data.
			 */
			readonly override: dom.SymbolOverride
			
			/**
			 * The symbol instance that the override is on that will have the data replaced.
			 */
			readonly symbolInstance: dom.SymbolInstance
		}
	}
}
