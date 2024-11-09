// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type { dom as dom_ } from "sketch/dom"
import type { settings as settings_ } from "sketch/settings"
const settings = require("sketch/settings") as typeof settings_
import {get_selection_from_user} from "./get_selection_from_user.mjs"
import {document_setting_key} from "./document_setting_key.mjs"

export function document_setting_or_get_selection_from_user<T>(document: dom_.Document, short_key_name: string, message: string, description: string, possible_values: Map<string, T>, initial_value: string): T
{
	const key = document_setting_key(short_key_name)
	
	const setting_key = settings.documentSettingForKey(document, key) as unknown
	if (setting_key === undefined)
	{
		const [setting_key, setting_value] = get_selection_from_user(message, description, possible_values, initial_value)
		settings.setDocumentSettingForKey(document, key, setting_key)
		return setting_value
	}
	else
	{
		if (typeof (setting_key) !== "string")
		{
			throw new Error(`setting for key ${key} was not a string`)
		}
		
		const setting_value = possible_values.get(setting_key)
		if (typeof (setting_value) === "undefined")
		{
			throw new Error(`setting_key ${setting_key} for key ${key} was not a value`)
		}
		return setting_value
	}
}
