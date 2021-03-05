import ACTIONS from '../redux/actions';

/* eslint-disable import/no-webpack-loader-syntax */
import VectorWorker from 'worker-loader!../workers/VectorWorker';

function renderVectorLayer(layer, ref, dispatch) {
    return new Promise((resolve, reject) => {
        if (layer.raster) {
            // Draw raster layer to canvas
            var canvas = ref.current;
            var context = canvas.getContext("2d");
            canvas.width = Math.round(layer.settings.stockWidth / layer.settings.toolDiameter);
            canvas.height = Math.round(layer.settings.stockHeight / layer.settings.toolDiameter);
            context.scale(canvas.width / layer.settings.sourceWidth, canvas.height / layer.settings.sourceHeight)
            context.drawImage(layer.raster, 0, 0);

            // Get pixel data
            var imgd = context.getImageData(0, 0, canvas.width, canvas.height);
            var pix = imgd.data;

            // Send rendering task to separate thread
            console.log("Creating Web Worker");
            const worker = new VectorWorker()
            worker.onmessage = (e) => {
                var image = new Image();
                image.onload = () => {
                    dispatch({ type: ACTIONS.SET_LAYER_VECTOR, payload: { id: layer.id, vector: image } })
                    resolve({
                        name: e.data.name,
                        image: image,
                        gcode: e.data.gcode
                    });
                }
                image.src = e.data.image;
            }

            // Recieve result 
            worker.postMessage({
                pix: pix,
                settings: {
                    heightTravel: layer.settings.heightTravel,
                    feedrateTravel: layer.settings.feedrateTravel,
                    heightPlunge: layer.settings.heightPlunge,
                    feedratePlunge: layer.settings.feedratePlunge,
                    width: canvas.width,
                    toolDiameter: layer.settings.toolDiameter,
                    color: layer.color,
                    stockHeight: layer.settings.stockHeight,
                    stockWidth: layer.settings.stockWidth,
                    name: layer.name
                }
            })
        }
    })
}

export default renderVectorLayer;