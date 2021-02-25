import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ACTIONS from '../redux/actions';

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
                />
            )
        })
    );
}

function Layer(props) {
    const ref = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const layer = {
            source: props.source,
            name: props.name,
            id: props.id,
            color: { r: props.color.r, g: props.color.g, b: props.color.b },
            mapper: props.mapper
        }
        renderRasterLayer(layer, ref, dispatch)
    }, [props.source, props.name, props.id, props.color, props.mapper, dispatch])

    useEffect(() => {
        const layer = {

        }
        renderVectorLayer(layer, ref, dispatch);
    })

    return (<canvas ref={ref} hidden={true} />);
}

function renderVectorLayer() {

}

function renderRasterLayer(layer, ref, dispatch) {
    if (layer.source) {
        console.log("Rendering: ", layer.name)
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
            dispatch({ type: ACTIONS.SET_LAYER_RASTER, payload: { id: layer.id, raster: image } })
        }
        image.src = canvas.toDataURL();
    }
}

export default LayerRenderer;