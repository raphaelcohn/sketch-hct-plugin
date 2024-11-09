// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

/**
 * Some of the API functions return modifiable arrays, where its possible to enter a different type than will be readable afterwards.
 */
declare interface IIOArray<Read, Write> extends Omit<Array<Read>, 'push' | 'unshift' | 'fill' | 'splice'>
{
	/**
	 * Appends new elements to an array, and returns the new length of the array.
	 * @param items New elements of the Array.
	 */
	push(...items: Write[]): number
	
	/**
	 * Inserts new elements at the start of an array.
	 * @param items  Elements to insert at the start of the Array.
	 */
	unshift(...items: Write[]): number
	
	/**
	 * Returns `this` after filling the section identified by start and end with value.
	 * @param item value to fill array section with
	 * @param from index to start filling the array at.
	 * If start is negative, it is treated as length+start where length is the length of the array.
	 * @param to index to stop filling the array at. If end is negative, it is treated as length+end.
	 */
	fill(item: Write, from?: number, to?: number): this
	
	/**
	 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 * @param start The zero-based location in the array from which to start removing elements.
	 * @param deleteCount The number of elements to remove.
	 * @param items more element.
	 */
	splice(start: number, deleteCount?: number, ...items: Write[]): Read[]
}

declare module "sketch/dom"
{
	namespace dom
	{
		import MSDocument = sketchInternal.MSDocument
		
		export class Document extends Component<MSDocument>
		{
			constructor(properties: { colorSpace?: Document.ColorSpace })
			
			type: Types.Document
			
			/**
			 * Access the selected Document
			 * @return The selected Document or undefined if no document is open.
			 */
			static getSelectedDocument(): Document | undefined
			
			/**
			 * Access all the open Documents
			 * @return An array of Documents.
			 */
			static getDocuments(): Document[]
			
			/**
			 * A method to open an existing sketch document or ask the user to open one.
			 * The method is asynchronous so if you want to do something after the document is opening it, make sure that you pass a callback and continue your script there.
			 * Asks the user to select a file to open.
			 * @param cb A function called after the document is opened. It is called with an Error if opening the Document was unsuccessful and a Document (or undefined).
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			static open(cb: (err: any, document?: Document) => void): void
			
			/**
			 * A method to open an existing sketch document or ask the user to open one.
			 * The method is asynchronous so if you want to do something after the document is opening it, make sure that you pass a callback and continue your script there.
			 * @param path The path to the document to open. If undefined, the user will be asked to select one.
			 * @param cb A function called after the document is opened. It is called with an Error if opening the Document was unsuccessful and a Document (or undefined).
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			static open(path: string, cb: (err: any, document?: Document) => void): void
			
			/**
			 * The unique ID of the document.
			 */
			id: string
			
			/**
			 * The path to the document (or the appcast URL in case of a Document from a remote Library).
			 */
			path: string
			
			/**
			 * A read-only property to get the current page that the user has selected.
			 */
			readonly selectedPage: Page
			
			/**
			 * A read-only property to get the layers that the user has selected in the currently selected page.
			 */
			readonly selectedLayers: Selection
			
			/**
			 * The color-space of the document.
			 *
			 * Setting this property changes the color space but does not convert it.
			 */
			colorSpace: Document.ColorSpace
			
			/**
			 * A method to change a document’s color space.
			 * For an in-depth discussion of this topic and the difference between assigning and converting the color space check the color management documentation.
			 * Pass true as an optional second argument to convert instead of assign.
			 */
			changeColorSpace(colorSpace: Document.ColorSpace, convert?: boolean): void
			
			/**
			 * A method to help center the view of the document window on a given layer.
			 * @param layer The layer to center the view onto
			 */
			centerOnLayer(layer: Layer): void
			
			/**
			 * A method to save a document to a specific path or ask the user to choose where to save it.
			 * The method is asynchronous so if you want to do something after the document is saved, make sure that you pass a callback and continue your script there.
			 * @param path The path where the document will be saved. If undefined, the user will be asked to select one.
			 * @param options The options for the save operation (only used when specifing a path).
			 * @param cb A function called after the document is saved. It is called with an Error if saving the Document was unsuccessful.
			 */
			save(path?: string, options?:
			{
				saveMode: Document.SaveMode
				iKnowThatImOverwritingAFolder?: boolean
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			}, cb?: (err: any) => void): void
			
