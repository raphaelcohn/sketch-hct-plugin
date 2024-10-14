// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ImageProperties} from "sketch/dom";

declare module "sketch/dom"
{
	namespace dom
	{
		import NSImage = cocoascript.NSImage
		import MSImageData = sketchInternal.MSImageData
		import NSURL = cocoascript.NSURL
		
		export interface ImageProperties
		{
			/**
			 * The name of the Image
			 */
			name?: string
			
			/**
			 * The group the Image is in.
			 */
			parent?: Group
			
			/**
			 * The frame of the Image. This is given in coordinates that are local to the parent of the layer.
			 */
			frame?: Rectangle
			
			/**
			 * The prototyping action associated with the Image.
			 */
			flow?: FlowProperty
			
			/**
			 * The style of the Image.
			 */
			style?: Style | IStyle
			
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
			image?: ImageData | NSImage | NSURL | MSImageData | string | { path: string } | { base64: string }
		}
	}
}
