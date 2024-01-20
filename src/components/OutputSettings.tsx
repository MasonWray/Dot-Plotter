'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setFeedratePlunge, setFeedrateTravel, setHeightPlunge, setHeightTravel, setOutputSize, setToolDiameter } from '@/redux/slices/outputSlice';
import { ChangeEvent, useRef, useState } from 'react';

export function OutputSettings() {
    const settings = useAppSelector(state => state.output);
    const dispatch = useAppDispatch();
    const download = useRef<HTMLAnchorElement>(null);
    const { imageHeight, imageWidth } = useAppSelector(state => state.data.sourceImage) ?? { imageHeight: 0, imageWidth: 0 };
    const [pkg, setPkg] = useState();


    function handleRefresh() {
        // var gcode = [];

    }

    function handleDownload() {
        if (download.current) {
            download.current.click();
        }
    }

    function handleWidthChange(e: ChangeEvent<HTMLInputElement>) {
        var newWidth = Math.round(parseFloat(e.target.value) < 1 ? 1 : parseFloat(e.target.value) * 1);
        var newHeight = Math.round(newWidth * imageHeight / imageWidth);
        dispatch(setOutputSize({ w: newWidth, h: newHeight }));
    }

    function handleHeightChange(e: ChangeEvent<HTMLInputElement>) {
        var newHeight = Math.round(parseFloat(e.target.value) < 1 ? 1 : parseFloat(e.target.value) * 1);
        var newWidth = Math.round(newHeight * imageWidth / imageHeight);
        dispatch(setOutputSize({ w: newWidth, h: newHeight }));
    }

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
                                disabled={!(imageWidth > 0)}
                                value={settings.stockWidth}
                                onChange={(e) => { handleWidthChange(e) }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">{'Stock Height (mm)'}</label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                disabled={!(imageHeight > 0)}
                                value={settings.stockHeight}
                                onChange={(e) => { handleHeightChange(e) }}
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
                                step="0.1"
                                value={settings.toolDiameter}
                                onChange={(e) => dispatch(setToolDiameter(parseFloat(e.target.value)))}
                            />
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row mb-2">
                        <div className="col">
                            <label className="form-label">Travel Feedrate (mm/s)</label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                step="50"
                                value={settings.feedrateTravel}
                                onChange={(e) => dispatch(setFeedrateTravel(parseFloat(e.target.value)))}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Plunge Feedrate (mm/s)</label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                step="50"
                                value={settings.feedratePlunge}
                                onChange={(e) => dispatch(setFeedratePlunge(parseFloat(e.target.value)))}
                            />
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row mb-2">
                        <div className="col">
                            <label className="form-label">Travel Height (mm)</label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                step="0.1"
                                value={settings.heightTravel}
                                onChange={(e) => dispatch(setHeightTravel(parseFloat(e.target.value)))}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Plunge Height (mm)</label>
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                className="form-control"
                                step="0.1"
                                value={settings.heightPlunge}
                                onChange={(e) => dispatch(setHeightPlunge(parseFloat(e.target.value)))}
                            />
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col mx-4">
                            <button className="btn btn-primary w-100" onClick={handleRefresh}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                                </svg>
                            </button>
                        </div>
                        <div className="col mx-4">
                            <a
                                hidden={true}
                                download={"output.zip"}
                                ref={download}
                                href={pkg}
                            >Download GCODE</a>
                            <button className="btn btn-primary w-100" disabled={!pkg} onClick={handleDownload}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}