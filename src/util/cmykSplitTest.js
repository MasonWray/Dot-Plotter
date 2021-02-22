function drawRasterLayers(outputCanvasRef, image, keyweight, layerVis, scalingFactor) {

    // Clear the preview canvas and set it to the correct size
    var canvas = outputCanvasRef.current;
    var context = canvas.getContext("2d");
    canvas.height = image.height;
    canvas.width = image.width;
    context.drawImage(image, 0, 0)

    // Get ImageData for per-pixel editing
    var imgd = context.getImageData(0, 0, image.width, image.height);
    var src = [...imgd.data];
    var pix = imgd.data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
        // get pixel values
        var R = src[i + 0] / 255;
        var G = src[i + 1] / 255;
        var B = src[i + 2] / 255;

        var K = 1 - Math.max(R, G, B);
        var C = (1 - R - K) / (1 - K);
        var M = (1 - G - K) / (1 - K);
        var Y = (1 - B - K) / (1 - K);

        // Start with white paper
        pix[i + 0] = 255; // red
        pix[i + 1] = 255; // green
        pix[i + 2] = 255; // blue
        pix[i + 3] = 255; // alpha

        // Paint cyan plate
        if (layerVis.cyan) {
            pix[i + 0] = pix[i + 0] - (255 * C)
        }

        // Paint magenta plate
        if (layerVis.magenta) {
            pix[i + 1] = pix[i + 1] - (255 * M)
        }

        // Paint yellow plate
        if (layerVis.yellow) {
            pix[i + 2] = pix[i + 2] - (255 * Y)
        }

        // Paint black plate
        if (layerVis.black) {
            pix[i + 0] = pix[i + 0] - (255 * K)
            pix[i + 1] = pix[i + 1] - (255 * K)
            pix[i + 2] = pix[i + 2] - (255 * K)
        }

    }

    // // Scale preview to card size
    var imageObject = new Image();
    context.putImageData(imgd, 0, 0);

    imageObject.onload = () => {
        canvas.height = image.height * scalingFactor;
        canvas.width = image.width * scalingFactor;
        context.scale(scalingFactor, scalingFactor)
        context.drawImage(imageObject, 0, 0);
    }
    imageObject.src = canvas.toDataURL();
}

export default drawRasterLayers;