'use client'

import { useAppSelector } from '@/redux/hooks';
import { useRef } from 'react';

export function Preview() {
    const previewRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const layers = useAppSelector(state => state.layers.data);
    const settings = useAppSelector(state => state.output);

    return (
        <div></div>
    )
}