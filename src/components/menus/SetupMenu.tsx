import { useAppDispatch } from '@/redux/hooks';
import { openMachineSettingsDialog } from '@/redux/slices/menuSlice';
import { Menu, MenuItem } from '@blueprintjs/core';
import { FaGears, FaScrewdriverWrench, FaToolbox } from 'react-icons/fa6';

export function SetupMenu() {
  const dispatch = useAppDispatch();

  return (
    <Menu>
      <MenuItem icon={<FaScrewdriverWrench />} text='Output Settings' onClick={() => dispatch(openMachineSettingsDialog())} />
      <MenuItem icon={<FaGears />} text='Machine Library' disabled />
      <MenuItem icon={<FaToolbox />} text={'Tool Library'} disabled />
    </Menu>
  );
}