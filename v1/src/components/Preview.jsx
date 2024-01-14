import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useElementSize from '../util/useElementSize';

function Preview() {
    const previewRef = useRef();
    const canvasRef = useRef();

    const layers = useSelector((state) => state.Layers);
    const sourceImage = useSelector((state) => state.FileSelector.sourceImage);
    const settings = useSelector((state) => state.OutputSettings);

    // Depend on size of preview card
    const size = useElementSize(previewRef);

    useEffect(() => {
        var canvas = canvasRef.current;
        var context = canvas.getContext("2d");
        if (sourceImage) {
            // Set canvas size based on preview window width and source size
            canvas.width = Math.round(previewRef.current.getBoundingClientRect().width - 20);
            canvas.height = Math.round(canvas.width * settings.sourceHeight / settings.sourceWidth);

            // Draw raster previews
            layers.forEach((layer) => {
                if (layer.raster && layer.raster_visible) {
                    context.save()
                    context.scale(canvas.width / layer.raster.width, canvas.height / layer.raster.height)
                    context.drawImage(layer.raster, 0, 0);
                    context.restore()
                }
            })

            // Draw vector Layers
            layers.forEach((layer) => {
                if (layer.vector && layer.vector_visible) {
                    context.save()
                    context.scale(canvas.width / layer.vector.width, canvas.height / layer.vector.height)
                    context.drawImage(layer.vector, 0, 0);
                    context.restore()
                }
            })
        }
    }, [settings.sourceWidth, settings.sourceHeight, sourceImage, layers, size])

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