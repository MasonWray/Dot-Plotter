import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeAllDialogs } from '@/redux/slices/menuSlice';
import { Button, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';

export function MachineSettingsDialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.menus.isMachineSettingsDialogOpen);

  function handleClose() {
    dispatch(closeAllDialogs());
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={'Machine Setup'}>
      <DialogBody>

      </DialogBody>
      <DialogFooter actions={[
        <Button key={0} text='Cancel' intent={'none'} onClick={handleClose} />,
        <Button key={1} text='Import' intent={'primary'} />
      ]} />
    </Dialog>
  )
}