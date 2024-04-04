import { ColorCyan, createColorChannelLayerModel } from '@/lib/layers/ColorChannelLayerModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addLayerGroup } from '@/redux/slices/layerSlice';
import { closeAllDialogs } from '@/redux/slices/menuSlice';
import { Button, Dialog, DialogBody, DialogFooter, FormGroup, HTMLSelect } from '@blueprintjs/core';
import { useState } from 'react';

enum CmykSplitMethod {
  ArithmeticSplit = 'Arithmetic Split'
}

export function CmykSplitSettingsDialog() {
  const dispatch = useAppDispatch();
  const parentId = useAppSelector(state => state.menus.currentLayer);
  const isOpen = useAppSelector(state => state.menus.isDeriveCmykSplitSettingsOpen);
  const [method, setMethod] = useState<string>(CmykSplitMethod.ArithmeticSplit);

  function handleClose() {
    dispatch(closeAllDialogs());
  }

  function handleStart() {
    const layerC = createColorChannelLayerModel('Cyan Split', ColorCyan);
    const layerM = createColorChannelLayerModel('Magenta Split', ColorCyan);
    const layerY = createColorChannelLayerModel('Yellow Split', ColorCyan);
    const layerK = createColorChannelLayerModel('Black Split', ColorCyan);
    dispatch(addLayerGroup({ parent: parentId, name: 'CMYK Split', layers: [layerC, layerM, layerY, layerK] }));
    handleClose();
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={'Derive CMYK Split'}>
      <DialogBody>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FormGroup labelFor={'split-method'} label={'Split Method'} inline>
            <HTMLSelect id={'split-method'} options={Object.values(CmykSplitMethod)} value={method} onChange={(v) => setMethod(v.target.value)} disabled />
          </FormGroup>
        </div>
      </DialogBody>
      <DialogFooter actions={[
        <Button key={0} text='Cancel' intent={'none'} onClick={handleClose} />,
        <Button key={1} text='Start Operation' intent={'primary'} onClick={handleStart} />
      ]} />
    </Dialog>
  )
}