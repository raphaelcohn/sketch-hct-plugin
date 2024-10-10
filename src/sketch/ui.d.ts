// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/ui'
{
	import {dom} from 'sketch/dom'
	
	/**
	 * A set of functions to show some user interfaces.
	 * The set is small on purpose.
	 * Any more complex UI should be provided by third party libraries and doesn’t need to be in the core.
	 */
	export namespace ui
	{
		/**
		 * Show a small, temporary, message to the user.
		 * The message appears at the bottom of the selected document, and is visible for a short period of time.
		 * It should consist of a single line of text.
		 * @param text The message to show.
		 * @param document The document to show the message into.
		 */
		export function message(text: string, document?: dom.Document): void
		
		/**
		 * Show an alert with a custom title and message. The alert is modal, so it will stay around until the user dismisses it by pressing the OK button.
		 * @param title The title of the alert.
		 * @param text The text of the message.
		 */
		export function alert(title: string, text: string): void
		
		/**
		 * @deprecated
		 * Shows a simple input sheet which displays a message, and asks for a single string input.
		 * @param message The prompt message to show.
		 * @param initialValue The initial value of the input string.
		 * @return The string that the user input, or "null" (String) if the user clicked 'Cancel'.
		 */
		export function getStringFromUser(message: string, initialValue?: string): string
		
		/**
		 * @deprecated
		 * Shows an input sheet which displays a popup with a series of options, from which the user is asked to choose.
		 * @param message The prompt message to show.
		 * @param options An array of option items.
		 * @param selectedIndex The index of the item to select initially.
		 * @return An array with a response code, the selected index and ok. The code will be one of NSAlertFirstButtonReturn or NSAlertSecondButtonReturn. The selection will be the integer index of the selected item. ok is the boolean code === NSAlertFirstButtonReturn.
		 */
		export function getSelectionFromUser(message: string, options: string[], selectedIndex?: number): [number, number, boolean]
		
		/**
		 * The enumeration of the different input types for getInputFromUser().
		 */
		export enum INPUT_TYPE
		{
			string = 'string',
			selection = 'selection',
			slider = 'slider',
		}
		
		export interface StringInputOptions<T extends string | number>
		{
			/** A secondary text to describe with more details the input. */
			description?: string
			
			/** The type of the input. */
			type?: INPUT_TYPE.string
			
			/** The initial value of the input. */
			initialValue?: T
		}
		
		export interface SelectionInputOptions
		{
			/** A secondary text to describe with more details the input. */
			description?: string
			
			/** The type of the input. */
			type: INPUT_TYPE.selection
			
			/** The initial value of the input. */
			initialValue?: string
			
			/** The possible choices that the user can make. Only used for a selection input. */
			possibleValues: string[]
		}
		
		/**
		 * Shows a simple input sheet which displays a message, and asks for an input from the user.
		 * @param message The prompt message to show.
		 * @param options Options to customize the input sheet. Most of the options depends on the type of the input.
		 * @param callback A function called after the user entered the input. It is called with an Error if the user canceled the input and a string or number depending on the input type (or undefined).
		 */
		export function getInputFromUser<T extends string | number>(message: string, options: StringInputOptions<T>, callback: (err: any, value?: T) => void): void
		
		/**
		 * Shows a simple input sheet which displays a message, and asks for an input from the user.
		 * @param message The prompt message to show.
		 * @param options Options to customize the input sheet. Most of the options depends on the type of the input.
		 * @param callback A function called after the user entered the input. It is called with an Error if the user canceled the input and a string or number depending on the input type (or undefined).
		 */
		export function getInputFromUser(message: string, options: SelectionInputOptions, callback: (err: any, value?: string) => void): void
		
		/**
		 * Sketch has two themes: `light` and `dark`.
		 * If your plugin has a custom UI, it should support both as well.
		 */
		export function getTheme(): 'dark' | 'light'
	}
}
