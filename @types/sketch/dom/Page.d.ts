// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSPage = sketchInternal.MSPage
		
		/**
		 * A Sketch page.
		 * It is an instance of both Layer and Group so all the methods defined there are available.
		 */
		export class Page extends StyledLayer<MSPage>
		{
			constructor(properties?: PageConstructorProperties)
			
			/**
			 * The document the page is in.
			 */
			parent: Document
			
			type: Types.Page
			
			layers: PageChildLayer[]
			
			/**
			 * A read-only property to get the layers that the user has selected in the page.
			 */
			readonly selectedLayers: Selection
			
			/**
			 * Adjust the group to fit its children.
			 */
			adjustToFit(): this
			
			/**
			 * The “Symbols” page is similar to other pages.
			 * The only way it is specific is when creating a Symbol, Sketch will ask the user if they want to move it to that page.
			 *
			 * You can put Symbols in any page but if you want to respect the convention Sketch put in place, here are a few methods to help you do so.
			 *
			 * A method to get the Symbols Page of a Document.
			 *
			 * @param document The document from which you want the Symbols Page.
			 * @return Return a Page or undefined if there is no Symbols Page yet.
			 */
			static getSymbolsPage(document: Document): Page | undefined
			
			/**
			 * A method to create the Page with the name that Sketch will recognize as the Symbols Page.
			 */
			static createSymbolsPage(): Page
			
			/**
			 * A method to tell if the page is the Symbols Page.
			 */
			isSymbolsPage(): boolean
		}
	}
}
