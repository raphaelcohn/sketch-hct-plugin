# This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
# Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

exit_error()
{
	local message="$1"

	printf '%s\n' "$message" 1>&2
	exit 1
}

message_without_line_feed()
{
	local message="$1"

	printf '%s' "$message" 1>&2
}

message()
{
	local message="$1"

	printf '%s\n' "$message" 1>&2
}

has_executable_on_path()
{
	local -r executable="$1"

	command -v "$executable" 1>/dev/null 2>/dev/null
}

depends()
{
	for executable in "$@"
	do
		if ! has_executable_on_path "$executable"; then
			exit_error "The required executable '$executable' is not on the PATH '$PATH'"
		fi
	done
}

standard_out_and_standard_error_is_a_terminal()
{
	# Standard out is a terminal.
	if [ -t 1 ]; then
		# Standard error is a terminal.
		if [ -t 2 ]; then
			return 0
		fi
	fi

	return 1
}

is_readable_file()
{
	local file_path="$1"

	if [ -f "$file_path" ]; then
		test -r "$file_path"
	else
		false
	fi
}

_set_operating_system()
{
	depends uname

	local uname_operating_system
	uname_operating_system="$(uname -s)"
	local -r uname_operating_system

	operating_system_c_library=gnu

	case "$uname_operating_system" in

#		AIX)
#			operating_system_family=unix
#			operating_system=aix
#		;;
#
#		A/UX)
#			operating_system_family=unix
#			operating_system=aux
#		;;

		CYGWIN_NT-*)
			operating_system_family=windows
			operating_system=cygwin
		;;

		Darwin)
			operating_system_family=bsd
			operating_system=darwin
		;;

		DragonFly)
			operating_system_family=bsd
			operating_system=dragonfly
		;;

		FreeBSD)
			operating_system_family=bsd
			operating_system=freebsd
		;;

		Interix)
			operating_system_family=windows
			operating_system=interix
		;;

#		IRIX|IRIX64)
#			operating_system_family=unix
#			operating_system=irix
#		;;
#
#		GNU)
#			operating_system_family=unix
#			operating_system=hurd
#		;;
#
#		GNU/kFreeBSD)
#			operating_system_family=bsd
#			operating_system=freebsd
#		;;
#
#		Haiku)
#			operating_system_family=other
#			operating_system=haiku
#		;;
#
#		HP-UX)
#			operating_system_family=unix
#			operating_system=hpux
#		;;

		Linux)
			operating_system_family=linux

			if [ "$(uname -o)" = Android ]; then
				operating_system=android
			else
				operating_system=linux

				depends ldd
				depends grep
				if ldd --version 2>&1 | grep -q 'musl'; then
					operating_system_c_library='musl'
				fi
			fi
		;;

#		MidnightBSD)
#			operating_system_family=bsd
#			operating_system=midnightbsd
#		;;

		MINGW32_NT-*)
			operating_system_family=windows
			operating_system=mingw
		;;

		MSYS_NT-*)
			operating_system_family=windows
			operating_system=msys
		;;

#		Minix)
#			operating_system_family=other
#			operating_system=minix
#		;;

		MS-DOS)
			operating_system_family=windows
			operating_system=djgpp
		;;

		NetBSD)
			operating_system_family=bsd
			operating_system=netbsd
		;;

#		NONSTOP_KERNEL)
#			operating_system_family=unix
#			operating_system=non-stop
#		;;

		OpenBSD)
			operating_system_family=bsd
			operating_system=openbsd
		;;

#		OSF)
#			operating_system_family=unix
#			operating_system=tru64
#		;;
#
#		OS/390)
#			operating_system_family=other
#			operating_system=os390
#		;;
#
#		OS400)
#			operating_system_family=other
#			operating_system=os400
#		;;
#
#		QNX)
#			operating_system_family=other
#			operating_system=qnx
#		;;
#
#		ReliantUNIX-Y)
#			operating_system_family=unix
#			operating_system=reliant
#		;;
#
#		SCO_SV)
#			operating_system_family=unix
#			operating_system=sco_sv
#		;;
#
#		SINIX-Y)
#			operating_system_family=unix
#			operating_system=sinix
#		;;
#
#		sn5176)
#			operating_system_family=unix
#			operating_system=cray
#		;;

		SunOS)
			operating_system_family=unix

			# The  uname in the PATH may be from coreutils installed by the user and sometimes incorrectly identifiers illumos as `SunOS`.
			# As this is a SunOS system, it's a very safe bet that the Sun variety of uname can be found with an absolute PATH.
			if [ "$(/usr/bin/uname -o)" = 'illumos' ]; then
				operating_system=illumos
			else
				operating_system=solaris
			fi
		;;

