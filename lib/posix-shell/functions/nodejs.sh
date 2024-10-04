# This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
# Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

_nodejs_set_variables()
{
	if [ "${nodejs_version+SET}" = 'SET' ]; then
		return 0
	fi
	local tool_version_value
	tool_version 'nodejs'

	readonly nodejs_version="$tool_version_value"

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

	local nodejs_operating_system
	local nodejs_file_extension
	local nodejs_architecture
	case "$operating_system" in

		aix)
			nodejs_operating_system=aix
			nodejs_file_extension=tar.gz

			case "$architecture" in

				powerpc64)
					nodejs_architecture=ppc64
				;;

				*)
					exit_error "Only PowerPC64 is officially supported for NodeJS on AIX (not '$architecture')"
				;;

			esac
		;;

		android|linux)
			nodejs_operating_system=linux
			nodejs_file_extension=tar.xz

			case "$architecture" in

				arm)
					case "$architecture_arm_version" in

						7|8)
							nodejs_architecture=armv7l
						;;

						*)
							exit_error "Only ARM 32-bit architectures v7 and v8 are officially supported for NodeJS on Android & Linux (not '$architecture_arm_version')"
						;;

					esac
				;;

				arm64)
					nodejs_architecture=arm64
				;;

				powerpc64le)
					nodejs_architecture=ppc64le
				;;

				s390x)
					nodejs_architecture=s390x
				;;

				x86_64)
					nodejs_architecture=x64
				;;

				*)
					exit_error "Only 32-bit ARM, 64-bit ARM, 64-bit System 7 (S390X) and 64-bi x86 are officially supported for NodeJS on Android & Linux (not '$architecture')"
				;;

			esac
		;;

		darwin)
			nodejs_operating_system=darwin
			nodejs_file_extension=tar.gz

			case "$architecture" in

				arm64)
					nodejs_architecture=arm64
				;;

				x86_64)
					nodejs_architecture=x64
				;;

				*)
					exit_error "Only 64-bit ARM and 64-bit x86 are officially supported for NodeJS on macOS (not '$architecture')"
				;;

			esac
		;;

		windows)
			nodejs_operating_system=win
			nodejs_file_extension=zip

			case "$architecture" in

				arm64)
					nodejs_architecture=arm64
				;;

				x86)
					nodejs_architecture=x86
				;;

				x86_64)
					nodejs_architecture=x64
				;;

				*)
					exit_error "Only 32-bit x86, 64-bit ARM and 64-bit x86 are officially supported for NodeJS on Windows (not '$architecture')"
				;;

			esac
		;;

		*)
			exit_error "Unsupported Operating System '$operating_system' for NodeJS"
		;;

	esac

	local -r nodejs_operating_system
	local -r nodejs_file_extension
	local -r nodejs_architecture

	readonly nodejs_extracted_folder_name="node-v${nodejs_version}-${nodejs_operating_system}-${nodejs_architecture}"
	readonly nodejs_archive_file_name="${nodejs_extracted_folder_name}.${nodejs_file_extension}"
	readonly nodejs_output_folder_path="$root_folder_path"/lib/nodejs
	readonly nodejs_downloaded_distribution_file_path="$nodejs_output_folder_path"/"$nodejs_archive_file_name"
	readonly nodejs_extracted_distribution_folder_path="$TMPDIR"/nodejs/"$nodejs_version"
	readonly nodejs_prefix_folder_path="$nodejs_extracted_distribution_folder_path"/"$nodejs_extracted_folder_name"
	readonly nodejs_bin_folder_path="$nodejs_prefix_folder_path"/bin
	readonly nodejs_lib_folder_path="$nodejs_prefix_folder_path"/lib
	readonly nodejs_etc_folder_path="$nodejs_prefix_folder_path"/etc
	readonly nodejs_cache_folder_path="$nodejs_prefix_folder_path"/cache
	readonly nodejs_libexec_folder_path="$root_folder_path"/libexec/nodejs
}

