'use client'

import { LayerModel } from '@/lib/layers/LayerModel';
import { useAppSelector } from '@/redux/hooks';
import { Tree, TreeNodeInfo } from '@blueprintjs/core';
import { useEffect, useState } from 'react';
import { LayerPrimaryLabel } from './layers/LayerPrimaryLabel';

function toLayerNode(model: LayerModel | undefined) {
    if (!model) return [];

    let node: TreeNodeInfo<LayerModel> = {
        id: model.id,
        hasCaret: true,
        label: <LayerPrimaryLabel layerId={model.id} />,
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