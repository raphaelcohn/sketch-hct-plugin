// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		// import MSSymbolMaster = sketchInternal.MSSymbolMaster
		
		export interface SymbolMasterProperties
		{
			/**
			 * The name of the SymbolMaster
			 */
			name?: string
			
			/**
			 * The frame of the SymbolMaster. This is given in coordinates that are local to the parent of the layer.
			 */
			frame?: Rectangle
			
			/**
			 * The prototyping action associated with the SymbolMaster.
			 */
			flow?: FlowProperty
		}
		
		export interface SymbolMasterBackground extends ArtboardBackground
		{
			/**
			 * If the background should appear in the instances of the Symbol Master
			 */
			includedInInstance: boolean
		}
		
		/**
		 * Symbol master.
		 **/
		// export class SymbolMaster extends BaseArtboard<MSSymbolMaster>
		export class SymbolMaster extends BaseArtboard
		{
			constructor(properties?: SymbolMasterProperties)
			
			type: Types.SymbolMaster
			
			/**
			 * The unique ID of the Symbol that the master and its instances share.
			 */
			symbolId: string
			
			/**
			 * The background of the Symbol Master
			 */
			readonly background: SymbolMasterBackground
			
			/**
			 * The array of the overrides that the instances of the Symbol Master will be able to change.
			 */
			overrides: Override[]
			
			/**
			 * Replace the artboard with a symbol master.
			 * @param artboard The artboard to create the master from.
			 * @return A new SymbolMaster
			 */
			static fromArtboard(artboard: Artboard): SymbolMaster
			
			/**
			 * Replace the symbol master with an artboard and detach all its instances converting them into groups.
			 * @return A new Artboard
			 */
			toArtboard(): Artboard
			
			/**
			 * Creates a new SymbolInstance linked to this master, ready for inserting in the document.
			 * @return A new SymbolInstance
			 */
			createNewInstance(): SymbolInstance
			
			/**
			 * Returns an array of all instances of the symbol in the document, on all pages.
			 */
			getAllInstances(): SymbolInstance[]
			
			/**
			 * @return The Library the symbol was defined in, or null if it is a local symbol.
			 */
			getLibrary(): Library | null
			
			/**
			 * If a Library has some updates, you can synchronize the local Symbol Master with the Library’s version and bypass the panel where the user chooses the updates to bring.
			 * @return true if it succeeded.
			 */
			syncWithLibrary(): boolean
			
			/**
			 * You can unlink a Symbol Master from the Library it comes from and make it a local Symbol Master instead. It will be added to the Symbols Page.
			 * @return true if it succeeded.
			 */
			unlinkFromLibrary(): boolean
		}
	}
}