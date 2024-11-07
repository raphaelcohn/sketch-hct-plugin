// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	import ExportResult = dom.ExportResult
	
	class dom
	{
		/**
		 * Export an object, using the options supplied.
		 * @param objectToExport The object to export.
		 * @param options Options indicating which sizes and formats to use, etc.
		 */
		static export(objectToExport: dom.ToExportLayerTypes, options?: dom.ExportOptions): ExportResult
	}
}
