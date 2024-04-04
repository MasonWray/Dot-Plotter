import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeAllDialogs } from '@/redux/slices/menuSlice';
import { Button, Dialog, DialogBody, DialogFooter, FormGroup, NumericInput } from '@blueprintjs/core';

export function CmykSplitSettingsDialog() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.output);
  const isOpen = useAppSelector(state => state.menus.isDeriveCmykSplitSettingsOpen);

  function handleClose() {
    dispatch(closeAllDialogs());
  }

  function handleStart() {

  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={'Machine Setup'}>
      <DialogBody>
        <FormGroup labelFor={'stock-width'} label={'Stock Width'} labelInfo={'(mm)'}>
          <NumericInput id={'stock-width'} value={settings.stockWidth} onValueChange={(n, s) => { }} />
        </FormGroup>
      </DialogBody>
      <DialogFooter actions={[
        <Button key={0} text='Cancel' intent={'none'} onClick={handleClose} />,
        <Button key={1} text='Start Operation' intent={'primary'} onClick={handleStart} />
      ]} />
    </Dialog>
  )
}