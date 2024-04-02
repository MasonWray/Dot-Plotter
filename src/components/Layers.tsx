'use client'

import { useAppSelector } from '@/redux/hooks';
import { LayerModel } from '@/redux/slices/layerSlice';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import { useEffect, useState } from 'react';
import { LayerNode } from './layers/LayerNode';

function toLayerNode(model: LayerModel | undefined) {
    if (!model) return [];

    let node: TreeNodeInfo<LayerModel> = {
        id: model.id,
        hasCaret: true,
        label: <LayerNode layerId={model.id}/>
    };
    return [node];
}

export function Layers() {
    const { root, models } = useAppSelector(state => state.layers);
    const [contents, setContents] = useState<TreeNodeInfo<LayerModel>[]>([]);
    console.log(root)

    useEffect(() => {
        setContents(toLayerNode(root));
    }, [root, models]);

    return (
        <Tree contents={contents} />
    )
}