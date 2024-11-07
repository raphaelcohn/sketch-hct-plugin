// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ImageConstructorProperties} from "sketch/dom";

declare module "sketch/dom"
{
	namespace dom
	{
		import MSBitmapLayer = sketchInternal.MSBitmapLayer
		
		/**
		 * An image layer.
		 * It is an instance of Layer so all the methods defined there are available.
		 */
		export class Image extends StyledLayer<MSBitmapLayer>
		{
			/**
			 * By default, an Image layer will be created with a size of 100 × 100 pixels, unless you provide a frame property on its constructor.
			 */
			constructor(properties?: ImageConstructorProperties)
			
			type: Types.Image
			
			/**
			 * The group the Image is in.
			 */
			parent: Group
			
			/**
			 * The associated shared style.
			 */
			sharedStyle: SharedStyle | null
			
			/**
			 * The ID of the SharedStyle or null, identical to sharedStyle.id.
			 */
			sharedStyleId: string | null
			
			/**
			 * The actual image of the layer.
			 */
			image: ImageData
			
			/**
			 * Adjust the Image to its original size.
			 * This is equivalent to pressing the ‘Original Size’ button in Sketch’s Inspector.
			 * For performance reasons, Sketch initializes the Image object lazily
			 * So if you want to set the dimensions of your Image layer to those of the original file, you’ll first need to create the object, and then call the resizeToOriginalSize method.
			 *
			 * @return The current Image (useful if you want to chain the calls).
			 */
			resizeToOriginalSize(): this
		}
	}
}
