export enum LayerType {
  LayerModel,
  GroupLayerModel,
  ImageLayerModel,
  ColorChannelLayerModel,
}

export interface RgbColor { r: number, g: number, b: number }
export interface RgbaColor extends RgbColor { a: number }

export interface LayerModel {
  id: string,
  type: LayerType,
  name: string,
  isVisible: boolean,
  isExpanded: boolean,
  parent: string | undefined,
  children: string[]
}