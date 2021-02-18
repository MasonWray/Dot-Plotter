import React from 'react';

function VectorOverlay(props) {

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
                            <input
                                type="number"
                                className="form-control"
                                disabled={!props.image}
                                value={props.vectorData.width}
                                onChange={(e) => {
                                    props.setVectorData({
                                        width: e.target.value,
                                        height: (props.image.height / props.image.width * e.target.value),
                                        toolDiameter: props.vectorData.toolDiameter
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Stock Height (mm)</label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                disabled={!props.image}
                                value={props.vectorData.height}
                                onChange={(e) => {
                                    props.setVectorData({
                                        width: (props.image.width / props.image.height * e.target.value),
                                        height: e.target.value,
                                        toolDiameter: props.vectorData.toolDiameter
                                    })
                                }}
                            />
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Tool Diameter (mm)</label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                value={props.vectorData.toolDiameter}
                                onChange={(e) => {
                                    props.setVectorData({
                                        width: props.vectorData.width,
                                        height: props.vectorData.height,
                                        toolDiameter: (e.target.value < 0 ? 0 : e.target.value)
                                    })
                                }}
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default VectorOverlay;