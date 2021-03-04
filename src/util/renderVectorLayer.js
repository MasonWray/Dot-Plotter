import ACTIONS from '../redux/actions';

/* eslint-disable import/no-webpack-loader-syntax */
// import VectorWorker from 'worker-loader!../workers/VectorWorker';

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
                    x: Math.round((x * layer.settings.toolDiameter) * 10000) / 10000,
                    y: Math.round((y * layer.settings.toolDiameter) * 10000) / 10000
                })
            }
        }

        // Generate vector preview without canvas
        var svgPoints = "";

        var gcode = `G28\nG0 X0 Y0 Z${layer.settings.heightTravel} F${layer.settings.feedrateTravel}\n`;
        var down = `G1 Z${layer.settings.heightPlunge} F${layer.settings.feedratePlunge}\n`;
        var up = `G0 Z${layer.settings.heightTravel} F${layer.settings.feedrateTravel}\n`;

        for (var p = 0; p < vector_data.points.length; p++) {
            var point = vector_data.points[p];
            svgPoints = svgPoints + `<circle cx="${point.x}" cy="${point.y}" r="${layer.settings.toolDiameter}" fill="rgba(${vector_data.color.r}, ${vector_data.color.g}, ${vector_data.color.b}, 64)" />`;
            var move = `G0 X${point.x} Y${layer.settings.stockHeight - point.y} F${layer.settings.feedrateTravel}\n`;
            gcode = gcode + move + down + up;
        }
        dispatch({ type: ACTIONS.SET_LAYER_GCODE, payload: { id: layer.id, gcode: gcode } })

        var svg = `<svg width="${layer.settings.stockWidth}" height="${layer.settings.stockHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">${svgPoints}</svg>`
        var image = new Image();
        image.onload = () => {
            console.log("Rendered Vector: ", layer.name)
            dispatch({ type: ACTIONS.SET_LAYER_VECTOR, payload: { id: layer.id, vector: image } })
        }
        image.src = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svg);
    }
}

export default renderVectorLayer;