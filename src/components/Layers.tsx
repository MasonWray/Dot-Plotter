'use client'

import { LayerModel } from '@/lib/layers/LayerModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleLayerCollapse } from '@/redux/slices/layerSlice';
import { Card, H5, Tree, TreeNodeInfo } from '@blueprintjs/core';
import { useCallback, useEffect, useState } from 'react';
import { LayerPrimaryLabel } from './layers/LayerPrimaryLabel';


function toLayerNode(root: LayerModel, models: LayerModel[]) {
  let node: TreeNodeInfo<LayerModel> = {
    id: root.id,
    hasCaret: root.children.length > 0,
    label: <LayerPrimaryLabel layerId={root.id} />,
    isExpanded: root.isExpanded,
    childNodes: models.filter(m => m.parent === root.id).map(c => toLayerNode(c, models))
  };
  return node;
}


export function Layers() {
  const dispatch = useAppDispatch();
  const { root, models } = useAppSelector(state => state.layers);
  const [contents, setContents] = useState<TreeNodeInfo<LayerModel>[]>([]);

  const toggleNodeCollapse = useCallback((_node: TreeNodeInfo) => {
    dispatch(toggleLayerCollapse(`${_node.id}`))
  }, [dispatch]);

  useEffect(() => {
    if (root) {
      const tree = toLayerNode(root, models);
      setContents([tree]);
    }
  }, [root, models]);

  return (
    <Card>
      <H5>Layers</H5>
      <Tree contents={contents} onNodeCollapse={(toggleNodeCollapse)} onNodeExpand={toggleNodeCollapse} />
    </Card>
  )
}