			/**
			 * A method to save a document to a specific path or ask the user to choose where to save it.
			 * The method is asynchronous so if you want to do something after the document is saved, make sure that you pass a callback and continue your script there.
			 * @param path The path where the document will be saved. If undefined, the user will be asked to select one.
			 * @param cb A function called after the document is saved. It is called with an Error if saving the Document was unsuccessful.
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			save(path?: string, cb?: (err: any) => void): void
			
			/**
			 * A method to save a document to a specific path or ask the user to choose where to save it.
			 * The method is asynchronous so if you want to do something after the document is saved, make sure that you pass a callback and continue your script there.
			 * @param cb A function called after the document is saved. It is called with an Error if saving the Document was unsuccessful.
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			save(cb?: (err: any) => void): void
			
			/**
			 * A method to close a document.
			 */
			close(): void
			
			/**
			 * The pages of the document.
			 */
			pages: Page[]
			
			/**
			 * A list of color assets defined in the document.
			 * Mutating the returned array will update the document colors.
			 */
			colors: IIOArray<ColorAsset, IColorAsset>
			
			/**
			 * A list of swatches defined in the document.
			 * Mutating the returned array will update the document swatches.
			 */
			swatches: IIOArray<Swatch, Swatch>
			
			/**
			 * A list of gradient assets defined in the document.
			 * Mutating the returned array will update the document gradients.
			 */
			gradients: IIOArray<GradientAsset, GradientAsset>
			
			/**
			 * A method to help find the first layer in this document which has the given id.
			 * @param layerID The ID of the layer to find
			 * @return Return a Layer object or undefined if it is not found.
			 */
			getLayerWithID(layerID: string): AllLayers | undefined
			
			/**
			 * A method to help find the layers in this document which have the given name.
			 * @param name The name of the layers to find
			 * @return Return an array of Layer.
			 */
			getLayersNamed(name: string): AllLayers[]
			
			/**
			 * A method to help find a shared style in the document.
			 * @param id The ID of the shared style to find
			 * @return Return a SharedStyle object or undefined if it is not found.
			 */
			getSharedLayerStyleWithID(id: string): SharedStyle | undefined
			
			/**
			 * A method to help find a shared style in the document.
			 * @param id The ID of the shared style to find
			 * @return Return a SharedStyle object or undefined if it's not found.
			 */
			getSharedTextStyleWithID(id: string): SharedStyle | undefined
			
			/**
			 * A method to get all symbol masters defined in the document.
			 * @return Return an array of the SymbolMaster objects defined in the document.
			 */
			getSymbols(): SymbolMaster[]
			
			/**
			 * A method to help find a symbol master in the document.
			 * @param symbolId The symbol ID of the symbol master to find
			 * @return Return a SymbolMaster object or undefined if it is not found.
			 */
			getSymbolMasterWithID(symbolId: string): SymbolMaster | undefined
			
			/**
			 * The list of all shared text styles defined in the document.
			 * Mutating the returned array will update the document styles.
			 */
			sharedTextStyles: IIOArray<SharedStyle,
			{
				name: string
				style: IStyle
			}>
			
			/**
			 * The list of all shared layer styles defined in the document.
			 * Mutating the returned array will update the document styles.
			 */
			sharedLayerStyles: IIOArray<SharedStyle,
			{
				name: string
				style: IStyle
			}>
			
			/**
			 * A method to get all shared layer styles defined in the document.
			 * @return Return an array of the layer SharedStyle objects defined in the document.
			 * @deprecated
			 */
			getSharedLayerStyles(): IIOArray<SharedStyle,
			{
				name: string
				style: IStyle
			}>
			
			/**
			 * A method to get all shared text styles defined in the document.
			 * @return Return an array of the text SharedStyle objects defined in the document.
			 * @deprecated
			 */
			getSharedTextStyles(): IIOArray<SharedStyle,
			{
				name: string
				style: IStyle
			}>
		}
	}
}
