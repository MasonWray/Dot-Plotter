import { useState, useLayoutEffect } from 'react';

// Get current size of given element when it is resized
function useElementSize(eRef) {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            if (eRef) {
                setSize([eRef.current.getBoundingClientRect().width, eRef.current.getBoundingClientRect().height]);
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [eRef]);
    return size;
}

export default useElementSize;