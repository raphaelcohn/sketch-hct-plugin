// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {MaterialTheme} from "../../types/material-theme/MaterialTheme";
import {get_string_from_user} from "../sketch/get_string_from_user";


export class MaterialThemeConfiguration
{
	readonly #json: NonNullable<MaterialTheme>
	
	private constructor(json: any)
	{
		this.#json = json as MaterialTheme
	}
	
	public static from_json_string(json_string: string): NonNullable<MaterialThemeConfiguration>
	{
		return new MaterialThemeConfiguration(JSON.parse(json_string))
	}
	
	public static from_user_string(): NonNullable<MaterialThemeConfiguration>
	{
		return MaterialThemeConfiguration.from_json_string(get_string_from_user("Provide JSON export from https://material-foundation.github.io/material-theme-builder/", "Please paste in contents of material-theme.json", "{}"))
	}
}
