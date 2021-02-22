import React from 'react';

import FileSelector from './FileSelector';
import Layers from './Layers';
import Preview from './Preview';
import OutputSettings from './OutputSettings';

function Body() {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar */}
                <div className="col-sm-3">
                    <FileSelector />
                    <Layers />
                </div>
                {/* Preview Area */}
                <div className="col-sm-6">
                    <Preview />
                </div>
                {/* Right Sidebar */}
                <div className="col-sm-3">
                    <OutputSettings />
                </div>
            </div>
        </div>
    )
};

export default Body;