// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		export interface PageConstructorProperties
		{
			/**
			 * The name of the Page
			 */
			name?: string
			
			/**
			 * The document the page is in.
			 */
			parent?: Document
			
			/**
			 * The layers that this page has
			 */
			layers?: LayersPropertyType
			
			/**
			 * The frame of the page
			 */
			frame?: Rectangle
		}
	}
}
