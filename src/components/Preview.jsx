import React, { useState, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import drawRasterLayers from '../util/drawRasterLayers';

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

function Preview() {
    const previewRef = useRef();
    const canvasRef = useRef();
    const layers = useSelector((state) => state.Layers);
    const sourceImage = useSelector((state) => state.FileSelector.sourceImage);

    // Depend on size of preview card
    useElementSize(previewRef);

    if (canvasRef && sourceImage && previewRef) {
        var scalingFactor = (previewRef.current.getBoundingClientRect().width - 20) / sourceImage.width;
        drawRasterLayers(canvasRef, sourceImage, layers.keyweight, layers, scalingFactor);
    }

    return (
        <div className="card" ref={previewRef}>
            <div className="card-header">
                {"Preview"}
            </div>
            <div className="card-body d-flex justify-content-center">
                <canvas ref={canvasRef}></canvas>
            </div>
        </div >
    )
}

export default Preview;