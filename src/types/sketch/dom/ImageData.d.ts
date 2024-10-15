// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ImageConstructorProperties} from "sketch/dom";

declare module "sketch/dom"
{
	namespace dom
	{
		import NSImage = cocoascript.NSImage
		import MSImageData = sketchInternal.MSImageData
		import NSURL = cocoascript.NSURL
		import NSData = cocoascript.NSData
		
		/**
		 * An ImageData is a wrapper around a native NSImage.
		 * You can access the native NSImage with nsimage or a native NSData representation of the image with nsdata.
		 */
		export abstract class ImageData extends Component<MSImageData>
		{
			type: Types.ImageData
			
			readonly nsimage: NSImage
			
			readonly nsdata: NSData
			
			/**
			 * As a convenience, you can access the original size of an ImageData object via its size property.
			 */
			readonly size:
			{
				width: number
				
				height: number
			}
			
			/**
			 * The image property accept a wide range of input:—
			 * * an ImageData.
			 * * a native NSImage.
			 * * a native NSURL.
			 * * a native MSImageData.
			 * * a string: path to the file to load the image from.
			 * * an object with a path property: path to the file to load the image from.
			 * * an object with a base64 string: a base64 encoded image.
			 */
			static from(input: ImageData | NSImage | NSURL | MSImageData | string | { path: string } | { base64: string }): ImageData
		}
	}
}
