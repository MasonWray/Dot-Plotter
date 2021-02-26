import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ACTIONS from '../redux/actions';
import sleep from '../util/sleep';

function LayerRenderer() {
    const layers = useSelector((state) => state.Layers)
    const source = useSelector((state) => state.FileSelector.sourceImage);
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
            // source: props.source,
            raster: props.raster,
            name: props.name,
            color: { r: props.color.r, g: props.color.g, b: props.color.b },
            id: props.id
        }
        renderVectorLayer(layer, vectorPreviewRef, dispatch);
    }, [props.raster, props.name, props.id, props.color, dispatch])

    return (<span><canvas ref={rasterLayerRef} hidden={true} /><canvas ref={vectorPreviewRef} hidden={true} /></span>);
}

async function renderVectorLayer(layer, ref, dispatch) {
    if (layer.raster) {
        // Draw raster layer to canvas
        var canvas = ref.current;
        var context = canvas.getContext("2d");
        canvas.height = layer.raster.height;
        canvas.width = layer.raster.width;
        context.drawImage(layer.raster, 0, 0);

        // Generate vector point data
        var imgd = context.getImageData(0, 0, layer.raster.width, layer.raster.height);
        var pix = imgd.data;
        var vector_data = {
            color: { r: layer.color.r, g: layer.color.g, b: layer.color.b },
            diameter: 0.4,
            points: []
        }
        var lastDataProg;
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var x = (i / 4) % canvas.width;
            var y = Math.floor((i / 4) / canvas.width);

            var point = {
                x: x,
                y: y
            }

            if (pix[i + 3] > Math.floor(Math.random() * Math.floor(255))) {
                vector_data.points.push(point)
            }
            var dataProgNow = Math.round(i / pix.length * 10) * 10;
            if (lastDataProg !== dataProgNow) {
                lastDataProg = dataProgNow;
                dispatch({ type: ACTIONS.UPDATE_DATA_PROGRESS, payload: { id: layer.id, progress: dataProgNow } })
                await sleep(1)
            }
        }
        dispatch({ type: ACTIONS.SET_LAYER_DATA, payload: { id: layer.id, vector_data: vector_data } })

        // Generate vector preview image
        canvas.height = layer.raster.height;
        canvas.width = layer.raster.width;
        var angle = Math.PI * 2;
        context.fillStyle = `rgb(${vector_data.color.r}, ${vector_data.color.g}, ${vector_data.color.b})`;
        var lastVectorProg;
        for (var p = 0; p < vector_data.points.length; p++) {
            var vpoint = vector_data.points[p];
            context.beginPath();
            context.arc(vpoint.x, vpoint.y, 0.4, 0, angle)
            context.fill();
            context.closePath();
            var vectorProgNow = Math.round(i / pix.length * 10) * 10;
            if (lastVectorProg !== vectorProgNow) {
                lastVectorProg = vectorProgNow;
                dispatch({ type: ACTIONS.UPDATE_VECTOR_PROGRESS, payload: { id: layer.id, progress: vectorProgNow } })
                await sleep(1)
            }
        }
        var image = new Image();
        image.onload = () => {
            console.log("Rendered Vector: ", layer.name)
            dispatch({ type: ACTIONS.SET_LAYER_VECTOR, payload: { id: layer.id, vector: image } })
        }
        image.src = canvas.toDataURL();
    }
}

async function renderRasterLayer(layer, ref, dispatch) {
    if (layer.source) {
        // Clear canvas and set it to the size of the source image
        var canvas = ref.current;
        var context = canvas.getContext("2d");
        canvas.height = layer.source.height;
        canvas.width = layer.source.width;
        context.drawImage(layer.source, 0, 0)

        // Get ImageData for per-pixel editing
        var imgd = context.getImageData(0, 0, layer.source.width, layer.source.height);
        var src = [...imgd.data];
        var pix = imgd.data;

        // Update pixels with mapper function
        var lastRasterProg;
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i + 0] = layer.color.r; // red
            pix[i + 1] = layer.color.g; // green
            pix[i + 2] = layer.color.b; // blue
            pix[i + 3] = 255 * layer.mapper(src[i + 0], src[i + 1], src[i + 2]); // alpha
            var rasterProgNow = Math.round(i / pix.length * 10) * 10;
            if (lastRasterProg !== rasterProgNow) {
                lastRasterProg = rasterProgNow;
                dispatch({ type: ACTIONS.UPDATE_RASTER_PROGRESS, payload: { id: layer.id, progress: rasterProgNow } })
                await sleep(1)
            }
        }
        context.putImageData(imgd, 0, 0);

        // Update layer data in redux store
        var image = new Image();
        image.onload = () => {
            console.log("Rendered Raster: ", layer.name)
            dispatch({ type: ACTIONS.SET_LAYER_RASTER, payload: { id: layer.id, raster: image } })
        }
        image.src = canvas.toDataURL();
    }
}

export default LayerRenderer;