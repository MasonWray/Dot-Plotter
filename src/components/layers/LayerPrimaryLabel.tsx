import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getLayerById, toggleLayerVisibility } from '@/redux/slices/layerSlice';
import { openDeriveCmykSplitSettings } from '@/redux/slices/menuSlice';
import { Button, Menu, MenuItem, Popover } from '@blueprintjs/core';
import { FaArrowsSplitUpAndLeft, FaEllipsisVertical, FaEye, FaEyeSlash, FaPalette, FaTrashCan } from "react-icons/fa6";

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
        <Button intent={'none'} icon={layerModel.isVisible ? <FaEyeSlash /> : <FaEye />} onClick={() => dispatch(toggleLayerVisibility(layerId))} />
        <Popover content={<LayerContextMenu layerId={layerId} />}>
          <Button intent={'none'} icon={<FaEllipsisVertical />} />
        </Popover>
      </div>
    </div>
  )
}

function LayerContextMenu({ layerId }: { layerId: string }) {
  const dispatch = useAppDispatch();

  return (
    <Menu>
      <MenuItem text={'Derive New Layer'} icon={<FaArrowsSplitUpAndLeft />} >
        <MenuItem text={'Color Mode'} icon={<FaPalette />}>
          <MenuItem text={'CMYK Split'} onClick={() => dispatch(openDeriveCmykSplitSettings(layerId))} />
          <MenuItem text={'RGB Split'} disabled />
        </MenuItem>
      </MenuItem>
      <MenuItem text={'Delete Layer'} icon={<FaTrashCan />} intent={'danger'} disabled />
    </Menu>
  );
}