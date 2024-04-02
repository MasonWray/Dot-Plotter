import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getLayerById, toggleLayerVisibility } from '@/redux/slices/layerSlice';
import { Button } from '@blueprintjs/core';
import { IoMdAdd, IoMdEye, IoMdEyeOff } from "react-icons/io";

export function LayerPrimaryLabel({ layerId }: { layerId: string }) {
  const dispatch = useAppDispatch();
  const layerModel = useAppSelector(state => getLayerById(state, layerId));

  if (!layerModel) {
    return (<></>);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: 4 }}>
      <div style={{ flex: 1, alignContent: 'center' }}>
        {layerModel.name}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', columnGap: 4 }}>
        <Button intent={'none'} icon={layerModel.isVisible ? <IoMdEyeOff /> : <IoMdEye />} onClick={() => dispatch(toggleLayerVisibility(layerId))} />
        <Button intent={'none'} icon={<IoMdAdd />} />
      </div>
    </div>
  )
}