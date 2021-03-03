import React from 'react';
import { useDispatch } from 'react-redux';

import ACTIONS from '../redux/actions';

function FileSelector() {
    const dispatch = useDispatch();

    const handleFileChange = function (e) {
        if (e.target.files[0]) {
            var fr = new FileReader();
            var img = new Image();
            fr.onload = () => {
                img.src = fr.result;
                img.onload = () => {
                    dispatch({ type: ACTIONS.SET_SOURCE_IMAGE, payload: img })
                    dispatch({ type: ACTIONS.SET_SOURCE_SIZE, payload: { width: img.width, height: img.height } })
                }
            }
            fr.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className="card">
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
    )
}

export default FileSelector;