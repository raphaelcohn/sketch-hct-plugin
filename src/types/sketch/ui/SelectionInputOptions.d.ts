// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/ui'
{
	export namespace ui
	{
		export interface SelectionInputOptions
		{
			/**
			 * A secondary text to describe with more details the input.
			 */
			description?: string
			
			/**
			 * The type of the input
			 */
			type: INPUT_TYPE.selection
			
			/**
			 * The initial value of the input.
			 */
			initialValue?: string
			
			/**
			 * The possible choices that the user can make
			 * Only used for a selection input.
			 */
			possibleValues: string[]
		}
	}
}