'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRef } from 'react';
import { VisIcon } from './VisIcon';
import { toggleRasterVisibility, toggleVectorVisibility } from '@/redux/slices/layerSlice';

export function Layer({ id }: { id: number }) {
    const rasterLayerRef = useRef<HTMLCanvasElement>(null);
    const vectorPreviewRef = useRef<HTMLCanvasElement>(null);
    const layer = useAppSelector(state => state.layers.data[id]);
    const dispatch = useAppDispatch();

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col">
                    <label>{layer.name}</label>
                </div>

                <div className="col">
                    <div onClick={() => dispatch(toggleRasterVisibility(id))}>
                        <label className="form-label pr-2">Raster</label>
                        <VisIcon visible={layer.raster_visible} />
                    </div>
                    <div onClick={() => dispatch(toggleVectorVisibility(id))}>
                        <label className="form-label pr-2">Vector</label>
                        <VisIcon visible={layer.vector_visible} />
                    </div>
                </div>
            </div>
            <canvas ref={rasterLayerRef} hidden={true} />
            <canvas ref={vectorPreviewRef} hidden={true} />
        </li>
    )
}