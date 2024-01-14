'use client'

import { useAppSelector } from '@/redux/hooks';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function Preview() {
    const previewRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const layers = useAppSelector(state => state.layers.data);
    const settings = useAppSelector(state => state.output);
    const imageData = useAppSelector(state => state.data.imageData);

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
        canvas.height = Math.round(canvas.width * settings.sourceHeight / settings.sourceWidth);

        // Draw raster previews
        layers.forEach((layer) => {
            if (layer.raster && layer.raster_visible) {
                context.save()
                // TODO determine layer.raster type 
                // context.scale(canvas.width / layer.raster.width, canvas.height / layer.raster.height)
                context.drawImage(layer.raster, 0, 0);
                context.restore()
            }
        })

        // Draw vector Layers
        layers.forEach((layer) => {
            if (layer.vector && layer.vector_visible) {
                context.save()
                // TODO determine layer.vector type 
                // context.scale(canvas.width / layer.vector.width, canvas.height / layer.vector.height)
                context.drawImage(layer.vector, 0, 0);
                context.restore()
            }
        })
    }, [settings.sourceWidth, settings.sourceHeight, imageData, layers, size]);

    return (
        <div className="card" ref={previewRef}>
            <div className="card-header">
                {"Preview"}
            </div>
            <div className="card-body d-flex justify-content-center">
                <canvas ref={canvasRef} ></canvas>
            </div>
        </div >
    )
}