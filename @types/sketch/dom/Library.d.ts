// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSAssetLibrary = sketchInternal.MSAssetLibrary
		
		/**
		 * A Sketch Library.
		 */
		export abstract class Library extends Component<MSAssetLibrary>
		{
			type: Types.Library
			
			/**
			 * The unique ID of the Library.
			 */
			readonly id: string
			
			/**
			 * The name of the Library.
			 */
			readonly name: string
			
			/**
			 * If Sketch has been able to load the Library.
			 */
			readonly valid: boolean
			
			/**
			 * If the user has enabled the Library.
			 */
			enabled: boolean
			
			/**
			 * The type of Library.
			 */
			readonly libraryType: Library.LibraryType
			
			/**
			 * The date at which the library was last updated
			 */
			readonly lastModifiedAt: Date
			
			/**
			 * Access all the Libraries
			 * @return An array of Libraries.
			 */
			static getLibraries(): Library[]
			
			/**
			 * Get the library for a local Sketch document.
			 * If the Document was already added as a Library, it will simply return it.
			 * If it is not already a Library, it will be added.
			 * @param path The path of the Library.
			 * @return The existing Library at the path or a new Library from the document at the path.
			 */
			static getLibraryForDocumentAtPath(path: string): Library
			
			/**
			 * Get the remote library for an RSS feed.
			 * If the RSS feed was already added as a Library, it will simply return it.
			 * If it is not already a Library, it will be added.
			 * @param url The URL to the rss feed describing the versions of the library.
			 * @param cb A function called after the library is added.
			 * It is called with an Error if adding the Library was unsuccessful and a Library (or undefined).
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			static getRemoteLibraryWithRSS(url: string, cb: (err?: any, library?: Library) => void): void
			
			/**
			 * A method to remove an existing library.
			 */
			remove(): void
			
			/**
			 * A library references a Sketch Document and you can access it with this method.
			 * @returns The Document that the Library references.
			 * It can throw an error if the Document cannot be accessed.
			 */
			getDocument(): Document
			
			/**
			 * Get the Symbols that can be imported.
			 *
			 * To import a Symbol from a Library, do not access its Document and look for the Symbol Source directly.
			 * Instead, get the Symbol References of the Library and use those to import them.
			 *
			 * Those references depends on the document you want to import them into.
			 * For example if a document has already imported a symbol, it will reference the local version to keep all the instances in sync.
			 * @ return An array of Shareable Object that represents the Symbols which you can import from the Library.
			 */
			getImportableSymbolReferencesForDocument(document: Document): ImportableObject[]
			
			/**
			 * Get the Shared Layer Styles that can be imported.
			 *
			 * To import a shared style from a Library, do not access its Document and look for the SharedStyle directly.
			 * Instead, get the Shared Layer Style References of the Library and use those to import them.
			 *
			 * Those references depends on the document you want to import them into.
			 * For example if a document has already imported a shared style, it will reference the local version to keep all the instances in sync.
			 * @return An array of Shareable Object that represents the Shared Layer Styles which you can import from the Library.
			 */
			getImportableLayerStyleReferencesForDocument(document: Document): ImportableObject[]
			
			/**
			 * Get the Shared Text Styles that can be imported.
			 *
			 * To import a shared style from a Library, do not access its Document and look for the SharedStyle directly.
			 * Instead, get the Shared Text Style References of the Library and use those to import them.
			 *
			 * Those references depends on the document you want to import them into.
			 * For example if a document has already imported a shared style, it will reference the local version to keep all the instances in sync.
			 * @return An array of Shareable Object that represents the Shared Layer Styles which you can import from the Library.
			 */
			getImportableTextStyleReferencesForDocument(document: Document): ImportableObject[]
			
			/**
			 * Get the Shared Swatches that can be imported.
			 *
			 * To import a Swatch from a Library, do not access its Document and look for the Swatch directly.
			 * Instead, get the Shared Swatch References of the Library and use those to import them.
			 *
			 * Those references depends on the document you want to import them into.
			 * For example if a document has already imported a shared Swatch, it will reference the local version to keep all the instances in sync.
			 * @return An array of Shareable Object that represents the Shared Swatches which you can import from the Library.
			 */
			getImportableSwatchReferencesForDocument(document: Document): ImportableObject[]
		}
	}
}
