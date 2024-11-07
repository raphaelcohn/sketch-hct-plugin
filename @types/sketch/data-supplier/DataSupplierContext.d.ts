// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/data-supplier"
{
	import {dom} from "sketch/dom"
	
	export namespace data
	{
		/**
		 * The argument of the function called when you need to supply some data contains some very important information.
		 */
		export interface DataSupplierContext extends SketchContext
		{
			data:
			{
				// /**
				//  * The number of datum items you need to supply.
				//  */
				// count: number
				
				/**
				 * A unique key to identify the supply request.
				 * You need to pass it to the supply method untouched.
				 */
				key: string
				
				/**
				 * The array of native model objects for which we want some data.
				 * It can be either a native Text, a native Image or a native DataOverride (a special object when the data is for an Override)
				 */
				items: (dom.Text | dom.Image | DataOverride)[]
			}
		}
	}
}
