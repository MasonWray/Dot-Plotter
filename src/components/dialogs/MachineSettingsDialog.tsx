import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { closeAllDialogs } from '@/redux/slices/menuSlice';
import { setFeedratePlunge, setFeedrateTravel, setHeightPlunge, setHeightTravel, setOutputSize, setToolDiameter } from '@/redux/slices/outputSlice';
import { Button, Dialog, DialogBody, DialogFooter, FormGroup, NumericInput } from '@blueprintjs/core';
import { useRef, useState } from 'react';

export function MachineSettingsDialog() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state.output);
  const { imageHeight, imageWidth } = useAppSelector(state => state.data.sourceImage) ?? { imageHeight: 0, imageWidth: 0 };
  const isOpen = useAppSelector(state => state.menus.isMachineSettingsDialogOpen);
  const download = useRef<HTMLAnchorElement>(null);
  const [pkg, setPkg] = useState();


  function handleRefresh() {
    // var gcode = [];

  }

  function handleDownload() {
    if (download.current) {
      download.current.click();
    }
  }

  function handleWidthChange(s: string) {
    var newWidth = Math.round(parseFloat(s) < 1 ? 1 : parseFloat(s) * 1);
    var newHeight = Math.round(newWidth * imageHeight / imageWidth);
    dispatch(setOutputSize({ w: newWidth, h: newHeight }));
  }

  function handleHeightChange(s: string) {
    var newHeight = Math.round(parseFloat(s) < 1 ? 1 : parseFloat(s) * 1);
    var newWidth = Math.round(newHeight * imageWidth / imageHeight);
    dispatch(setOutputSize({ w: newWidth, h: newHeight }));
  }

  function handleClose() {
    dispatch(closeAllDialogs());
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={'Machine Setup'}>
      <DialogBody>
        <FormGroup labelFor={'stock-width'} label={'Stock Width'} labelInfo={'(mm)'}>
          <NumericInput id={'stock-width'} disabled={!(imageWidth > 0)} value={settings.stockWidth} onValueChange={(n, s) => { handleWidthChange(s) }} />
        </FormGroup>
        <FormGroup labelFor={'stock-height'} label={'Stock Height'} labelInfo={'(mm)'}>
          <NumericInput id={'stock-height'} disabled={!(imageHeight > 0)} value={settings.stockHeight} onValueChange={(n, s) => { handleHeightChange(s) }} />
        </FormGroup>
        <FormGroup labelFor={'tool-diameter'} label={'Tool Diameter'} labelInfo={'(mm)'}>
          <NumericInput id={'tool-diameter'} step={0.1} value={settings.toolDiameter} onValueChange={(n, s) => dispatch(setToolDiameter(parseFloat(s)))} />
        </FormGroup>
        <FormGroup labelFor={'travel-feedrate'} label={'Travel Feedrate'} labelInfo={'(mm/s)'}>
          <NumericInput id={'travel-feedrate'} step={50} value={settings.feedrateTravel} onValueChange={(n, s) => dispatch(setFeedrateTravel(parseFloat(s)))} />
        </FormGroup>
        <FormGroup labelFor={'plunge-feedrate'} label={'Plunge Feedrate'} labelInfo={'(mm/s)'}>
          <NumericInput id={'plunge-feedrate'} step={50} value={settings.feedratePlunge} onValueChange={(n, s) => dispatch(setFeedratePlunge(parseFloat(s)))} />
        </FormGroup>
        <FormGroup labelFor={'travel-height'} label={'travel Height'} labelInfo={'(mm/s)'}>
          <NumericInput id={'travel-height'} step={0.1} value={settings.heightTravel} onValueChange={(n, s) => dispatch(setHeightTravel(parseFloat(s)))} />
        </FormGroup>
        <FormGroup labelFor={'plunge-height'} label={'Plunge Height'} labelInfo={'(mm/s)'}>
          <NumericInput id={'plunge-feedrate'} step={0.1} value={settings.heightPlunge} onValueChange={(n, s) => dispatch(setHeightPlunge(parseFloat(s)))} />
        </FormGroup>
      </DialogBody>
      <DialogFooter actions={[
        <Button key={0} text='Refresh' intent={'none'} onClick={handleRefresh} />,
        <Button key={1} text='Download' intent={'primary'} onClick={handleDownload}/>
      ]} />
    </Dialog>
  )
}