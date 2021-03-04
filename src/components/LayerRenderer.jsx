import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import renderVectorLayer from '../util/renderVectorLayer';
import renderRasterLayer from '../util/renderRasterLayer';
// import pack from '../util/pack';
import ACTIONS from '../redux/actions';

function LayerRenderer() {
    const layers = useSelector((state) => state.Layers.map((layer, index) => { return index }));

    // Package gcode into ZIP
    // useEffect(() => { pack(layers, dispatch) })

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
    const settings = useSelector((state) => state.OutputSettings);
    const layer = useSelector((state) => state.Layers[props.id])
    const rasterLayerRef = useRef();
    const vectorPreviewRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!layer.raster_ref) {
            dispatch({ type: ACTIONS.SET_RASTER_REF, payload: { id: props.id, ref: rasterLayerRef } });
        }
        if (!layer.vector_ref) {
            dispatch({ type: ACTIONS.SET_VECTOR_REF, payload: { id: props.id, ref: vectorPreviewRef } })
        }
    })

    useEffect(() => {
        const data = {
            source: source,
            name: layer.name,
            id: props.id,
            color: { r: layer.color.r, g: layer.color.g, b: layer.color.b },
            mapper: layer.mapper
        }
        renderRasterLayer(data, rasterLayerRef, dispatch)
    }, [source, layer.name, props.id, layer.color, layer.mapper, dispatch])

    useEffect(() => {
        const data = {
            raster: layer.raster,
            name: layer.name,
            color: { r: layer.color.r, g: layer.color.g, b: layer.color.b },
            id: props.id,
            settings: settings
        }
        renderVectorLayer(data, vectorPreviewRef, dispatch);
    }, [layer.raster, layer.name, props.id, layer.color, settings, dispatch])

    return (<span><canvas ref={rasterLayerRef} hidden={true} /><canvas ref={vectorPreviewRef} hidden={false} /></span>);
}

export default LayerRenderer;