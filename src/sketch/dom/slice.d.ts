// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		// import MSSliceLayer = sketchInternal.MSSliceLayer
		
		export interface SliceProperties
		{
			/**
			 * The name of the Slice.
			 */
			name?: string
			
			/**
			 * The group the Slice is in.
			 */
			parent?: Group
			
			/**
			 * The frame of the Slice.
			 * This is given in coordinates that are local to the parent of the layer.
			 */
			frame?: Rectangle
			
			/**
			 * The export formats of the Slice.
			 */
			exportFormats?: ExportFormat[]
		}
		
		/**
		 * A slice.
		 * It is an instance of both Layer so all the methods defined there are available.
		 */
		// export class Slice extends Layer<MSSliceLayer>
		export class Slice extends Layer
		{
			constructor(properties?: SliceProperties)
			
			type: Types.Slice
			
			/**
			 * The group the Slice is in.
			 */
			parent: Group
		}
	}
}