_nodejs_extract_distribution()
{
	depends rm
	rm -rf "$nodejs_extracted_distribution_folder_path"
	mkdir_m_0700_p "$nodejs_extracted_distribution_folder_path"

	depends tar
	tar -x -C "$nodejs_extracted_distribution_folder_path" -f "$nodejs_downloaded_distribution_file_path"

	# Create the npm user cache
	mkdir_m_0700_p "$nodejs_cache_folder_path"

	# Make global installs of npm modules part of the repository so they can be checked in; destroys any currently globally installed modules (which helps keep dependencies well managed)
	depends rm mv ln
	local -r tool_modules_folder_path="$nodejs_output_folder_path"/modules/nodejs/"$nodejs_version"
	mkdir_m_0700_p "$tool_modules_folder_path"
	rm -rf "$tool_modules_folder_path"/node_modules
	mv "$nodejs_lib_folder_path"/node_modules "$tool_modules_folder_path"
	ln -s ../../../../../lib/nodejs/modules/nodejs/"$nodejs_version"/node_modules "$nodejs_lib_folder_path"/node_modules

	# Create the global npm config file
	local
	mkdir_m_0700_p "$nodejs_etc_folder_path"
	cat >"$nodejs_etc_folder_path"/npmrc <<-EOF
		cache = "$nodejs_cache_folder_path"
		init-module = "$nodejs_libexec_folder_path/npm-init.js"
		init.module = "$nodejs_libexec_folder_path/npm-init.js"
		userconfig = "$nodejs_libexec_folder_path/user.config.npmrc"
	EOF

	cat "$nodejs_libexec_folder_path" >>"$nodejs_etc_folder_path"/npmrc
}

nodejs_run_binary()
{
	local -r execute="$1"
	local -r binary_file_name="$2"
	shift 2

	_nodejs_set_variables

	local absolute_binary_file_path="$nodejs_bin_folder_path"/"$binary_file_name"

	if ! is_file_readable_and_executable "$absolute_binary_file_path"; then
		download_file "https://nodejs.org/dist/v${nodejs_version}"/"$nodejs_archive_file_name" "$nodejs_output_folder_path" "$nodejs_archive_file_name" false
		_nodejs_extract_distribution
	fi

	export NODE_DISABLE_COLORS=1
	export NODE_NO_WARNINGS=1
	export NODE_PENDING_DEPRECATION=1
	export NODE_REPL_HISTORY=''
	export NODE_REPL_EXTERNAL_MODULE=''

	#export NODE_PATH=XXXXXX

	child_process_or_exec "$execute" "$absolute_binary_file_path" "$@"
}

_nodejs_package_install_for_binary_tool()
{
	local -r npm_package_name="$1"
	local -r binary_file_name="$2"

	_nodejs_set_variables

	local tool_version_value
	tool_version "$npm_package_name"

	local -r nodejs_package_parent_of_node_modules_folder_path="$nodejs_output_folder_path"/modules/"$npm_package_name"/"$tool_version_value"
	mkdir_m_0700_p "$nodejs_package_parent_of_node_modules_folder_path"/node_modules

	nodejs_binary_tool_file_path="$nodejs_package_parent_of_node_modules_folder_path"/node_modules/.bin/"$binary_file_name"

	if is_file_readable_and_executable "$nodejs_binary_tool_file_path"; then
		return 0
	fi

	cd "$nodejs_package_parent_of_node_modules_folder_path" 1>/dev/null 2>/dev/null
		nodejs_run_binary false npm install "$npm_package_name"@"$tool_version_value"
	cd - 1>/dev/null 2>/dev/null
}

nodejs_package_run_binary_tool()
{
	local -r execute="$1"
	local -r npm_package_name="$2"
	local -r binary_file_name="$3"
	shift 3

	local nodejs_binary_tool_file_path
	_nodejs_package_install_for_binary_tool "$npm_package_name" "$binary_file_name"
	local -r nodejs_binary_tool_file_path

	child_process_or_exec "$execute" "$nodejs_binary_tool_file_path" "$@"
}
