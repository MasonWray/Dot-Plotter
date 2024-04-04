import { uniqueId } from '@blueprintjs/core/lib/esm/common/utils';
import { ImageLayerModel } from './ImageLayerModel';
import { LayerType, RgbColor, RgbaColor } from './LayerModel';

export const ColorCyan: RgbaColor = { r: 0, g: 255, b: 255, a: 255 }
export const ColorMagenta: RgbaColor = { r: 255, g: 0, b: 255, a: 255 }
export const ColorYellow: RgbaColor = { r: 255, g: 255, b: 0, a: 255 }
export const ColorBlack: RgbaColor = { r: 0, g: 0, b: 0, a: 255 }

export interface ColorChannelLayerModel extends ImageLayerModel {
  color: RgbColor
}

export function createColorChannelLayerModel(name: string, color: RgbColor, width: number = -1, height: number = -1, data: string = ''): ImageLayerModel {
  const model: ColorChannelLayerModel = {
    id: uniqueId('layer'),
    type: LayerType.ColorChannelLayerModel,
    name,
    width,
    height,
    isVisible: true,
    isExpanded: true,
    parent: undefined,
    children: [],
    data,
    color
  }
  return model;
}