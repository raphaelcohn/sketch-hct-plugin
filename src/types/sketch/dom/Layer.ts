// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSLayer = sketchInternal.MSLayer
		
		export abstract class Layer<NativeType extends MSLayer = MSLayer> extends Component<NativeType>
		{
			/**
			 * The unique ID of the Layer (not to be confused with symbolId on SymbolInstances).
			 */
			id: string
			
			/**
			 * The name of the Layer
			 */
			name: string
			
			/**
			 * The group/document the layer is in.
			 */
			parent: ParentType
			
			/**
			 * If the layer is locked.
			 */
			locked: boolean
			
			/**
			 * If the layer is hidden.
			 */
			hidden: boolean
			
			/**
			 * The frame of the Layer. This is given in coordinates that are local to the parent of the layer.
			 */
			frame: Rectangle
			
			/**
			 * If the layer is selected.
			 */
			selected: boolean
			
			/**
			 * The prototyping action associated with the layer.
			 */
			flow: FlowProperty
			
			/**
			 * The export formats of the Layer.
			 */
			exportFormats: ExportFormat[]
			
			/**
			 * The transformation applied to the Layer.
			 */
			readonly transform: LayerTransform
			
			/**
			 * A new identical layer will be inserted into the parent of this layer.
			 * @return A new copy of this layer.
			 */
			duplicate(): this
			
			/**
			 * Remove this layer from its parent.
			 */
			remove(): this
			
			/**
			 * The index of this layer in its parent.
			 * The layer at the back of the parent (visually) will be layer 0.
			 * The layer at the front will be layer `n - 1` if there are `n` layers.
			 */
			readonly index: number
			
			/**
			 * Move this layer to the front of its parent.
			 */
			moveToFront(): this
			
			/**
			 * Move this layer forward in its parent.
			 */
			moveForward(): this
			
			/**
			 * Move this layer to the back of its parent.
			 */
			moveToBack(): this
			
			/**
			 * Move this layer backward in its parent.
			 */
			moveBackward(): this
			
			/**
			 * Access the page the layer is in.
			 */
			getParentPage(): Page | undefined
			
			/**
			 * Access the artboard the layer is in (if any).
			 */
			getParentArtboard(): Artboard | undefined
			
			/**
			 * Access the symbol master the layer is in (if any).
			 */
			getParentSymbolMaster(): SymbolMaster | undefined
			
			/**
			 * Access the shape the layer is in (if any).
			 */
			getParentShape(): Shape | undefined
		}
	}
}
