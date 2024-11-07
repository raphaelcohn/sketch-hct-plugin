// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {Sign} from "./Sign.mts";

export function choose_if_sign_is_positive<T>(sign: Sign, positive: T, negative: T): T
{
	if (sign === +1)
	{
		return positive
	}
	else if (sign === -1)
	{
		return negative
	}
	else
	{
		throw new RangeError("sign is out of range")
	}
}
