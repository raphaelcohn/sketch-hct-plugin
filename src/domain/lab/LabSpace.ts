// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

export class LabSpace
{
    static get e() { return 216.0 / 24389.0 }

    static get kappa() { return 24389.0 / 27.0 }

    static get sixteen() { return 16.0 }

    static get one_hundrend() { return 100.0 }

    static get one_hundrend_sixteen() { return LabSpace.one_hundrend + LabSpace.sixteen }
}
