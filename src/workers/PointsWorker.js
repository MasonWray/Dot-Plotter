onmessage = function (e) {
    var points = [];
    for (var i = 0, n = e.data.pix.length; i < n; i += 4) {
        var x = (i / 4) % e.data.width;
        var y = Math.floor((i / 4) / e.data.width);

        if (e.data.pix[i + 3] > Math.floor(Math.random() * Math.floor(255))) {
            points.push({
                x: x * e.data.diameter,
                y: y * e.data.diameter
            })
        }
    }
    postMessage(points)
}