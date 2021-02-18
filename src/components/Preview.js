import React, { useState, useLayoutEffect } from 'react';

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

function Preview(props) {
    const [width, height] = useElementSize(props.previewRef);

    return (
        <div className="card" ref={props.previewRef}>
            <div className="card-header">
                {"Preview"}
            </div>
            <div className="card-body d-flex justify-content-center">
                <canvas ref={props.canvasRef}></canvas>
            </div>
        </div >
    )
}

export default Preview;