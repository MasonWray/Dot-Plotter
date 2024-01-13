'use client'

import { useAppDispatch } from '@/redux/hooks';
import { ChangeEvent } from 'react';

export function FileSelector() {
    const dispatch = useAppDispatch();

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) { return; }
        if (e.target.files.length < 1) { return; }

        let fr = new FileReader();
        let img = new Image();

        fr.onload = () => {
            if (!fr.result) { return; }
            img.src = `${fr.result}`;
            img.onload = () => {
                // dispatch({ type: ACTIONS.SET_SOURCE_IMAGE, payload: img })
                // dispatch({ type: ACTIONS.SET_SOURCE_SIZE, payload: { width: img.width, height: img.height } })
            }
        }
        fr.readAsDataURL(e.target.files[0])
    }

    return (
        <div className="card mb-4">
            <div className="card-header">File Selector</div>
            <div className="card-body">
                <div className="form-group">
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={handleFileChange} />
                </div>
            </div>
        </div>
    );
}