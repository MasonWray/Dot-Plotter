import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import renderRasterLayer from '../util/renderRasterLayer';
import ACTIONS from '../redux/actions';

function LayerRenderer() {
    const layers = useSelector((state) => state.Layers.map((layer, index) => { return index }));

    return (
        layers.map((layer, index) => {
            return (
                <Layer key={index} id={index} />
            )
        })
    );
}

function Layer(props) {
    const source = useSelector((state) => state.FileSelector.sourceImage);
    const layer = useSelector((state) => state.Layers[props.id])
    const rasterLayerRef = useRef();
    const vectorPreviewRef = useRef();
    const dispatch = useDispatch();

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

    return (<span><canvas ref={rasterLayerRef} hidden={true} /><canvas ref={vectorPreviewRef} hidden={true} /></span>);
}

export default LayerRenderer;