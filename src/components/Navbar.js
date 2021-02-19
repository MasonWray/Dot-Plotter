import React from 'react';

import pkg from '../../package.json';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand" href="#">Dot Plotter</div>
                <div className="d-flex">
                    <div className="nav-item">
                        <div className="nav-link btn-group">
                            <button className="btn btn-outline-secondary btn-sm" disabled={true}>{pkg.version}</button>
                            <a href="https://github.com/MasonWray/Dot-Plotter" className="btn btn-outline-secondary btn-sm"> View on GitHub</a>
                        </div>
                    </div>
                    {/* <div className="nav-item">
                        <div className="nav-link">
                            <button className="btn btn-outline-primary btn-sm" disabled={true}>{pkg.version}</button>
                        </div>
                    </div>
                    <div className="nav-item">
                        <div className="nav-link">
                            <a href="https://github.com/MasonWray/Dot-Plotter" className="btn btn-outline-secondary btn-sm"> View on GitHub</a>
                        </div>
                    </div> */}
                </div>
            </div >

        </nav >
    );
}

export default Navbar;