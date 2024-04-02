import { uniqueId } from '@blueprintjs/core/lib/esm/common/utils';
import { LayerModel } from './LayerModel';

export interface ImageLayerModel extends LayerModel {
  data: string
}

export function createImageLayerModel(name: string, width: number, height: number, data: string): ImageLayerModel {
  const model: ImageLayerModel = {
    id: uniqueId('layer'),
    name,
    width,
    height,
    isVisible: true,
    parent: undefined,
    children: [],
    data
  }
  return model;
}