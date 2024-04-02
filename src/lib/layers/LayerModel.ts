export interface LayerModel {
  id: string,
  name: string,
  width: number,
  height: number,
  isVisible: boolean,
  parent: string | undefined,
  children: string[]
}