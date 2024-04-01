import { Menu, MenuItem } from '@blueprintjs/core';

export function FileMenu() {
  return (
    <Menu>
      <MenuItem icon={'folder-new'} text='New Project' disabled />
      <MenuItem icon={'folder-open'} text='Open Project' disabled />
      <MenuItem icon={'media'} text='Open Image' />
    </Menu>
  );
}