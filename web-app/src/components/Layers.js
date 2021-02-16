import { useState } from "react";

function Layers(props) {
    const [visibility, setVisibility] = useState({
        cyan: true,
        magenta: true,
        yellow: true,
        black: true
    })

    if (props.imageData) {
        // Clear the preview canvas and set it to the correct size
        var canvas = props.canvas.current;
        var context = canvas.getContext("2d");
        canvas.height = props.imageData.height;
        canvas.width = props.imageData.width;

        var imgd = context.getImageData(0, 0, props.imageData.width, props.imageData.height);
        var pix = imgd.data;

        // Apply layer visibility
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
            }
        }

        // Paint magenta plate
        if (visibility.magenta) {
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i + 1] = pix[i + 1] - (255 - props.imageData.pix[i + 1])
            }
        }

        // Paint yellow plate
        if (visibility.yellow) {
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i + 2] = pix[i + 2] - (255 - props.imageData.pix[i + 2])
            }
        }

        // Switch
        // for (var i = 0, n = pix.length; i < n; i += 4) {
        // var k = Math.max(props.imageData.pix[i + 0], props.imageData.pix[i + 1], props.imageData.pix[i + 2]);
        // pix[i + 0] = visibility.cyan ? props.imageData.pix[i + 0] : 255; // red
        // pix[i + 1] = visibility.magenta ? props.imageData.pix[i + 1] : 255; // green
        // pix[i + 2] = visibility.yellow ? props.imageData.pix[i + 2] : 255; // blue

        // pix[i + 0] = visibility.black ? pix[i + 0] - (255 - pix[i + 0]) : pix[i + 0];
        // pix[i + 1] = visibility.black ? pix[i + 1] - (255 - pix[i + 1]) : pix[i + 1];
        // pix[i + 2] = visibility.black ? pix[i + 2] - (255 - pix[i + 2]) : pix[i + 2];
        // pix[i + 3] = 255 / 2; // alpha
        // }

        // Original
        // for (var i = 0, n = pix.length; i < n; i += 4) {
        //     pix[i + 0] = props.imageData.pix[i + 0]; // red
        //     pix[i + 1] = props.imageData.pix[i + 1]; // green
        //     pix[i + 2] = props.imageData.pix[i + 2]; // blue
        //     pix[i + 3] = props.imageData.pix[i + 3]; // alpha
        // }

        // Cyan
        // for (var i = 0, n = pix.length; i < n; i += 4) {
        //     pix[i + 0] = props.imageData.pix[i + 0]; // red
        //     pix[i + 1] = props.imageData.pix[i + 1]; // green
        //     pix[i + 2] = props.imageData.pix[i + 2]; // blue
        //     pix[i + 3] = 255 / 2; // alpha
        // }

        // Black
        // for (var i = 0, n = pix.length; i < n; i += 4) {
        //     var k = Math.max(props.imageData.pix[i + 0], props.imageData.pix[i + 1], props.imageData.pix[i + 2]);
        //     pix[i + 0] = 0; // red
        //     pix[i + 1] = 255; // green
        //     pix[i + 2] = 255; // blue
        //     pix[i + 3] = 255; // alpha
        // }


        context.putImageData(imgd, 0, 0);
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