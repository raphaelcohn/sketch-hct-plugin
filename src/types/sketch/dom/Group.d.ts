// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * A group of layers.
		 * It is also an instance of Layer so all the methods defined there are available.
		 */
		export class Group extends BaseGroup
		{
			constructor(properties?: GroupConstructorProperties)
			
			type: Types.Group
			
			/**
			 * The associated shared style.
			 */
			sharedStyle: SharedStyle | null
			
			/**
			 * The ID of the SharedStyle or null, identical to sharedStyle.id.
			 */
			sharedStyleId: string | null
			
			/**
			 * Given a reference to a SymbolMaster or Group layer use the smartLayout setter to apply one of the Smart Layout values.
			 *
			 * Set the smartLayout value to null to remove the Smart Layout.
			 * This is the equivalent of selecting “None” in the Sketch Inspector.
			 */
			smartLayout: SmartLayout | null
			
			/**
			 * Adjust the group to fit its children.
			 *
			 * @return The current group (useful if you want to chain the calls).
			 */
			adjustToFit(): this
		}
	}
}
