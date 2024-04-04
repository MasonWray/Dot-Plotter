import { uniqueId } from '@blueprintjs/core/lib/esm/common/utils';
import { LayerModel, LayerType } from './LayerModel';

export interface ImageLayerModel extends LayerModel {
  data: string,
  width: number,
  height: number,
}

export function createImageLayerModel(name: string, width: number, height: number, data: string): ImageLayerModel {
  const model: ImageLayerModel = {
    id: uniqueId('layer'),
    type: LayerType.ImageLayerModel,
    name,
    width,
    height,
    isVisible: true,
    isExpanded: true,
    parent: undefined,
    children: [],
    data
  }
  return model;
}