// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type { dom as dom_ } from "sketch/dom"
import type { settings as settings_ } from "sketch/settings"
const settings: typeof settings_ = require("sketch/settings");
import {get_string_from_user} from "./get_string_from_user.mjs";
import {document_setting_key} from "./document_setting_key.mjs";

export function document_setting_or_get_string_from_user(document: dom_.Document, short_key_name: string, message: string, description: string, initial_value: string): string
{
	const key = document_setting_key(short_key_name)
	
	const setting_value = settings.documentSettingForKey(document, key)
	if (setting_value !== undefined)
	{
		if (typeof(setting_value) !== "string")
		{
			throw new Error(`setting for key ${key} was not a string`)
		}
		
		return setting_value
	}
	else
	{
		const setting_value = get_string_from_user(message, description, initial_value)
		settings.setDocumentSettingForKey(document, key, setting_value)
		return setting_value
	}
}
