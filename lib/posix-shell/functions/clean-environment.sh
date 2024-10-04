# This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
# Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

_export_PATH()
{
	local path="$root_folder_path/bin"
	local folder_path
	for folder_path in /usr/local/bin /usr/bin /bin
	do
		if is_folder_readable_and_searchable "$folder_path"; then
			path="$path":"$folder_path"
		fi
	done
	export PATH="$path"
}

_export_TMPDIR()
{
	# Force `TMPDIR` to be local and ensure its permissions are correctly set.
	# On Windows, we'd want to set `TEMP` instead.
	local -r tmpdir="$root_folder_path"/tmp
	mkdir_m_0700_p "$tmpdir"
	export TMPDIR="$tmpdir"
}

# Consistent locale settings to ensure reproducibility of error messages and sorting.
# Only other locales to consider are `C` and `POSIX`; these do not have character encodings.
# `POSIX` is for GNU libc an alias of `C`.
_export_LANG_variables()
{
	# This is only relevant for systems using GNU's gettext implementation, and, even then, only provides fallbacks for `LC_MESSAGES`.
	# However, language translation on POSIX is poorly understood and some tools examine the environment variables in the wrong priority order: hence, we set this.
	# en_US is the most likely language translation available.
	export LANGUAGE='en_US'

	# Ensure LC_ALL is always consistent for error and other messages and formats.
	# NOTE: An alternative value to use here would be `C`, for locale independence and US-ASCII sorting rules.
	export LC_ALL="$LANGUAGE".UTF-8

	# Ensure LANG is always consistent for error and other messages and formats.
	# Strictly speaking, if `LC_ALL` is set there is no need to set `LANG`, but, as above for `LANGUAGE`, some tools examine the environment variables in the wrong priority order.
	export LANG="$LC_ALL"
}

_export_USER_LOGNAME_and_HOME_variables()
{
	# Ensure USER is set to effective user.
	depends id
	export USER
	# See <https://stackoverflow.com/a/77261005> for a matrix of parameter expansions for the POSIX shell.
	USER="${USER:-$(id -u -n)}"

	# Force LOGNAME to be the same as user.
	export LOGNAME="$USER"

	# Sensible value of HOME.
	depends awk
	depends uname
	__export_USER_LOGNAME_and_HOME_variables()
	{
		local home_path
		if is_readable_file /etc/paswd; then
			home_path="$(awk -F: '$1 == "'"$USER"'" { print $6 }' /etc/passwd)"
		else
			home_path=''
		fi
		if [ -z "$home_path" ]; then
			if [ "$(uname -s)" = "Darwin" ]; then
				home_path="/Users/$USER"
			else
				home_path='/var/empty'
			fi
		fi

		printf '%s' "$home_path"
	}
	export HOME
	# See <https://stackoverflow.com/a/77261005> for a matrix of parameter expansions for the POSIX shell.
	HOME="${HOME:-$(__export_USER_LOGNAME_and_HOME_variables)}"
	unset -f __export_USER_LOGNAME_and_HOME_variables
}

_export_TERM_if_standard_out_and_standard_error_are_both_terminals()
{
	if standard_out_and_standard_error_is_a_terminal; then
		depends uname
		__export_TERM_if_standard_out_and_standard_error_are_both_terminals()
		{
			case "$(uname -s)" in

				Darwin)
					printf 'xterm-256color'
				;;

				Linux)
					printf 'linux'
				;;

				*)
					printf 'vt100'
				;;

			esac
		}

		# See <https://stackoverflow.com/a/77261005> for a matrix of parameter expansions for the POSIX shell.
		local terminal
		# True if TERM is unset.
		if [ -z "${TERM+word}" ]; then
			terminal="$(__export_TERM_if_standard_out_and_standard_error_are_both_terminals)"
		# True if TERM is set; because of the previous check, true only if set to a non-null (non empty string) value.
		elif [ "${TERM:+word}" = 'word' ]; then
			terminal="$TERM"
		# TERM is set to an empty string.
		else
			terminal="$(__export_TERM_if_standard_out_and_standard_error_are_both_terminals)"
		fi

		unset -f __export_TERM_if_standard_out_and_standard_error_are_both_terminals

		export TERM="$terminal"
		return 0
	fi

	# True if TERM is set.
	if [ -n "${TERM+word}" ]; then
		# Unset TERM if set as we are not a terminal.
		unset TERM
	fi
}

_export_TZ_as_UTC()
{
	export TZ=Etc/UTC
}

_remove_polluting_environment_variables()
{
	local -r environment_variable_name_to_preserve="$1"

	local _export_statement environment_variable_name _environment_variable_value
	while IFS=' =' read -r _export_statement environment_variable_name _environment_variable_value
	do
		# shellcheck disable=SC2254
		case "$environment_variable_name" in

			PATH)
				:
			;;

			TMPDIR)
				:
			;;

			LANG|LC_ALL|LANGUAGE)
				:
			;;

			USER|LOGNAME|HOME)
				:
			;;

			TERM)
				:
			;;

			PWD|OLDPWD|SHELL|SHLVL)
				:
			;;

			SSH_AUTH_SOCK)
				:
			;;

			$environment_variable_name_to_preserve)
				:
			;;

			# This occurs because of the use of a heredoc to read input from `export -p`.
			'')
				:
			;;

			*)
				unset "$environment_variable_name"
			;;
		esac
	done << EOF
$(export -p)
EOF
}

clean_environment()
{
	local -r environment_variable_name_to_preserve="$1"

	umask 0077

	_export_PATH
	_export_TMPDIR
	_export_LANG_variables
	_export_USER_LOGNAME_and_HOME_variables
	_export_TERM_if_standard_out_and_standard_error_are_both_terminals
	_export_TZ_as_UTC

	_remove_polluting_environment_variables "$environment_variable_name_to_preserve"
}