#		ULTRIX)
#			operating_system_family=unix
#			operating_system=ultrix
#		;;
#
#		UnixWare)
#			operating_system_family=unix
#			operating_system=sco_unixware
#		;;

		UWIN-W*)
			operating_system_family=windows
			operating_system=uwin
		;;

		# busybox-w32 will report "Windows_NT"; there is also a 64-bit version for Windows here, https://frippery.org/busybox/
		# Today, the best way to build under Windows is to use WSL (Windows Subsystem for Linux, preferably version 2).
		Windows_NT)
			operating_system_family=windows
			operating_system=unxutls
		;;

		*)
			exit_error "Unsupported Operating System '$uname_operating_system' (Plan9 & Illumos are not of interest)"
		;;

	esac
}

_set_architecture()
{
	depends uname

	local uname_architecture
	uname_architecture="$(uname -m)"
	local -r uname_architecture

	architecture_variant=''
	architecture_arm_version=''

	case "$uname_architecture" in

		i386)
			architecture_bits=32
			architecture=x86

			# Rosetta on macOS x86_64 macs may be emulating i386 on macos before 10.15.
			if [ "$operating_system" = 'darwin' ]; then
				if /usr/sbin/sysctl hw.optional | /usr/bin/grep -q -F 'hw.optional.x86_64: 1'; then
					architecture_bits=64
					architecture=x86_64
				fi
			fi
		;;

		i86pc)
			architecture_bits=32
			architecture=x86

			# illumos and solaris can have a user land that differs to the architecture.
			case "$operating_system" in

				illumos|solaris)
					depends isainfo
					local value="$(isainfo -n)"
					case "$value" in

						amd64)
							architecture_bits=64
							architecture=x86_64
						;;

						i386)
							architecture_bits=32
							architecture=x86
						;;

						sparc)
							exit_error "32-bit SPARC is not supported"
						;;

						sparcv9)
							exit_error "64-bit SPARC is not supported"
						;;

						*)
							exit_error "Unsupported isainfo -n $value on solaris or illumos is not supported"
						;;

					esac
				;;

			esac
		;;

		i486|i686|i786|x86|i686-AT386|x86pc|BePC)
			architecture_bits=32
			architecture=x86
		;;

		x86_64)
			architecture_bits=64
			architecture=x86_64

			# Rosetta 2 on macOS 11 or later on Arm64 Macs may be emulating x86_64.
			if [ "$operating_system" = 'darwin' ]; then
				if /usr/sbin/sysctl hw.optional | /usr/bin/grep -q -F 'hw.optional.arm64_64: 1'; then
					architecture_bits=64
					architecture=arm64
				fi
			fi
		;;

		amd64|i686-64|genuineintel|x86-64|x64)
			architecture_bits=64
			architecture=x86_64
		;;

		arm|xscale)
			architecture_bits=32
			architecture=arm
			if [ "$operating_system_family" = 'android' ]; then
				architecture_variant='eabi'
			else
				architecture_variant='eabihf'
			fi
			architecture_arm_version='5'
		;;

		armv6l)
			architecture_bits=32
			architecture=arm
			if [ "$operating_system_family" = 'android' ]; then
				architecture_variant='eabi'
			else
				architecture_variant='eabihf'
			fi
			architecture_arm_version='6'
		;;

		armv7l)
			architecture_bits=32
			architecture=arm
			if [ "$operating_system_family" = 'android' ]; then
				architecture_variant='eabi'
			else
				architecture_variant='eabihf'
			fi
			architecture_arm_version='7'
		;;

		armv8l)
			architecture_bits=32
			architecture=arm
			if [ "$operating_system_family" = 'android' ]; then
				architecture_variant='eabi'
			else
				architecture_variant='eabihf'
			fi
			architecture_arm_version='8'
		;;

		aarch64|arm64)
			architecture_bits=64
			architecture=arm64
		;;

		riscv64)
			architecture_bits=64
			architecture=riscv64
		;;

