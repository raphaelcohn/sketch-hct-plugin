// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		export interface ExportOptions
		{
			/**
			 * This is the path of the folder where all exported files are placed (defaults to "~/Documents/Sketch Exports").
			 * If falsey, the data for the objects are returned immediately.
			 */
			output: string | false | null | 0
			
			/**
			 * Comma separated list of formats to export to (png, jpg, svg, json or pdf) (default to "png").
			 */
			formats?: ExportFileFormat | 'json'
			
			/**
			 * Comma separated list of scales which determine the sizes at which the layers are exported (defaults to "1").
			 */
			scales?: string
			
			/**
			 * Name exported images using their id rather than their name (defaults to false).
			 */
			['use-id-for-name']?: boolean
			
			/**
			 * Export only layers that are contained within the group (default to false).
			 */
			['group-contents-only']?: boolean
			
			/**
			 * Overwrite existing files (if any) with newly generated ones (defaults to false).
			 */
			overwriting?: boolean
			
			/**
			 * Trim any transparent space around the exported image (defaults to false).
			 */
			trimmed?: boolean
			
			/**
			 * If exporting a PNG, remove metadata such as the colour profile from the exported file (defaults to false).
			 */
			['save-for-web']?: boolean
			
			/**
			 * If exporting a SVG, make the output more compact (defaults to false).
			 */
			compact?: boolean
			
			/**
			 * If exporting a SVG, include extra attributes (defaults to false).
			 */
			['include-namespaces']?: boolean
			
			/**
			 * If exporting a JPG, export a progressive JPEG (only used when exporting to jpeg) (defaults to false).
			 */
			progressive?: boolean
			
			/**
			 * If exporting a JPG, the compression level to use fo jpeg (with 0 being the completely compressed, 1.0 no compression) (defaults to 1.0).
			 */
			compression?: number
		}
	}
	
}
