import { useState, useLayoutEffect } from "react";

function Layers(props) {
    const [keyweight, setKeyweight] = useState(1)
    const [visibility, setVisibility] = useState({
        cyan: true,
        magenta: true,
        yellow: true,
        black: true
    })

    // Apply layer visibility
    if (props.imageData) {

        // Clear the preview canvas and set it to the correct size
        var canvas = props.canvas.current;
        var context = canvas.getContext("2d");
        canvas.height = props.imageData.height;
        canvas.width = props.imageData.width;

        // Get ImageData for per-pixel editing
        var imgd = context.getImageData(0, 0, props.imageData.width, props.imageData.height);
        var pix = imgd.data;

        // Start with white paper
        for (var i = 0, n = pix.length; i < n; i += 4) {
            pix[i + 0] = 255; // red
            pix[i + 1] = 255; // green
            pix[i + 2] = 255; // blue
            pix[i + 3] = 255; // alpha
        }

        // Paint cyan plate
        if (visibility.cyan) {
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i + 0] = pix[i + 0] - (255 - props.imageData.pix[i + 0])

                // Set keyweight
                var m = Math.max(props.imageData.pix[i + 0], props.imageData.pix[i + 1], props.imageData.pix[i + 2])
                pix[i + 0] = pix[i + 0] + (255 - m) * keyweight
            }
        }

        // Paint magenta plate
        if (visibility.magenta) {
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i + 1] = pix[i + 1] - (255 - props.imageData.pix[i + 1])

                // Set keyweight
                var m = Math.max(props.imageData.pix[i + 0], props.imageData.pix[i + 1], props.imageData.pix[i + 2])
                pix[i + 1] = pix[i + 1] + (255 - m) * keyweight
            }
        }

        // Paint yellow plate
        if (visibility.yellow) {
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i + 2] = pix[i + 2] - (255 - props.imageData.pix[i + 2])

                // Set keyweight
                var m = Math.max(props.imageData.pix[i + 0], props.imageData.pix[i + 1], props.imageData.pix[i + 2])
                pix[i + 2] = pix[i + 2] + (255 - m) * keyweight
            }
        }

        // Paint black plate
        if (visibility.black) {
            for (var i = 0, n = pix.length; i < n; i += 4) {
                var m = Math.max(props.imageData.pix[i + 0], props.imageData.pix[i + 1], props.imageData.pix[i + 2])
                pix[i + 0] = pix[i + 0] - (255 - m) * keyweight
                pix[i + 1] = pix[i + 1] - (255 - m) * keyweight
                pix[i + 2] = pix[i + 2] - (255 - m) * keyweight
            }
        }

        // Load canvas data into temp image



        canvas.height = props.imageData.height;
        canvas.width = props.imageData.width;
        // context.scale(2, 2);

        // context.putImageData(imgd, 0, 0);

        // context.strokeRect(5, 5, 25, 15);
        context.scale(2, 2);
        context.strokeRect(5, 5, 25, 15);
        // context.scale(2, 2);
        // console.log(props.previewRef.current.getBoundingClientRect().width);
    }

    return (
        <div className="card">
            <div className="card-header">
                {"Layers"}
            </div>

            <ul className="list-group list-group-flush">
                <Layer
                    name="Cyan"
                    visible={visibility.cyan}
                    onClick={() => {
                        setVisibility({
                            cyan: !visibility.cyan,
                            magenta: visibility.magenta,
                            yellow: visibility.yellow,
                            black: visibility.black
                        })
                    }}
                />
                <Layer
                    name="Magenta"
                    visible={visibility.magenta}
                    onClick={() => {
                        setVisibility({
                            cyan: visibility.cyan,
                            magenta: !visibility.magenta,
                            yellow: visibility.yellow,
                            black: visibility.black
                        })
                    }}
                />
                <Layer
                    name="Yellow"
                    visible={visibility.yellow}
                    onClick={() => {
                        setVisibility({
                            cyan: visibility.cyan,
                            magenta: visibility.magenta,
                            yellow: !visibility.yellow,
                            black: visibility.black
                        })
                    }}
                />
                <Layer
                    name="Black"
                    visible={visibility.black}
                    onClick={() => {
                        setVisibility({
                            cyan: visibility.cyan,
                            magenta: visibility.magenta,
                            yellow: visibility.yellow,
                            black: !visibility.black
                        })
                    }}
                />
            </ul>
            <div className="card-footer">
                <label className="form-label">{`Key Weight: ${keyweight * 100}%`}</label>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={(e) => { setKeyweight(e.target.value) }} />
            </div>
        </div>
    )
}

function Layer(props) {
    if (props.visible) {
        return (
            <li className="list-group-item">
                <svg
                    className="mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                    onClick={props.onClick}>
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
                <label className="float-right">{props.name}</label>
            </li>
        )
    }
    else {
        return (
            <li className="list-group-item">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                    onClick={props.onClick}>
                    <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.027 7.027 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.088z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.707z" />
                </svg>
                <label className="float-right">{props.name}</label>
            </li>
        )
    }
}

function VisToggle(props) {

}

export default Layers;