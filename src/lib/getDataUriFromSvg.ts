import ImageProcessingException from '@/defs/ImageProdessingException';
import { RefObject } from 'react';
import { getImageFromDataUri } from './getImageFromDataUri';

export async function getDataUriFromSvg(canvasRef: RefObject<HTMLCanvasElement>, svgData: string) {
    const canvas = canvasRef.current;
    if (!canvas) { throw new ImageProcessingException('Scratch canvas was null.'); }
    const context = canvas.getContext('2d');
    if (!context) { throw new ImageProcessingException('Canvas context was null.'); }


    const imgData = URL.createObjectURL(
        new Blob([svgData], {
            type: 'image/svg+xml;charset=utf8'
        })
    );

    const img = await getImageFromDataUri(imgData);

    canvas.width = img.width;
    canvas.height = img.height;

    context.drawImage(img, 0, 0);
    return canvas.toDataURL();
}