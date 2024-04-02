import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSourceImage } from '@/redux/slices/dataSlice';
import { closeAllDialogs } from '@/redux/slices/menuSlice';
import { setOutputSize } from '@/redux/slices/outputSlice';
import { Button, Dialog, DialogBody, DialogFooter, FileInput } from '@blueprintjs/core';
import { ChangeEvent, useState } from 'react';

interface ImageData {
  source: {
    data: string,
    w: number,
    h: number
  },
  output: {
    w: number,
    h: number
  }
}

export function ImportImageDialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.menus.isImportImageDialogOpen);
  const [filename, setFilename] = useState<string | undefined>();
  const [imageData, setImageData] = useState<ImageData | undefined>();

  function handleClose() {
    dispatch(closeAllDialogs());
  }
  console.log(imageData)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) { return; }
    if (e.target.files.length < 1) { return; }
    setFilename(e.target.files[0].name ?? '');

    let fr = new FileReader();
    let img = new Image();

    fr.onload = () => {
      if (!fr.result) { return; }
      img.src = `${fr.result}`;
      img.onload = () => {
        setImageData({
          source: {
            data: `${fr.result}`,
            w: img.width,
            h: img.height
          },
          output: {
            w: img.width / 20,
            h: img.height / 20
          }
        });
      }
      img.onerror = (e) => {
        setImageData(undefined);
      }
    }
    fr.readAsDataURL(e.target.files[0])
  }

  function handleImportClick() {
    if (imageData) {
      dispatch(setSourceImage(imageData.source));
      dispatch(setOutputSize(imageData.output));
      dispatch(closeAllDialogs());
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={'Import Image'}>
      <DialogBody>
        <FileInput text={filename ?? 'Chose file...'} onInputChange={handleFileChange} />
      </DialogBody>
      <DialogFooter actions={[
        <Button key={0} text='Cancel' intent={'none'} onClick={handleClose} />,
        <Button key={1} text='Import' intent={'primary'} onClick={handleImportClick} disabled={!imageData} />
      ]}
      />
    </Dialog>
  )
}