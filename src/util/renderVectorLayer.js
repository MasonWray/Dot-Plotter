import ACTIONS from '../redux/actions';

/* eslint-disable import/no-webpack-loader-syntax */
// import PointsWorker from 'worker-loader!../workers/PointsWorker';

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

        // console.log('spawning worker from renderer')
        // const worker = new PointsWorker()
        // worker.onmessage = (e) => { console.log(e.data) }
        // worker.postMessage({ pix: pix, width: canvas.width, diameter: layer.settings.toolDiameter })

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

export default renderVectorLayer;