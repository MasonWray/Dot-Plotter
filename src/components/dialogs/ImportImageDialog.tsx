import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addRootFromImage } from '@/redux/slices/layerSlice';
import { closeAllDialogs } from '@/redux/slices/menuSlice';
import { Button, Dialog, DialogBody, DialogFooter, FileInput, FormGroup } from '@blueprintjs/core';
import { ChangeEvent, useState } from 'react';

interface ImageData {
  name: string,
  data: string,
  w: number,
  h: number
}

export function ImportImageDialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.menus.isImportImageDialogOpen);
  const [imageData, setImageData] = useState<ImageData | undefined>();

  function handleClose() {
    dispatch(closeAllDialogs());
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) { return; }
    if (e.target.files.length < 1) { return; }
    const filename = e.target.files[0].name ?? '';

    let fr = new FileReader();
    let img = new Image();

    fr.onload = () => {
      if (!fr.result) { return; }
      img.onload = () => {

        setImageData({
          name: filename,
          data: `${fr.result}`,
          w: img.width,
          h: img.height
        });
      }
      img.onerror = (e) => {
        setImageData(undefined);
      }
      img.src = `${fr.result}`;
    }
    fr.readAsDataURL(e.target.files[0])
  }

  function handleImportClick() {
    if (imageData) {
      dispatch(addRootFromImage({ name: imageData.name, data: imageData.data, width: imageData.w, height: imageData.h }));
      dispatch(closeAllDialogs());
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={'Import Image'}>
      <DialogBody>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FormGroup labelFor={'file-input'} label={'Source Image'} inline>
            <FileInput id={'file-input'} text={imageData?.name ?? 'Chose file...'} onInputChange={handleFileChange} />
          </FormGroup>
        </div>
      </DialogBody>
      <DialogFooter actions={[
        <Button key={0} text='Cancel' intent={'none'} onClick={handleClose} />,
        <Button key={1} text='Import' intent={'primary'} onClick={handleImportClick} disabled={!imageData} />
      ]}
      />
    </Dialog>
  )
}