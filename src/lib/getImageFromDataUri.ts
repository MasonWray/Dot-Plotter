export async function getImageFromDataUri(data: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = data;
    });
}