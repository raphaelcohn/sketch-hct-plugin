# This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
# Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

npm_run_script()
{
	local -r script_name="$1"
	shift 1

	cd "$root_folder_path" 1>/dev/null 2>/dev/null
		npm run-script "$script_name" "$@"
	cd - 1>/dev/null 2>/dev/null
}

npm_install_online()
{
	local tool_version_value
	tool_version 'npm-before'
	local -r npm_before_iso_date_time="$tool_version_value"

	cd "$root_folder_path" 1>/dev/null 2>/dev/null
		npm cache clean --force && rm -rf node_modules && npm install --silent --package-lock-only --before="$npm_before_iso_date_time" && npm ci --silent
	cd - 1>/dev/null 2>/dev/null
}

npm_install_offline()
{
	cd "$root_folder_path" 1>/dev/null 2>/dev/null
		npm ci --silent --offline
	cd - 1>/dev/null 2>/dev/null
}
