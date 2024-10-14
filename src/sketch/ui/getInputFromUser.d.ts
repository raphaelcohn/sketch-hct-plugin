// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/ui'
{
	export namespace ui
	{
		/**
		 * Shows a simple input sheet which displays a message, and asks for an input from the user.
		 * @param message The prompt message to show.
		 * @param options Options to customize the input sheet.
		 * Most of the options depends on the type of the input.
		 * @param callback A function called after the user entered the input
		 * It is called with an Error if the user canceled the input and a string or number depending on the input type (or undefined).
		 */
		export function getInputFromUser<T extends string | number>(message: string, options: StringInputOptions<T>, callback: (err: any, value?: T) => void): void
		
		/**
		 * Shows a simple input sheet which displays a message, and asks for an input from the user.
		 * @param message The prompt message to show.
		 * @param options Options to customize the input sheet.
		 * Most of the options depends on the type of the input.
		 * @param callback A function called after the user entered the input.
		 * It is called with an Error if the user canceled the input and a string or number depending on the input type (or undefined).
		 */
		export function getInputFromUser(message: string, options: SelectionInputOptions, callback: (err: any, value?: string) => void): void
	}
}
