// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

/**
 * [CIELAB (`L*a*b*`) color space](https://en.wikipedia.org/wiki/CIELAB_color_space) co-ordinate values, as defined by the [International Commission on Illumination (CIE)]<https://en.wikipedia.org/wiki/International_Commission_on_Illumination> in 1976.
 * A near perceptually uniform color space, which is device independent.
 */
import {FiniteNumber} from "../../number/FiniteNumber.mjs";
import type { LStar } from "./LStar.mjs"

export class CielabCoordinates
{
    private static readonly _24389: NonNullable<FiniteNumber> = FiniteNumber.try_from(24389);
    
    private constructor(readonly l_star: LStar)
    {
    }
    
    /**
     * @internal
     */
    static readonly e: NonNullable<FiniteNumber> = FiniteNumber.try_from(216.0).divide(CielabCoordinates._24389)
    
    /**
     * @internal
     */
    static readonly kappa: NonNullable<FiniteNumber> = CielabCoordinates._24389.divide(FiniteNumber.TwentySeven)
    
    /**
     * @internal
     */
    static lab_inv_f(ft: NonNullable<FiniteNumber>): NonNullable<FiniteNumber>
    {
        const ft_cubed = ft.cube()
        if (ft_cubed > CielabCoordinates.e)
        {
            return ft_cubed
        }
        else
        {
            return FiniteNumber.OneHundredAndSixteen.multiply(ft).subtract(FiniteNumber.Sixteen).divide(CielabCoordinates.kappa)
        }
    }
    
    /**
     * @internal
     */
    static lab_f(t: NonNullable<FiniteNumber>): NonNullable<FiniteNumber>
    {
        if (t > CielabCoordinates.e)
        {
            return t.cube_root()
        }
        else
        {
            return CielabCoordinates.kappa.multiply(t).add(FiniteNumber.Sixteen).divide(FiniteNumber.OneHundredAndSixteen)
        }
    }
}
