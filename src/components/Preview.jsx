import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useElementSize from '../util/useElementSize';

function Preview() {
    const previewRef = useRef();
    const canvasRef = useRef();

    const layers = useSelector((state) => state.Layers);
    const sourceImage = useSelector((state) => state.FileSelector.sourceImage);

    // Depend on size of preview card
    useElementSize(previewRef);

    useEffect(() => {
        var canvas = canvasRef.current;
        var context = canvas.getContext("2d");
        if (sourceImage) {
            var scalingFactor = (previewRef.current.getBoundingClientRect().width - 20) / sourceImage.width;
            canvas.height = sourceImage.height * scalingFactor;
            canvas.width = sourceImage.width * scalingFactor;
            context.scale(scalingFactor, scalingFactor)
            layers.forEach((layer) => {
                // Draw raster layer
                if (layer.raster && layer.raster_visible) {
                    context.drawImage(layer.raster, 0, 0);
                }

                // Draw vector layer from preview image
                if (layer.vector && layer.vector_visible) {
                    context.drawImage(layer.vector, 0, 0);
                }
            })
        }
    })

    return (
        <div className="card" ref={previewRef}>
            <div className="card-header">
                {"Preview"}
            </div>
            <div className="card-body d-flex justify-content-center">
                <canvas ref={canvasRef} ></canvas>
            </div>
        </div >
    )
}

export default Preview;