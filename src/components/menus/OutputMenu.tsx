import { useAppDispatch } from '@/redux/hooks';
import { openMachineSettingsDialog } from '@/redux/slices/menuSlice';
import { Menu, MenuItem } from '@blueprintjs/core';
import { GrConfigure } from "react-icons/gr";

export function OutputMenu() {
  const dispatch = useAppDispatch();

  return (
    <Menu>
      <MenuItem icon={<GrConfigure />} text='Machine Setup' onClick={() => dispatch(openMachineSettingsDialog())} />
      <MenuItem icon={'folder-new'} text='Export' disabled />
    </Menu>
  );
}