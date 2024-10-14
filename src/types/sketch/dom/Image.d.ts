// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ImageProperties} from "sketch/dom";

declare module "sketch/dom"
{
	namespace dom
	{
		import MSBitmapLayer = sketchInternal.MSBitmapLayer
		
		export class Image extends StyledLayer<MSBitmapLayer>
		{
			constructor(properties?: ImageProperties)
			
			type: Types.Image
			
			/**
			 * The group the Image is in.
			 */
			parent: Group
			
			/**
			 * The actual image of the layer.
			 */
			image: ImageData
			
			/**
			 * The ID of the SharedStyle or null, identical to sharedStyle.id.
			 */
			sharedStyleId: string | null
			
			/**
			 * The associated shared style.
			 */
			sharedStyle: SharedStyle | null
		}
	}
}
