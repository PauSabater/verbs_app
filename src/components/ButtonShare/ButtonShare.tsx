'use client'

import { SVGFacebook, SVGLinkedIn, SVGMail, SVGTailedArrow, SVGWhatsapp, SVGX } from '@/assets/svg/svgExports'
import styles from './ButtonBack.module.scss'
import { Fragment } from 'react'

interface IButtonShare {
    // text?: string,
    icon: 'facebook' | 'mail' | 'whatsapp' | 'x' | 'linkedIn'
    action?: Function
}

export function ButtonShare(props: IButtonShare) {

    const getIcon = ()=> {
        if (props.icon === 'facebook') return <SVGFacebook />
        if (props.icon === 'mail')     return <SVGMail />
        if (props.icon === 'whatsapp') return <SVGWhatsapp />
        if (props.icon === 'x')        return <SVGX />
        if (props.icon === 'linkedIn') return <SVGLinkedIn />
    }

    const handleIconClick = ()=> {
        console.log("CLICK ICN!!!")

    }

    return (
        <div onClick={()=> handleIconClick}>
            {getIcon()}
        </div>
    )
}