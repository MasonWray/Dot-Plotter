import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

// import drawRasterLayers from '../util/drawRasterLayers';
import drawRasterLayers from '../util/cmykSplitTest';
import useElementSize from '../util/useElementSize';

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