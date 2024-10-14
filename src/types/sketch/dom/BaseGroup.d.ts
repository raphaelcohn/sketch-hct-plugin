// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSLayerGroup = sketchInternal.MSLayerGroup
		
		class BaseGroup<NativeType extends MSLayerGroup = MSLayerGroup> extends StyledLayer<NativeType>
		{
			/**
			 * The layers that this component groups together.
			 */
			layers: GroupChildLayer[]
			
			/**
			 * Adjust the group to fit its children.
			 */
			adjustToFit(): this
		}
	}
}
