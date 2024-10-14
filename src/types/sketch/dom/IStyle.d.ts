// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		/**
		 * A utility class to represent the style of a Layer.
		 */
		export interface IStyle
		{
			/**
			 * The opacity of a Layer, between 0 (transparent) and 1 (opaque).
			 */
			opacity?: number
			
			/**
			 * The opacity of a Layer, between 0 (transparent) and 1 (opaque).
			 */
			blendingMode?: Style.BlendingMode
			
			/**
			 * The blur applied to the Layer.
			 */
			blur?: Blur
			
			/**
			 * The fills of a Layer.
			 */
			fills?: Fill[]
			
			/**
			 * The borders of a Layer.
			 */
			borders?: Border[]
			
			/**
			 * The options that the borders share.
			 */
			borderOptions?: BorderOptions
			
			/**
			 * The shadows of a Layer.
			 */
			shadows?: Shadow[]
			
			/**
			 * The inner shadows of a Layer.
			 */
			innerShadows?: Shadow[]
			
			/**
			 * The horizontal alignment of the text of a Text Layer
			 */
			alignment?: Text.Alignment
			
			/**
			 * The vertical alignment of the text of a Text Layer
			 */
			verticalAlignment?: Text.VerticalAlignment
			
			/**
			 * The kerning between letters of a Text Layer. null means that the kerning will be the one defined by the font.
			 */
			kerning?: number | null
			
			/**
			 * The height of a line of text in a Text Layer. null means "automatic".
			 */
			lineHeight?: number | null
			
			/**
			 * The space between 2 paragraphs of text in a Text Layer.
			 */
			paragraphSpacing?: number
			
			/**
			 * A rgba hex-string (#000000ff is opaque black) of the color of the text in a Text Layer.
			 */
			textColor?: string
			
			/**
			 * The size of the font in a Text Layer.
			 */
			fontSize?: number
			
			/**
			 * The transform applied to the text of a Text Layer.
			 */
			textTransform?: 'none' | 'uppercase' | 'lowercase'
			
			/**
			 * The name of the font family of a Text Layer.
			 * 'system' means the font family of the OS ('.SF NS Text' on macOS 10.14).
			 */
			fontFamily?: string
			
			/**
			 * The weight of the font of a Text Layer.
			 * Goes from 0 to 12, 0 being the thinnest and 12 being the boldest.
			 * Not every weight is available for every font.
			 * When setting a font weight that does not exist for the current font family, the closest weight that exists will be set instead.
			 */
			fontWeight?: number
			
			/**
			 * The style of the font of a Text Layer.
			 */
			fontStyle?: 'italic' | undefined
			
			/**
			 * The variant of the font of a Text Layer.
			 */
			fontVariant?: 'small-caps' | undefined
			
			/**
			 * The size variant of the font of a Text Layer.
			 */
			fontStretch?: 'compressed' | 'condensed' | 'narrow' | 'expanded' | 'poster' | undefined
			
			/**
			 * The underline decoration of a Text Layer.
			 * `<line-style> [<line-pattern>] ['by-word']` / `undefined` where `<line-style>` can be `single` / `thick` / `double` and `<line-pattern>` can be `dot` / `dash` / `dash-dot` / `dash-dot-dot`
			 */
			textUnderline?: string | undefined
			
			/**
			 * The strikethrough decoration of a Text Layer.
			 * `<line-style> [<line-pattern>] ['by-word']` / undefined where `<line-style>` can be `single` / `thick` / `double` and `<line-pattern>` can be `dot` / `dash` / `dash-dot` / `dash-dot-dot`
			 */
			textStrikethrough?: string | undefined
		}
	}
}
