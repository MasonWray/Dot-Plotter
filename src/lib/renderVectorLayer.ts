import ImageProcessingException from '@/defs/ImageProdessingException';
import { SourceImageData } from '@/redux/slices/dataSlice';
import { LayerData } from '@/redux/slices/layerSlice';
import { RefObject } from 'react';
import { getImageFromDataUri } from './getImageFromDataUri';
import { OutputState } from '@/redux/slices/outputSlice';
import { getDataUriFromSvg } from './getDataUriFromSvg';

export async function renderVectorLayer(layer: LayerData, canvasRef: RefObject<HTMLCanvasElement>, sourceImage: SourceImageData, setup: OutputState) {
    console.log(`Rendering vector layer `);
    // Clear canvas and set it to the size of the source image
    const canvas = canvasRef.current;
    if (!canvas) { throw new ImageProcessingException('Scratch canvas was null.'); }
    const context = canvas.getContext('2d', {});
    if (!context) { throw new ImageProcessingException('Canvas context was null.'); }
    if (!layer.raster) { throw new ImageProcessingException('Layer contained no raster data.'); }
    canvas.height = Math.round(setup.stockHeight / setup.toolDiameter);
    canvas.width = Math.round(setup.stockWidth / setup.toolDiameter);
    context.scale(canvas.width / sourceImage.imageWidth, canvas.height / sourceImage.imageHeight);

    // Get pixel data
    const img = await getImageFromDataUri(layer.raster);
    context.drawImage(img, 0, 0);
    const imgd = context.getImageData(0, 0, canvas.width, canvas.height);
    const pix = imgd.data;

    let svgPoints = "";
    for (var i = 0, n = pix.length; i < n; i += 4) {
        if (pix[i + 3] > Math.floor(Math.random() * Math.floor(255))) {
            // Get x,y coordinates of pixel in paper space
            var x = (i / 4) % setup.stockWidth;
            var y = Math.floor((i / 4) / setup.stockWidth);
            x = Math.round((x * setup.toolDiameter) * 10000) / 10000;
            y = Math.round((y * setup.toolDiameter) * 10000) / 10000;
            
            // Draw dot on SVG preview
            svgPoints = svgPoints + `<circle cx="${x}" cy="${y}" r="${setup.toolDiameter}" fill="rgba(${layer.color.r}, ${layer.color.g}, ${layer.color.b}, 64)" />`;
        }
    }

    const svg = `<svg width="${setup.stockWidth}" height="${setup.stockHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">${svgPoints}</svg>`;

    return await getDataUriFromSvg(canvasRef, svg);
}