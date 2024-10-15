// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * An export format associated with a layer.
		 */
		export interface ExportFormat
		{
			type?: Types.ExportFormat
			
			/**
			 * The file format of the export.
			 */
			fileFormat: ExportFileFormat
			
			/**
			 * The prefix added to the file name.
			 */
			prefix?: string
			
			/**
			 * The suffix added to the file name.
			 */
			suffix?: string
			
			/**
			 * The size of the export.
			 * Valid values include `2x`, `100w`, `100width`, `100px`, `300h` and `300height`.
			 */
			size: string
		}
	}
}
