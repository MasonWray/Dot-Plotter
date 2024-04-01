import { useAppDispatch } from '@/redux/hooks';
import { openImportImageDialog } from '@/redux/slices/menuSlice';
import { Menu, MenuItem } from '@blueprintjs/core';

export function FileMenu() {
  const dispatch = useAppDispatch();

  return (
    <Menu>
      <MenuItem icon={'folder-new'} text='New Project' disabled />
      <MenuItem icon={'folder-open'} text='Open Project' disabled />
      <MenuItem icon={'media'} text='Open Image' onClick={() => dispatch(openImportImageDialog())} />
    </Menu>
  );
}