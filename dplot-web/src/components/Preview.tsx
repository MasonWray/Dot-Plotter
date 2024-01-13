'use client'

import { useAppSelector } from '@/redux/hooks';
import { useRef } from 'react';

export function Preview() {
    const previewRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const layers = useAppSelector(state => state.layers.data);
    const settings = useAppSelector(state => state.output);

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