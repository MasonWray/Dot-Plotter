import ImageProcessingException from '@/defs/ImageProdessingException';
import { SourceImageData } from '@/redux/slices/dataSlice';
import { ColorChannel, LayerData } from '@/redux/slices/layerSlice';
import { RefObject } from 'react';
import { getImageFromDataUri } from './getImageFromDataUri';
import { RgbToCmyk } from './RbgToCmyk';

export async function renderRasterLayer(layer: LayerData, canvasRef: RefObject<HTMLCanvasElement>, sourceImage: SourceImageData) {
    // Clear canvas and set it to the size of the source image
    const canvas = canvasRef.current;
    if (!canvas) { throw new ImageProcessingException('Scratch canvas was null.'); }
    const context = canvas.getContext('2d');
    if (!context) { throw new ImageProcessingException('Canvas context was null.'); }
    canvas.height = sourceImage.imageHeight;
    canvas.width = sourceImage.imageWidth;

    // Get ImageData for per-pixel editing
    const img = await getImageFromDataUri(sourceImage.imageData);
    context.drawImage(img, 0, 0);
    const imgd = context.getImageData(0, 0, sourceImage.imageWidth, sourceImage.imageHeight);
    var pix = imgd.data;

    // Update pixels with mapper function
    for (var i = 0, n = pix.length; i < n; i += 4) {
        const alpha = getAlphaByChannel(pix[i + 0], pix[i + 1], pix[i + 2], layer.channel);
        pix[i + 0] = layer.color.r; // red
        pix[i + 1] = layer.color.g; // green
        pix[i + 2] = layer.color.b; // blue
        pix[i + 3] = alpha // alpha
    }
    context.putImageData(imgd, 0, 0);

    const result = canvas.toDataURL();
    return result;
}

function getAlphaByChannel(r: number, g: number, b: number, channel: ColorChannel) {
    const { C, M, Y, K } = RgbToCmyk(r, g, b);
    switch (channel) {
        case ColorChannel.C: return C * 255;
        case ColorChannel.M: return M * 255;
        case ColorChannel.Y: return Y * 255;
        case ColorChannel.K: return K * 255;
    }
}