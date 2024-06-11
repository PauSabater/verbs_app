import { useEffect, useState } from 'react'


export default function GloalWrap(props: {children: React.ReactNode}) {

    const [pageMode, setPageMode] = useState('light')

    useEffect(()=> {
        window.addEventListener(
            'toggleMode',
            (e) => {
                document.body.classList.add("mode-dark")
            },
            false
        )

    }, [])

    return <div data-wrap>{props.children}</div>
}
