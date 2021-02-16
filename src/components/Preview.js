function Preview(props) {
    return (
        <div className="card">
            <div className="card-header">
                Preview
        </div>
            <div className="card-body d-flex justify-content-center">
                <canvas ref={props.canvasRef}></canvas>
            </div>
        </div >

    )
}

export default Preview;