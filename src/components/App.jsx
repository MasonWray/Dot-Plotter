import FileSelector from './FileSelector';
import Layers from './Layers';
import Preview from './Preview';
import OutputSettings from './OutputSettings';

import LayerRenderer from './LayerRenderer';

import pkg from '../../package.json';

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-brand">Dot Plotter</div>
                    <div className="d-flex">
                        <div className="nav-item">
                            <div className="nav-link btn-group">
                                <button className="btn btn-outline-secondary btn-sm" disabled={true}>{pkg.version}</button>
                                <a href="https://github.com/MasonWray/Dot-Plotter" className="btn btn-outline-secondary btn-sm"> View on GitHub</a>
                            </div>
                        </div>
                    </div>
                </div >
            </nav >
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
            <LayerRenderer />
        </div>
    );
}

export default App;