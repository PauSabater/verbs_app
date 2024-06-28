'use client'

import { SVGFacebook, SVGLinkedIn, SVGMail, SVGTailedArrow, SVGWhatsapp, SVGX } from '@/assets/svg/svgExports'
import styles from './ButtonBack.module.scss'
import { Fragment } from 'react'
import Link from 'next/link'


interface IButtonShare {
    // text?: string,
    icon: 'facebook' | 'mail' | 'whatsapp' | 'x' | 'linkedIn'
    action?: Function
}

export function ButtonShare(props: IButtonShare) {

    const currentUrl = window.location


    const getIcon = ()=> {
        if (props.icon === 'facebook') return <SVGFacebook />
        if (props.icon === 'mail')     return <SVGMail />
        if (props.icon === 'whatsapp') return <SVGWhatsapp />
        if (props.icon === 'x')        return <SVGX />
        if (props.icon === 'linkedIn') return <SVGLinkedIn />
    }

    // const handleIconClick = ()=> {
    //     console.log("CLICK ICN!!!")

    // }

    const getLink = (): string => {
        if (props.icon === 'linkedIn') return `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
        if (props.icon === 'whatsapp') return `<whatsapp://send?text=${currentUrl}`
        if (props.icon === 'facebook') return `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
        if (props.icon === 'x') return `/https://twitter.com/intent/tweet?url=${currentUrl}&text=Check%20out%20this%20page`
        return ''
    }

    return (
        <a
            href={getLink()}
            target='_blank'
        >
            {getIcon()}
        </a>
    )
}