import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
    // to select the modal
    const ref = useRef()
    // close the modal when ever the user click on out of modal 
    useEffect(function () {
        function handleClick(e) {
            // to define if the user has clicked out of the modal or inside the modal (we want to close the modal if the user has clicked out side of the modal)
            if (ref.current && !ref.current.contains(e.target)) handler();
        }
        document.addEventListener('click', handleClick, listenCapturing);

        // clean up
        return () => document.removeEventListener('click', handleClick, listenCapturing);
    }, [handler, listenCapturing]);


    return ref
}