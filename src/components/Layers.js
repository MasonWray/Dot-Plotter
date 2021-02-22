import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ACTIONS from '../redux/actions';

function Layers(props) {
    const layers = useSelector((state) => state.Layers);
    const dispatch = useDispatch();
    return (
        <div className="card">
            <div className="card-header">
                {"Layers"}
            </div>

            <ul className="list-group list-group-flush">
                <Layer
                    name="Cyan"
                    visible={layers.cyan}
                    onClick={() => { dispatch({ type: ACTIONS.TOGGLE_RASTER_LAYER_CYAN }) }}
                />
                <Layer
                    name="Magenta"
                    visible={layers.magenta}
                    onClick={() => { dispatch({ type: ACTIONS.TOGGLE_RASTER_LAYER_MAGENTA }) }}
                />
                <Layer
                    name="Yellow"
                    visible={layers.yellow}
                    onClick={() => { dispatch({ type: ACTIONS.TOGGLE_RASTER_LAYER_YELLOW }) }}
                />
                <Layer
                    name="Black"
                    visible={layers.black}
                    onClick={() => { dispatch({ type: ACTIONS.TOGGLE_RASTER_LAYER_BLACK }) }}
                />
            </ul>
            <div className="card-footer">
                <label className="form-label">{`Key Weight: ${layers.keyweight * 100}%`}</label>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={(e) => { dispatch({ type: ACTIONS.SET_KEYWEIGHT, payload: e.target.value }) }}
                />
            </div>
        </div>
    )
}

function Layer(props) {
    if (props.visible) {
        return (
            <li className="list-group-item">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                    onClick={props.onClick}>
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
                <label className="float-right">{props.name}</label>
            </li>
        )
    }
    else {
        return (
            <li className="list-group-item">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                    onClick={props.onClick}>
                    <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.027 7.027 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.088z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.707z" />
                </svg>
                <label className="float-right">{props.name}</label>
            </li>
        )
    }
}

export default Layers;