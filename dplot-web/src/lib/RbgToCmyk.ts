export function RgbToCmyk(r: number, g: number, b: number) {
    var R = r / 255;
    var G = g / 255;
    var B = b / 255;

    var K = 1 - Math.max(R, G, B);
    var C = (1 - R - K) / (1 - K);
    var M = (1 - G - K) / (1 - K);
    var Y = (1 - B - K) / (1 - K);

    return { C, M, Y, K };
}