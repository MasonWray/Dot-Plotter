import React, { useState, useLayoutEffect, useRef } from 'react';

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

function drawRasterLayers(outputCanvasRef, imageData, keyweight, layerVis, scalingFactor) {

    // Clear the preview canvas and set it to the correct size
    var canvas = outputCanvasRef.current;
    var context = canvas.getContext("2d");
    canvas.height = imageData.height;
    canvas.width = imageData.width;

    // Get ImageData for per-pixel editing
    var imgd = context.getImageData(0, 0, imageData.width, imageData.height);
    var pix = imgd.data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
        // Calcualte key weight
        var m = Math.max(imageData.pix[i + 0], imageData.pix[i + 1], imageData.pix[i + 2])

        // Start with white paper
        pix[i + 0] = 255; // red
        pix[i + 1] = 255; // green
        pix[i + 2] = 255; // blue
        pix[i + 3] = 255; // alpha

        // Paint cyan plate
        if (layerVis.cyan) {
            pix[i + 0] = pix[i + 0] - (255 - imageData.pix[i + 0])
            pix[i + 0] = pix[i + 0] + (255 - m) * keyweight
        }

        // Paint magenta plate
        if (layerVis.magenta) {
            pix[i + 1] = pix[i + 1] - (255 - imageData.pix[i + 1])
            pix[i + 1] = pix[i + 1] + (255 - m) * keyweight
        }

        // Paint yellow plate
        if (layerVis.yellow) {
            pix[i + 2] = pix[i + 2] - (255 - imageData.pix[i + 2])
            pix[i + 2] = pix[i + 2] + (255 - m) * keyweight
        }

        // Paint black plate
        if (layerVis.black) {
            pix[i + 0] = pix[i + 0] - (255 - m) * keyweight
            pix[i + 1] = pix[i + 1] - (255 - m) * keyweight
            pix[i + 2] = pix[i + 2] - (255 - m) * keyweight
        }
    }

    // Scale preview to card size
    var imageObject = new Image();
    context.putImageData(imgd, 0, 0);

    imageObject.onload = () => {
        canvas.height = imageData.height * scalingFactor;
        canvas.width = imageData.width * scalingFactor;
        context.scale(scalingFactor, scalingFactor)
        context.drawImage(imageObject, 0, 0);
        // drawVectorLayers(outputCanvasRef);
    }
    imageObject.src = canvas.toDataURL();
}

function Preview(props) {
    const previewRef = useRef();

    // Depend on size of preview card
    useElementSize(previewRef);

    // Draw preview on canvas if necessary data is available
    if (props.canvasRef && props.imageData && previewRef) {
        var scalingFactor = (previewRef.current.getBoundingClientRect().width - 20) / props.imageData.width;
        drawRasterLayers(props.canvasRef, props.imageData, props.layerData.keyweight, props.layerData.visibility, scalingFactor);
    }

    return (
        <div className="card" ref={previewRef}>
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