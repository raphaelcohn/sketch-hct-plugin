// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		namespace Document
		{
			export enum SaveMode
			{
				/**
				 * Overwrites a document’s file with the document’s contents
				 */
				Save = 0,
				
				/**
				 *  Writes a document’s contents to a new file and then changes the document’s current location to point to the just-written file
				 */
				SaveAs = 1,
				
				/**
				 * Writes a document’s contents to a new file without changing the document’s current location to point to the new file.
				 */
				SaveTo = 2,
			}
		}
	}
}
