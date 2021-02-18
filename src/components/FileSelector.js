import React from 'react';

function FileSelector(props) {
    const handleFileChange = function (e) {
        if (e.target.files[0]) {
            var fr = new FileReader();
            var img = new Image();
            fr.onload = () => {
                img.src = fr.result;
                img.onload = () => {
                    props.setImage(img)
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