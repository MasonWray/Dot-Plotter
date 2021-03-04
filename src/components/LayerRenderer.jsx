import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import renderVectorLayer from '../util/renderVectorLayer';
import renderRasterLayer from '../util/renderRasterLayer';
import pack from '../util/pack';

function LayerRenderer() {
    const layers = useSelector((state) => state.Layers)
    const source = useSelector((state) => state.FileSelector.sourceImage);
    const dispatch = useDispatch();

    // Package gcode into ZIP
    useEffect(() => { pack(layers, dispatch) })

    return (
        layers.map((layer, index) => {
            return (
                <Layer
                    key={index}
                    id={index}
                    name={layer.name}
                    color={layer.color}
                    mapper={layer.mapper}
                    source={source}
                    raster={layer.raster}
                />
            )
        })
    );
}

function Layer(props) {
    const rasterLayerRef = useRef();
    const vectorPreviewRef = useRef();
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.OutputSettings);

    useEffect(() => {
        const layer = {
            source: props.source,
            name: props.name,
            id: props.id,
            color: { r: props.color.r, g: props.color.g, b: props.color.b },
            mapper: props.mapper
        }
        renderRasterLayer(layer, rasterLayerRef, dispatch)
    }, [props.source, props.name, props.id, props.color, props.mapper, dispatch])

    useEffect(() => {
        const layer = {
            raster: props.raster,
            name: props.name,
            color: { r: props.color.r, g: props.color.g, b: props.color.b },
            id: props.id,
            settings: settings
        }
        renderVectorLayer(layer, vectorPreviewRef, dispatch);
    }, [props.raster, props.name, props.id, props.color, settings, dispatch])

    return (<span><canvas ref={rasterLayerRef} hidden={true} /><canvas ref={vectorPreviewRef} hidden={true} /></span>);
}

export default LayerRenderer;