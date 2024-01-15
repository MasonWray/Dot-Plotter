'use client'

import { getImageFromDataUri } from '@/lib/getImageFromDataUri';
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function Preview() {
    const previewRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const layers = useAppSelector(state => state.layers.data);
    const imageData = useAppSelector(state => state.data.sourceImage);
    const setup = useAppSelector(state => state.output);

    const [size, setSize] = useState({ w: 0, h: 0 });

    useLayoutEffect(() => {
        function updateDims() {
            if (previewRef.current) {
                setSize({ w: previewRef.current.offsetWidth, h: previewRef.current.offsetHeight });
            }
        }

        window.addEventListener('resize', updateDims);
        updateDims();
        return () => window.removeEventListener('resize', updateDims);
    }, [previewRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) { return; }
        const context = canvas.getContext("2d");
        if (!context || !imageData || !previewRef.current) { return; }

        // Set canvas size based on preview window width and source size
        canvas.width = Math.round(previewRef.current.getBoundingClientRect().width - 20);
        canvas.height = Math.round(canvas.width * imageData.imageHeight / imageData.imageWidth);

        // Draw raster previews
        layers.forEach((layer) => {
            if (layer.raster && layer.raster_visible) {
                getImageFromDataUri(layer.raster)
                    .then(img => {
                        context.save()
                        context.scale(canvas.width / imageData.imageWidth, canvas.height / imageData.imageHeight)
                        context.drawImage(img, 0, 0);
                        context.restore()
                    });
            }
        })

        // Draw vector Layers
        layers.forEach((layer) => {
            if (layer.vector && layer.vector_visible) {
                getImageFromDataUri(layer.vector)
                    .then(img => {
                        console.log(img.width, img.height)
                        context.save()
                        context.scale(canvas.width / setup.stockWidth, canvas.height / setup.stockHeight)
                        context.drawImage(img, 0, 0);
                        context.restore()
                    });
            }
        })
    }, [imageData, layers, size, setup]);

    return (
        <div className="card" ref={previewRef}>
            <div className="card-header">
                {"Preview"}
            </div>
            <div className="card-body d-flex justify-content-center">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}