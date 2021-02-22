import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ACTIONS from '../redux/actions';

function OutputSettings(props) {
    const image = useSelector((state) => state.FileSelector.sourceImage);
    const settings = useSelector((state) => state.OutputSettings);
    const dispatch = useDispatch();
    return (
        <div className="card">
            <div className="card-header">Output Settings</div>
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
                                disabled={!image}
                                value={settings.stockWidth}
                                onChange={(e) => {
                                    dispatch({
                                        type: ACTIONS.SET_OUTPUT_WIDTH,
                                        payload: { value: e.target.value, width: image.width, height: image.height }
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
                                disabled={!image}
                                value={settings.stockHeight}
                                onChange={(e) => {
                                    dispatch({
                                        type: ACTIONS.SET_OUTPUT_HEIGHT,
                                        payload: { value: e.target.value, width: image.width, height: image.height }
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
                                value={settings.toolDiameter}
                                onChange={(e) => { dispatch({ type: ACTIONS.SET_OUTPUT_TOOL_DIAMETER, payload: e.target.value }) }}
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default OutputSettings;