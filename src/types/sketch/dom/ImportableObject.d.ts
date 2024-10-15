// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * Also known as a Shareable Object
		 *
		 * An Object that can imported from a Library.
		 * All its properties are read-only.
		 */
		export abstract class ImportableObject extends Component<ImportableNative>
		{
			type: Types.ImportableObject
			
			/**
			 * The unique ID of the Object.
			 */
			readonly id: string
			
			/**
			 * The name of the Object.
			 */
			readonly name: string
			
			/**
			 * The type of the Object.
			 */
			readonly objectType: Library.ImportableObjectType
			
			/**
			 * The Library the Object is part of.
			 */
			readonly library: Library
			
			/**
			 * An Importable Object is linked to a Document so importing it will import it in the said Document.
			 * @return If the objectType of the Object is Symbol, it will return a Symbol Master which will be linked to the Library (meaning that if the Library is updated, the Symbol Instances created from the Master will be updated as well).
			 */
			import(): SymbolMaster
		}
	}
}
