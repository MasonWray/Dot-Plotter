import { useAppDispatch } from '@/redux/hooks';
import { openImportImageDialog } from '@/redux/slices/menuSlice';
import { Menu, MenuItem } from '@blueprintjs/core';
import { FaFolderPlus, FaFolderOpen, FaFileImage } from "react-icons/fa6";

export function FileMenu() {
  const dispatch = useAppDispatch();

  return (
    <Menu>
      <MenuItem icon={<FaFolderPlus />} text='New Project' disabled />
      <MenuItem icon={<FaFolderOpen />} text='Open Project' disabled />
      <MenuItem icon={<FaFileImage />} text='Open Image' onClick={() => dispatch(openImportImageDialog())} />
    </Menu>
  );
}