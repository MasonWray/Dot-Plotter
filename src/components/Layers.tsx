'use client'

import { useAppSelector } from '@/redux/hooks';
import { Layer } from './Layer';

export function Layers() {
    const layers = useAppSelector(state => state.layers.data);

    return (
        <div className="card">
            <div className="card-header">{"Layers"}</div>
            <ul className="list-group list-group-flush">
                {layers.map((layer, index) => <Layer key={index} id={index} />)}
            </ul>
        </div>
    )
}