import { uniqueId } from '@blueprintjs/core/lib/esm/common/utils';
import { LayerModel, LayerType } from './LayerModel';

export interface GroupLayerModel extends LayerModel { }

export function createGroupLayerModel(name: string, parent?: string, children: string[] = []): GroupLayerModel {
  const model: GroupLayerModel = {
    id: uniqueId('layer'),
    type: LayerType.GroupLayerModel,
    name,
    isVisible: true,
    parent,
    children,
  }
  return model;
}