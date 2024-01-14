import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import renderRasterLayer from '../util/renderRasterLayer';
import ACTIONS from '../redux/actions';

function Layers(props) {
    const layers = useSelector((state) => state.Layers.map((layer, index) => { return index; }))
    return (
        <div className="card">
            <div className="card-header">
                {"Layers"}
            </div>

            <ul className="list-group list-group-flush">
                {layers.map((layer, index) => {
                    return (
                        <Layer
                            key={index}
                            id={index}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

function Layer(props) {
    const dispatch = useDispatch();
    const rasterLayerRef = useRef();
    const vectorPreviewRef = useRef();
    const layer = useSelector((state) => state.Layers[props.id]);
    const source = useSelector((state) => state.FileSelector.sourceImage);

    useEffect(() => {
        if (!layer.vector_ref) {
            dispatch({ type: ACTIONS.SET_VECTOR_REF, payload: { id: props.id, ref: vectorPreviewRef } })
        }
    })

    useEffect(() => {
        const data = {
            source: source,
            name: layer.name,
            id: props.id,
            color: layer.color,
            mapper: layer.mapper
        }
        renderRasterLayer(data, rasterLayerRef, dispatch)
    }, [source, layer.name, props.id, layer.color, layer.mapper, dispatch])

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col">
                    <label>{layer.name}</label>
                </div>

                <div className="col" align="right">
                    <div onClick={() => { dispatch({ type: ACTIONS.TOGGLE_RASTER_VISIBILITY, payload: { id: props.id } }) }}>
                        <label className="form-label pr-2">Raster</label>
                        {visIcon(layer.raster_visible)}
                    </div>
                    <div onClick={() => { dispatch({ type: ACTIONS.TOGGLE_VECTOR_VISIBILITY, payload: { id: props.id } }) }}>
                        <label className="form-label pr-2">Vector</label>
                        {visIcon(layer.vector_visible)}
                    </div>
                </div>
            </div>
            <canvas ref={rasterLayerRef} hidden={true} /><canvas ref={vectorPreviewRef} hidden={true} />
        </li>
    )
}

function visIcon(visible) {
    if (visible) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16" height="16"
                fill="currentColor"
                className="bi bi-eye-fill mx-3"
                viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
        )
    }
    else {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye-slash-fill mx-3"
                viewBox="0 0 16 16">
                <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.027 7.027 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.088z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.707z" />
            </svg>
        )
    }
}

export default Layers;