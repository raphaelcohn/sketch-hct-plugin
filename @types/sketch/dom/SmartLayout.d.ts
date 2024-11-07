// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * The SmartLayout object contains the set of possible Smart Layouts that can be applied to SymbolMaster and Group layers.
		 */
		export enum SmartLayout
		{
			/**
			 * Smart Layout flowing left to right
			 */
			LeftToRight = 'LeftToRight',
			
			/**
			 * Smart Layout expanding horizontally from the center.
			 */
			HorizontallyCenter = 'HorizontallyCenter',
			
			/**
			 * Smart Layout flowing right to left.
			 */
			RightToLeft = 'RightToLeft',
		
			/**
			 * Smart Layout flowing from top to bottom.
			 */
			TopToBottom = 'TopToBottom',
			
			/**
			 * Smart Layout expanding vertically from the center.
			 */
			VerticallyCenter = 'VerticallyCenter',
			
			/**
			 * Smart Layout flowing from bottom to top.
			 */
			BottomToTop = 'BottomToTop',
		}
	}
}
