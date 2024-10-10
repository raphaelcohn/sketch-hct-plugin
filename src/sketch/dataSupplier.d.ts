// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/data-supplier'
{
	import {dom} from 'sketch/dom'
	
	export namespace data
	{
		/**
		 * Register some data with a name and a key.
		 * @param type The data type. Currently public.text or public.image are the only allowed values.
		 * @param name The data name, will be used as the menu item title for the data.
		 * @param action The name of the Action that will be dispatched when the user requests some data. See supplyData.
		 */
		export function registerDataSupplier(type: 'public.text' | 'public.image', name: string, action: string): void
		
		/**
		 * The argument of the function called when you need to supply some data contains some very important information.
		 */
		export interface DataSupplierContext extends SketchContext
		{
			data:
			{
				/**
				 * The number of data you need to supply
				 */
				count: number
				
				/**
				 * A unique key to identify the supply request. You need to pass it to the supply method untouched.
				 */
				key: string
				
				/**
				 * The array of native model objects for which we want some data. It can be either a native Text, a native Image or a native DataOverride (a special object when the data is for an Override)
				 */
				items: (dom.Text | dom.Image | DataOverride)[]
			}
		}
		
		// import MSDataOverride = sketchInternal.MSDataOverride

		/**
		 * A special object passed in the context of the action to supply data when the item is an Override.
		 */
		// export abstract class DataOverride extends dom.Component<MSDataOverride>
		export abstract class DataOverride extends dom.Component
		{
			/**
			 * The name of the override.
			 */
			readonly id: string

			/**
			 * The override whose value will replaced by the supplied data.
			 */
			readonly override: dom.Override

			/**
			 * The symbol instance that the override is on that will have the data replaced.
			 */
			readonly symbolInstance: dom.SymbolInstance
		}
		
		/**
		 * When the plugin providing the dynamic data has finished generating the data (could be an asynchronous operation), it will call this function with the data key and the data.
		 * @param key Should be equal to context.data.key
		 * @param data The list of values to provide. In case of public.image, the string is the path to the image. It needs to have a length equal to the context.data.count
		 */
		export function supplyData(key: string, data: string[]): void
		
		/**
		 * When the plugin providing the dynamic data has finished generating the datum (could be an asynchronous operation), it will call this function with the data key and the datum.
		 * @param key Should be equal to context.data.key
		 * @param datum The value to provide. In case of public.image, the string is the path to the image. It needs to have a length equal to the context.data.count
		 * @param index The index of the item you are providing a value for.
		 */
		export function supplyDataAtIndex(key: string, datum: string, index: number): void
		
		/**
		 * When registering something, it is good practice to clean up after it.
		 * This is especially useful if when your plugin will be updated: the Shutdown Action will be called before the Startup will.
		 * It gives you the opportunity to update your handler cleanly.
		 */
		export function deregisterDataSuppliers(): void
	}
}