#		2097)
#			architecture_bits=32
#			architecture=zos
#		;;
#
#		alpha)
#			architecture_bits=64
#			architecture=alpha
#		;;
#
#		CRAY*)
#			architecture_bits=64
#			architecture=cray
#		;;
#
#		ia64)
#			architecture_bits=64
#			architecture=ia64
#		;;
#
#		k1om)
#			architecture_bits=64
#			architecture=xeonphi
#		;;
#
#		loongarch64)
#			architecture_bits=64
#			architecture=loongarch64
#		;;
#
#		mc68030)
#			architecture_bits=32
#			architecture=m68000
#		;;
#
#		mips)
#			architecture_bits=32
#			architecture=$(get_endianness mips '' el)
#		;;
#
#		mips64)
#			architecture_bits=64
#			architecture=$(get_endianness mips64 '' el)
#			architecture_variant=abi64
#		;;
#
#		Power*)
#			architecture_bits=32
#			architecture=ppc
#		;;
#
#		ppc)
#			architecture_bits=32
#			architecture=powerpc
#		;;
#
#		ppc64)
#			architecture_bits=64
#			architecture=powerpc64
#		;;
#
#		ppc64le)
#			architecture_bits=64
#			architecture=powerpc64le
#		;;
#
#		s390x)
#			architecture_bits=64
#			architecture=s390x
#		;;
#
#		sparc64)
#			architecture_bits=64
#			architecture=sparc64
#		;;
#
#		sun4u)
#			architecture_bits=32
#			architecture=sparc
#		;;
#
#		VAX|vax-*)
#			architecture_bits=32
#			architecture=vax
#		;;

		*)
			exit_error "Unsupported architecture '$uname_architecture' (Loong 64-bit, MIPS (any), PowerPC (any) and S390x (any) are not of interest)"
		;;

	esac
}

set_operating_system_and_architecture()
{
	_set_operating_system
	_set_architecture
}

# Works on Alpine Linux and Linux Mint
detect_if_musl_libc_present()
{
	if is_file_readable_and_executable /lib/ld-musl-x86_64.so.1; then
		return 0
	else
		return 1
	fi
}

## Use a path like /usr/bin/env which must exist for this script to have even executed
#detect_if_binary_uses_musl_libc()
#{
#	local -r full_path_to_binary="$1"
#
#	depends ldd grep head cut
#	local -r musl_libc="$(ldd "$full_path_to_binary" | grep 'musl' | head -1 | cut -d ' ' -f1)"
#	if [ -n "$musl_libc" ]; then
#		return 0
#	else
#		return 1
#	fi
#}

is_folder_readable_and_searchable()
{
	local -r folder_path="$1"

	if [ ! -d "$folder_path" ]; then
		return 1
	fi
	if [ ! -r "$folder_path" ]; then
		return 1
	fi
	test -x "$folder_path"
}

is_file_readable()
{
	local -r file_path="$1"

	if [ ! -f "$file_path" ]; then
		return 1
	fi

	test -r "$file_path"
}

is_file_readable_and_executable()
{
	local -r file_path="$1"

	if [ ! -f "$file_path" ]; then
		return 1
	fi
	if [ ! -r "$file_path" ]; then
		return 1
	fi
	test -x "$file_path"
}

mkdir_m_0700_p()
{
	depends mkdir chmod

	mkdir -m 0700 -p "$@"
	chmod 0700 "$@" # In case the folder wasn't made above; this ensures consistency.
}

sha_256_checksum()
{
	local file_path="$1"

	if has_executable_on_path sha256sum; then
		set - sha256sum
	elif has_executable_on_path shasum; then
		set - shasum -a 256
	else
		exit_error "Could not find an executable to create a SHA-256 checksum"
	fi
	"$@" -b "$file_path"
}

source_functions()
{
	local -r function_file_base_name="$1"

	. "$functions_folder_path"/sh/"$function_file_base_name".sh
}

tool_version()
{
	local tool_name="$1"

	IFS='' read -r tool_version_value <"$root_folder_path"/versioning/"$tool_name"
}

