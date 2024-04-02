import { useAppSelector } from '@/redux/hooks';
import { getLayerById } from '@/redux/slices/layerSlice';

export function LayerNode({ layerId }: { layerId: string }) {
  const layerModel = useAppSelector(state => getLayerById(state, layerId));

  console.log(layerModel);

  return (
    <div>{'Here is a node'}</div>
  )
}