import React, { useState } from 'react';

import FileSelector from './FileSelector';
import Layers from './Layers';
import Preview from './Preview';
import VectorOverlay from './VectorOverlay';

function Body() {
    // Source file
    const [image, setImage] = useState();

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
                        setImage={(i) => setImage(i)}
                    />

                    <Layers
                        layerData={layerData}
                        setLayerData={(l) => setLayerData(l)}
                    />
                </div>
                {/* Preview Area */}
                <div className="col-sm-6">
                    <Preview
                        image={image}
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