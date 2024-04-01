import { useAppSelector } from '@/redux/hooks';
import { Dialog } from '@blueprintjs/core';

export function ImportImageDialog() {
  const isOpen = useAppSelector(state => state.menus.isImportImageDialogOpen);

  return (
    <Dialog isOpen={isOpen} title={'Import Image'}>

    </Dialog>
  )
}