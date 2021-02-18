import React from "react";

function VectorOverlay() {
    return (
        <div className="card">
            <div className="card-header">Vector Overlay</div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="row mb-2">
                        <div className="col">
                            <label className="form-label">Stock Width (mm)</label>
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Stock Height (mm)</label>
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" />
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Tool Diameter (mm)</label>
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default VectorOverlay;