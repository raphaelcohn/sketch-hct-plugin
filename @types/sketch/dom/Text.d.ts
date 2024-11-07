// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSTextLayer = sketchInternal.MSTextLayer
		import NSFont = cocoascript.NSFont
		
		/**
		 * A text layer.
		 * It is an instance of Layer so all the methods defined there are available.
		 */
		export class Text extends StyledLayer<MSTextLayer>
		{
			constructor(properties?: TextConstructorProperties)
			
			type: Types.Text
			
			/**
			 * The group the Text is in.
			 */
			parent: Group
			
			/**
			 * The frame of the Text. This is given in coordinates that are local to the parent of the layer.
			 */
			frame: Rectangle
			
			/**
			 * The associated shared style.
			 */
			sharedStyle: SharedStyle | null
			
			/**
			 * The ID of the SharedStyle or null, identical to sharedStyle.id.
			 */
			sharedStyleId: string | null
			
			/**
			 * The string value of the text layer.
			 */
			text: string
			
			/**
			 * The line spacing of the layer.
			 */
			lineSpacing: Text.LineSpacing
			
			/**
			 * Whether the layer should have a fixed width or a flexible width.
			 */
			fixedWidth: boolean
			
			/**
			 * @deprecated
			 * The alignment of the layer.
			 */
			alignment: Text.Alignment
			
			/**
			 * Adjust the Text to fit its value.
			 */
			adjustToFit(): this
			
			/**
			 * Set the font of the text layer.
			 */
			font: NSFont
			
			/**
			 * @deprecated
			 * Set the font of the text layer as the system font of the given size.
			 */
			systemFontSize: number
			
			/**
			 * Returns an array of the text fragments for the text.
			 */
			fragments: TextFragment[]
		}
	}
}
