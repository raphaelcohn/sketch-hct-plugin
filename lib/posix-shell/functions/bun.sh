# This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
# Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

_bun_set_variables_operating_system_and_architecture()
{
	local operating_system_family
	local operating_system
	local operating_system_c_library
	local architecture_bits
	local architecture
	local architecture_variant
	local architecture_arm_version
	set_operating_system_and_architecture
	local -r operating_system_family
	local -r operating_system
	local -r operating_system_c_library
	local -r architecture_bits
	local -r architecture
	local -r architecture_variant
	local -r architecture_arm_version

	case "$operating_system" in

		darwin|linux|windows)
			bun_operating_system="$operating_system"
		;;

		*)
			exit_error "Unsupported operating system '$operating_system'for bun"
		;;

	esac

	case "$architecture" in

		arm64)
			bun_architecture=aarch64
		;;

		x86_64)
			bun_architecture=x64
		;;

		*)
			exit_error "Unsupported architecture '$architecture'for bun"
		;;

	esac
}

_bun_set_variables_internal()
{
	local bun_operating_system
	local bun_architecture
	_bun_set_variables_operating_system_and_architecture
	local -r bun_operating_system
	local -r bun_architecture

	local -r relative_binary_folder_path="bun-${bun_operating_system}-${bun_architecture}"
	local -r main_binary_file_name='bun'

	local -r distribution_name='bun'
	distribution_folder_path="$root_folder_path"/lib/"$distribution_name"/"$bun_version"
	distribution_file_name="bun-${bun_operating_system}-${bun_architecture}.zip"
	distribution_file_path="$distribution_folder_path"/"$distribution_file_name"
	distribution_download_url="https://github.com/oven-sh/bun/releases/download/bun-v${bun_version}/$distribution_file_name"
	extract_folder_path="$TMPDIR"/extract/"$distribution_name"/"$bun_version"

	binary_folder_path="$extract_folder_path"/"$relative_binary_folder_path"
	main_binary_file_path="$binary_folder_path"/"$main_binary_file_name"
}

_bun_initialise()
{
	if [ "${bun_version+SET}" = 'SET' ]; then
		return 0
	fi

	local tool_version_value
	tool_version 'bun'
	readonly bun_version="$tool_version_value"

	local distribution_download_url
	local distribution_folder_path
	local distribution_file_name
	local extract_folder_path
	_bun_set_variables_internal
	readonly bun_main_binary_file_path="$main_binary_file_path"

	if is_file_readable_and_executable "$bun_main_binary_file_path"; then
		return 0
	fi

	download_file "$distribution_download_url" "$distribution_folder_path" "$distribution_file_name" false

	depends rm
	rm -r -f "$extract_folder_path"

	mkdir_m_0700_p "$extract_folder_path"

	depends unzip
	unzip -qq "$distribution_file_path" -d "$extract_folder_path"
}

bun_run()
{
	local execute="$1"
	shift 1

	_bun_initialise

	local -r local_bunfig_file_path="$HOME"/.bunfig.toml
	if is_readable_file "$local_bunfig_file_path"; then
		exit_error "Remove $local_bunfig_file_path; this file overrides global configuration in an undesirable way and introduces non-reproducibility"
	fi

	local -r bun_home_folder_path="$root_folder_path"/lib/index
	local -r dot_bun_folder_path="$bun_home_folder_path"/.index
	local -r install_dot_bun_folder_path="$dot_bun_folder_path"/install

	#unset NODE_TLS_REJECT_UNAUTHORIZED
	export BUN_CONFIG_VERBOSE_FETCH=curl
	export BUN_RUNTIME_TRANSPILER_CACHE_PATH="$TMPDIR"/index-transpiler-cache
	export BUN_CONFIG_MAX_HTTP_REQUESTS=256
	export BUN_CONFIG_NO_CLEAR_TERMINAL_ON_RELOAD=true
	export DO_NOT_TRACK=1
	export NO_COLOR=1
	export FORCE_COLOR=0
	export XDG_CONFIG_HOME="$root_folder_path"/libexec/index

	# Undocumented; override .bunfig.toml which does not support environment variables and for which globalCacheDir in .bunfig.toml is ignored!
	export BUN_INSTALL_GLOBAL_DIR="$install_dot_bun_folder_path"/global
	export BUN_INSTALL_BIN="$root_folder_path"/bin
	export BUN_INSTALL_CACHE_DIR="$install_dot_bun_folder_path"/cache

	child_process_or_exec "$execute" "$bun_main_binary_file_path" "$@"
}
