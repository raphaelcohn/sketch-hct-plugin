// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSPage = sketchInternal.MSPage
		
		export class Page extends StyledLayer<MSPage>
		{
			/**
			 * The document the page is in.
			 */
			parent: Document;
			
			type: Types.Page;
			
			layers: PageChildLayer[];
			
			/**
			 * Adjust the group to fit its children.
			 */
			adjustToFit(): this;
			
			/**
			 * A method to get the Symbols Page of a Document.
			 */
			static getSymbolsPage(document: Document): Page | undefined;
			
			/**
			 * A method to create the Page with the name that Sketch will recognize as the Symbols Page.
			 */
			static createSymbolsPage(): Page;
			
			constructor(properties?: PageProperties);
			
			/**
			 * A read-only property to get the layers that the user has selected in the page.
			 */
			readonly selectedLayers: Selection;
		}
	}
}
