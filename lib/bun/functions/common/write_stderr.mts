// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {writeSync} from "node:fs";
import {stderr} from "node:process";
import assert from "./assert.mjs";

export default function(message: string): number
{
	assert.is_string(message)

	try
	{
		return writeSync(stderr.fd, message, null, 'utf8')
	}
	catch(cause)
	{
		throw new Error(`Could not write message to stderr of '${message}'`, {cause})
	}
}
