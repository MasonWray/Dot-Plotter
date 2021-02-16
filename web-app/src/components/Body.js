import React, { useState, useRef } from 'react';

import FileSelector from './FileSelector';
import Layers from './Layers';
import Preview from './Preview';
import Parameters from './Parameters';

function Body() {
    // Source file
    const [imageData, setImageData] = useState(null)
    const sendImageData = (d) => { setImageData(d) }
    const [file, setFile] = useState(null);
    const sendFile = (f) => { setFile(f) }

    // Preview canvas reference
    const canvas = useRef(null);

    // Preview canvas size setter
    const [imgSize, setSize] = useState({ width: 0, height: 0 });
    const sendSize = (s) => { setSize(s) }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar */}
                <div className="col-sm-3">
                    <FileSelector
                        file={file}
                        canvas={canvas}
                        setFile={sendFile}
                        sendImageData={sendImageData}
                    />

                    <Layers
                        file={file}
                        canvas={canvas}
                        setSize={sendSize}
                        imageData={imageData}
                    />
                </div>
                {/* Preview Area */}
                <div className="col-sm-6">
                    <Preview
                        canvasRef={canvas}
                        size={imgSize}
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