extract_distribution()
{
	local -r distribution_file_type="$1"
	local -r distribution_name="$2"
	local -r relative_binary_folder_path="$3"
	local -r main_binary_file_name="$4"
	local -r distribution_file_name_callback="$5"
	shift 5


	local tool_version_value
	tool_version "$distribution_name"
	local -r tool_version_value
	extract_folder_path="$TMPDIR"/extract/"$distribution_name"/"$tool_version_value"
	binary_folder_path="$extract_folder_path"/"$relative_binary_folder_path"
	main_binary_file_path="$binary_folder_path"/"$main_binary_file_name"

	if is_file_readable_and_executable "$main_binary_file_path"; then
		return 0
	fi


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

	local distribution_file_name
	$distribution_file_name_callback "$@"
	local -r distribution_file_name

	depends rm
	rm -r -f "$extract_folder_path"
	mkdir_m_0700_p "$extract_folder_path"

	local -r distribution_file_path="$root_folder_path"/lib/"$distribution_name"/"$distribution_file_name"

	case "$distribution_file_type" in

		tar)
			depends tar
			tar -x -C "$extract_folder_path" -f "$distribution_file_path"
		;;

		zip)
			depends unzip
			unzip -qq "$distribution_file_path" -d "$extract_folder_path"
		;;

		*)
			exit_error 1 "Unknown distribution_file_type '$distribution_file_type'"
		;;

	esac
}

child_process_or_exec()
{
	local -r execute="$1"
	shift 1

	if $execute; then
		exec "$@"
	else
		"$@"
	fi
}

set_invocation_name()
{
	invocation_name="${0##*/}"
}

set_root_folder_path()
{
	local -r relative_root_folder_path="$1"
	local -r relative_functions_folder_path="$2"

	unset _program_path_find

	cd "$program_folder_path"/"$relative_root_folder_path" 1>/dev/null 2>/dev/null || exit_error "Could not cd to '$program_folder_path'/'$relative_root_folder_path'"
		readonly root_folder_path="$(pwd)"
	cd - 1>/dev/null 2>/dev/null || exit_error "Could not cd -"

	readonly functions_folder_path="$root_folder_path"/"$relative_functions_folder_path"
}

download_file()
{
	local -r absolute_url="$1"
	local -r output_folder_path="$2"
	local -r file_name="$3"
	local -r makeExecutable="$4"

	mkdir_m_0700_p "$output_folder_path"

	local -r output_file_path="$output_folder_path"/"$file_name"
	if [ -f "$output_file_path" ]; then
		return 0
	fi

	local -r OpenSslStrongCipherSuites='TLS_AES_128_GCM_SHA256:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384'
	local -r GnuSslStringCipherSuites='SECURE128:-VERS-SSL3.0:-VERS-TLS1.0:-VERS-TLS1.1:-VERS-DTLS-ALL:-CIPHER-ALL:-MAC-ALL:-KX-ALL:+AEAD:+ECDHE-ECDSA:+ECDHE-RSA:+AES-128-GCM:+CHACHA20-POLY1305:+AES-256-GCM'

	local -r downloadsFolderPath="$TMPDIR"/downloads
	mkdir_m_0700_p "$downloadsFolderPath"

	local temporaryFilePath="$downloadsFolderPath"/"$file_name".$$

	printf "Downloading '%s' from '%s'... " "$file_name" "$absolute_url" 1>&2
	local errorMessage
	local exitCode
	set +e
		errorMessage="$(curl --retry 3 -C - --proto '=https' --tlsv1.2 --ciphers "$OpenSslStrongCipherSuites" --silent --show-error --fail --location "$absolute_url" --output "$temporaryFilePath" 2>&1)"
		exitCode=$?
	set -e

	if [ $exitCode -ne 0 ]; then
		depends rm
		rm -rf "$temporaryFilePath"
		printf "failed with exit code %s (%s)\n" 1>&2 "$exitCode" "$errorMessage" 1>&2
		exit_error "Downloading failed"
	fi

	printf 'done\n' 1>&2

	if $makeExecutable; then
		depends chmod
		chmod 0700 "$temporaryFilePath"
		if [ ! -x "$temporaryFilePath" ]; then
			exit_error "Could not make $temporaryFilePath executable (is the file system mounted noexec?)"
		fi
	fi

	depends mv
	mv "$temporaryFilePath" "$output_folder_path"/"$file_name"
}
