import ACTIONS from '../redux/actions';
import JSZip from 'jszip';

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

export default pack;