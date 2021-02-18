import React, { useState, useRef } from 'react';

import FileSelector from './FileSelector';
import Layers from './Layers';
import Preview from './Preview';
import VectorOverlay from './VectorOverlay';

function Body() {
    // Source file
    const [imageData, setImageData] = useState(null)
    const sendImageData = (d) => { setImageData(d) }

    // Preview canvas reference
    const canvas = useRef();

    // Layer data
    const [layerData, setLayerData] = useState({
        keyweight: 1,
        visibility: {
            cyan: true,
            magenta: true,
            yellow: true,
            black: true
        }
    })

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar */}
                <div className="col-sm-3">
                    <FileSelector
                        canvas={canvas}
                        sendImageData={sendImageData}
                    />

                    <Layers
                        layerData={layerData}
                        setLayerData={(l) => setLayerData(l)}
                    />
                </div>
                {/* Preview Area */}
                <div className="col-sm-6">
                    <Preview
                        canvasRef={canvas}
                        imageData={imageData}
                        layerData={layerData}
                    />
                </div>
                {/* Right Sidebar */}
                <div className="col-sm-3">
                    <VectorOverlay />
                </div>
            </div>
        </div>
    )
};

export default Body;