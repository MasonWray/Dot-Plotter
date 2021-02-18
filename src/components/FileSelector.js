import React from "react";

function FileSelector(props) {
    const handleFileChange = (e) => {
        var file = e.target.files[0];

        // Load pixel data into array when file is selected
        if (file) {
            var fr = new FileReader();
            var img = new Image();
            fr.onload = () => {
                // Set the canvas size and draw the original image to it
                var canvas = props.canvas.current;
                var context = canvas.getContext("2d");
                img.src = fr.result;
                img.onload = () => {
                    canvas.height = img.height;
                    canvas.width = img.width;
                    context.drawImage(img, 0, 0);

                    // Get pixel data from the canvas and send it up
                    var imgd = context.getImageData(0, 0, img.width, img.height);
                    var pix = [...imgd.data];

                    props.sendImageData({
                        pix: pix,
                        width: img.width,
                        height: img.height
                    })
                }
            }
            fr.readAsDataURL(file)
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