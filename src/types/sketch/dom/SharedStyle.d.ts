// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSSharedStyle = sketchInternal.MSSharedStyle
		
		export abstract class SharedStyle extends Component<MSSharedStyle>
		{
			type: Types.SharedStyle
			
			/**
			 * The unique ID of the Shared Style.
			 *
			 *
			 * Note that the id of a Shared Style coming from a Library might look like this: `FBFF821E-20F3-48C5-AEDC-89F97A8C2344[D1A683E0-5333-4EBE-977C-48F64F934E99]`.
			 *
			 * If you have a Symbol Instance which has a Layer using a Shared Style from a Library and a Layer in the Document using the same Shared Style from the Library, the style will be imported twice; once for use in the layer and once for use by the foreign Symbol.
			 * The reason for this is to do with syncing. If you change the Shared Style in the Library it will cause both the Symbol Instance and the Shared Style to be out-of-date in the document.
			 * This will be shown in the component sync sheet, but you can choose only to sync the Shared Style (or the Symbol).
			 * Using these “private” Shared Styles means that syncing just the shared style doesn’t implicitly also sync the symbol.
			 *
			 * The format of these Symbol private shared style IDs is `SYMBOLID[STYLEID`] Where: `STYLEID` is the id of the original Shared Style in the original Library.
			 * And `SYMBOLID` is the new symbolId of the foreign Symbol in the destination document.
			 *
			 * Where we have such as Symbol private style, the same ID will be used both as the local ID and as the remote ID.
			 */
			id: string
			
			/**
			 * The type of the Shared Style (Layer or Text).
			 */
			styleType: SharedStyle.StyleType
			
			/**
			 * The name of the Shared Style.
			 */
			name: string
			
			/**
			 * The Style value that is shared.
			 */
			style: Style
			
			/**
			 * Create a new Shared Style with a specific name in a specific Document.
			 *
			 * ⚠️You can only insert local shared styles (eg. not linked to a Library).
			 * `document.sharedLayerStyles` returns the foreign shared styles (eg. linked to a Library) concatenated with the local shared styles
			 * So if you try to insert a new Shared Style at the beginning (using unshift for example), it will end up at the beginning of the local Shared Styles but that might not be the beginning of all the shared styles if there are some foreign.
			 */
			static fromStyle(options:
			{
				name: string
				style: IStyle
				document: Document
			}): SharedStyle
			
			// /**
			//  * Creates a new Style linked to this SharedStyle, ready for inserting in a layer.
			//  */
			// createNewInstance(): Style
			
			/**
			 * Returns an array of all instances of the Shared Style in the document, on all pages.
			 */
			getAllInstances(): Style[]
			
			/**
			 * Returns an array of all layers with a Style which is an instance of the Shared Style in the document, on all pages.
			 */
			getAllInstancesLayers(): AllLayers[]
			
			/**
			 * If the SharedStyle was imported from a library, the method can be used to:
			 *
			 *     know about it
			 *     get the library back
			 *
			 * @return The Library the style was defined in, or `null` if it is a local style.
			 */
			getLibrary(): Library | null
			
			/**
			 * If a Library has some updates, you can synchronize the local Shared Style with the Library's version and bypass the panel where the user chooses the updates to bring.
			 * @return true if it succeeded.
			 */
			syncWithLibrary(): boolean
			
			/**
			 * You can unlink a Shared Style from the Library it comes from and make it a local Shared Style instead.
			 * @return true if it succeeded.
			 */
			unlinkFromLibrary(): boolean
		}
	}
}
