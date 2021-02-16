import React, { useState, useRef } from 'react';

import FileSelector from './FileSelector';
import Layers from './Layers';
import Preview from './Preview';
import Parameters from './Parameters';

function Body() {
    // Source file
    const [imageData, setImageData] = useState(null)
    const sendImageData = (d) => { setImageData(d) }

    // Preview canvas reference
    const canvas = useRef(null);

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
                        canvas={canvas}
                        imageData={imageData}
                    />
                </div>
                {/* Preview Area */}
                <div className="col-sm-6">
                    <Preview
                        canvasRef={canvas}
                    />
                </div>
                {/* Right Sidebar */}
                <div className="col-sm-3">
                    <Parameters />
                </div>
            </div>
        </div>
    )
};

export default Body;