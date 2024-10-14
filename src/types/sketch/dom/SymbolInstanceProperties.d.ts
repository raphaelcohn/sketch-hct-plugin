// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		export interface SymbolInstanceProperties
		{
			/**
			 * The name of the SymbolInstance.
			 */
			name?: string
			
			/**
			 * The group the SymbolInstance is in.
			 */
			parent?: Group
			
			/**
			 * The frame of the SymbolInstance.
			 * This is given in coordinates that are local to the parent of the layer.
			 */
			frame?: Rectangle
			
			/**
			 * The prototyping action associated with the SymbolInstance.
			 */
			flow?: FlowProperty
			
			/**
			 * The style of the SymbolInstance.
			 */
			style?: Style | IStyle
			
			/**
			 * The unique ID of the Symbol that the instance and its master share.
			 */
			symbolId: string
		}
	}
}
