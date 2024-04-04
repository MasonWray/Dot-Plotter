'use client'

import { LayerModel } from '@/lib/layers/LayerModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleLayerCollapse } from '@/redux/slices/layerSlice';
import { Card, H5, NonIdealState, Tree, TreeNodeInfo } from '@blueprintjs/core';
import { useCallback, useEffect, useState } from 'react';
import { LayerPrimaryLabel } from './layers/LayerPrimaryLabel';
import { FaLayerGroup } from 'react-icons/fa6';
import ApplicationDataException from '@/defs/ApplicationDataException';


function toLayerNode(rootId: string, models: LayerModel[]) {
  const root = models.find(m => m.id === rootId);
  if (!root) throw new ApplicationDataException(`Later ${rootId} not found`);
  let node: TreeNodeInfo<LayerModel> = {
    id: root.id,
    hasCaret: root.children.length > 0,
    label: <LayerPrimaryLabel layerId={root.id} />,
    isExpanded: root.isExpanded,
    childNodes: models.filter(m => m.parent === root.id).map(c => toLayerNode(c.id, models))
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

  if (!root) {
    return (
      <Card>
        <NonIdealState title={'No Layers to Show'} icon={<FaLayerGroup />} description={'Open a project ot import an image to get started'} />
      </Card>
    );
  }

  return (
    <Card>
      <H5>Layers</H5>
      <Tree contents={contents} onNodeCollapse={(toggleNodeCollapse)} onNodeExpand={toggleNodeCollapse} />
    </Card>
  )
}