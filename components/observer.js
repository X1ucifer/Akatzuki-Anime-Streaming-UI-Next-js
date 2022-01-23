import { useEffect, useMemo, useState } from 'react'



const useElementOnScreen = (options, videoRef) => {

    const [isVisibile, setIsVisible] = useState()

    const callbackFunction = entries => {
        const [entry] = entries //const entry = entries[0]
        setIsVisible(entry.isIntersecting)
    }
    // const optionsMemo = useMemo(() => {
    //     return options
    // }, [options])

  

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options)
        const currentTarget = videoRef.current
        observer.observe(currentTarget)

       
    }, [videoRef, options])
    return isVisibile
}


export default useElementOnScreen 