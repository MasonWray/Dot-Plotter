'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLayerRaster, toggleRasterVisibility, toggleVectorVisibility } from '@/redux/slices/layerSlice';
import { useEffect, useRef } from 'react';
import { VisIcon } from './VisIcon';
import { renderRasterLayer } from '@/lib/renderRasterLayer';

export function Layer({ id }: { id: number }) {
    const dispatch = useAppDispatch();
    const rasterLayerRef = useRef<HTMLCanvasElement>(null);
    const vectorPreviewRef = useRef<HTMLCanvasElement>(null);
    const layer = useAppSelector(state => state.layers.data[id]);
    const source = useAppSelector(state => state.data.sourceImage);

    const rasterData = useAppSelector(state => state.layers.data[id].raster);

    useEffect(() => {
        if (!rasterData && source) {
            renderRasterLayer(layer, rasterLayerRef, source)
                .then(imgData => {
                    dispatch(setLayerRaster({ id, data: imgData }));
                });
        }
    }, [rasterData, layer, source, id, dispatch])

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