// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		// import MSSharedStyle = sketchInternal.MSSharedStyle
		
		// export abstract class SharedStyle extends Component<MSSharedStyle>
		export abstract class SharedStyle extends Component
		{
			type: Types.SharedStyle
			
			/**
			 * The unique ID of the Shared Style.
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
			 */
			static fromStyle(options:
			{
				name: string
				style: IStyle
				document: Document
			}): SharedStyle
			
			/**
			 * Creates a new Style linked to this SharedStyle, ready for inserting in a layer.
			 */
			createNewInstance(): Style
			
			/**
			 * Returns an array of all instances of the Shared Style in the document, on all pages.
			 */
			getAllInstances(): Style[]
			
			/**
			 * Returns an array of all layers with a Style which is an instance of the Shared Style in the document, on all pages.
			 */
			getAllInstancesLayers(): AllLayers[]
			
			/**
			 * @return The Library the style was defined in, or undefined if it is a local style.
			 */
			getLibrary(): Library | undefined
			
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
		
		export namespace SharedStyle
		{
			enum StyleType
			{
				Layer = 'Layer',
				
				Text = 'Text',
				
				Unknown = 'Unknown',
			}
		}
	}
}
