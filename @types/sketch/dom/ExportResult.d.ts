// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * The method returns:—
		 * * undefined if `options.output` is undefined or a string.
		 * * an array of Buffers if objectToExport is an array and `options.formats` is an image format.
		 * * an array of Objects if objectToExport is an array and `options.formats` is json.
		 * * a Buffer if objectToExport is a single item and `options.formats` is an image format.
		 * * a Object if objectToExport is a single item and `options.formats` is json.
		 */
		export type ExportResult = ArrayBuffer | ArrayBuffer[] | object[] | object | undefined
	}
}
