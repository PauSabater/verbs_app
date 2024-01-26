const useOutsideClick = (callback: Function) => {
    const ref = React.useRef()

    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            console.log("HEYYY CLICK!!")

            if (ref.current && event.target && !(ref.current as HTMLElement).contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [ref])

    return ref
}
