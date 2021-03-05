onmessage = function (e) {
    var svgPoints = "";
    var gcode = `G28\nG0 X0 Y0 Z${e.data.settings.heightTravel} F${e.data.settings.feedrateTravel}\n`;
    var down = `G1 Z${e.data.settings.heightPlunge} F${e.data.settings.feedratePlunge}\n`;
    var up = `G0 Z${e.data.settings.heightTravel} F${e.data.settings.feedrateTravel}\n`;

    for (var i = 0, n = e.data.pix.length; i < n; i += 4) {
        if (e.data.pix[i + 3] > Math.floor(Math.random() * Math.floor(255))) {

            // Get x,y coordinates of pixel in paper space
            var x = (i / 4) % e.data.settings.width;
            var y = Math.floor((i / 4) / e.data.settings.width);
            x = Math.round((x * e.data.settings.toolDiameter) * 10000) / 10000;
            y = Math.round((y * e.data.settings.toolDiameter) * 10000) / 10000;

            // Draw dot on SVG preview
            svgPoints = svgPoints + `<circle cx="${x}" cy="${y}" r="${e.data.settings.toolDiameter}" fill="rgba(${e.data.settings.color.r}, ${e.data.settings.color.g}, ${e.data.settings.color.b}, 64)" />`;

            // Add move to GCODE
            var move = `G0 X${x} Y${e.data.settings.stockHeight - y} F${e.data.settings.feedrateTravel}\n`;
            gcode = gcode + move + down + up;
        }
    }

    var svg = `<svg width="${e.data.settings.stockWidth}" height="${e.data.settings.stockHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">${svgPoints}</svg>`;
    var imgData = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svg);
    console.log("Rendered Vector: ", e.data.settings.name)
    postMessage({
        name: e.data.settings.name,
        image: imgData,
        gcode: gcode
    });
}