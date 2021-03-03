import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JSZip from 'jszip';

import ACTIONS from '../redux/actions';
async function pack(layers, dispatch) {
    // Determine if all gcode has been generated
    var ready = true;
    for (var i = 0; i < layers.length; i++) {
        if (!layers[i].gcode) { ready = false }
    }
    if (ready) {
        // Create ZIP container and add files
        var zip = new JSZip();
        layers.forEach((layer) => { zip.file(`${layer.name}.gcode`, layer.gcode) })

        // Create a BLOB from the container and send to output state
        var pkg = await zip.generateAsync({ type: "blob" })
        const fileDownloadUrl = URL.createObjectURL(pkg);
        dispatch({ type: ACTIONS.SET_DOWNLOAD_PACKAGE, payload: fileDownloadUrl })
    }
}

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

async function renderVectorLayer(layer, ref, dispatch) {
    if (layer.raster) {
        // Draw raster layer to canvas
        var canvas = ref.current;
        var context = canvas.getContext("2d");
        canvas.width = Math.round(layer.settings.stockWidth / layer.settings.toolDiameter);
        canvas.height = Math.round(layer.settings.stockHeight / layer.settings.toolDiameter);
        context.scale(canvas.width / layer.settings.sourceWidth, canvas.height / layer.settings.sourceHeight)
        context.drawImage(layer.raster, 0, 0);

        // Generate vector point data
        var imgd = context.getImageData(0, 0, canvas.width, canvas.height);
        var pix = imgd.data;
        var vector_data = {
            color: { r: layer.color.r, g: layer.color.g, b: layer.color.b },
            diameter: 0.4,
            points: []
        }

        for (var i = 0, n = pix.length; i < n; i += 4) {
            var x = (i / 4) % canvas.width;
            var y = Math.floor((i / 4) / canvas.width);

            if (pix[i + 3] > Math.floor(Math.random() * Math.floor(255))) {
                vector_data.points.push({
                    x: x * layer.settings.toolDiameter,
                    y: y * layer.settings.toolDiameter
                })
            }
        }
        dispatch({ type: ACTIONS.SET_LAYER_DATA, payload: { id: layer.id, vector_data: vector_data } })

        // Generate vector preview image
        canvas.width = layer.settings.stockWidth;
        canvas.height = layer.settings.stockHeight;
        var angle = Math.PI * 2;
        context.fillStyle = `rgba(${vector_data.color.r}, ${vector_data.color.g}, ${vector_data.color.b}, 64)`;
        for (var p = 0; p < vector_data.points.length; p++) {
            var point = vector_data.points[p];
            context.beginPath();
            context.arc(point.x, point.y, layer.settings.toolDiameter, 0, angle)
            context.fill();
            context.closePath();
        }
        var image = new Image();
        image.onload = () => {
            console.log("Rendered Vector: ", layer.name)
            dispatch({ type: ACTIONS.SET_LAYER_VECTOR, payload: { id: layer.id, vector: image } })
        }
        image.src = canvas.toDataURL();

        //Generate GCODE
        var gcode = `G28\nG0 X0 Y0 Z${layer.settings.heightTravel} F${layer.settings.feedrateTravel}\n`;
        var down = `G1 Z${layer.settings.heightPlunge} F${layer.settings.feedratePlunge}\n`;
        var up = `G0 Z${layer.settings.heightTravel} F${layer.settings.feedrateTravel}\n`;
        for (var g = 0; g < vector_data.points.length; g++) {
            var gpoint = vector_data.points[g];
            var move = `G0 X${Math.round(gpoint.x * 1000) / 1000} Y${Math.round((layer.settings.stockHeight - gpoint.y) * 1000) / 1000} F${layer.settings.feedrateTravel}\n`;
            gcode = gcode + move + down + up;
        }
        dispatch({ type: ACTIONS.SET_LAYER_GCODE, payload: { id: layer.id, gcode: gcode } })
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
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i + 0] = layer.color.r; // red
            pix[i + 1] = layer.color.g; // green
            pix[i + 2] = layer.color.b; // blue
            pix[i + 3] = 255 * layer.mapper(src[i + 0], src[i + 1], src[i + 2]); // alpha
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