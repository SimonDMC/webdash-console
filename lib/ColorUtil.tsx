export function addBrightness(color: string, amount: number) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    const newRed = Math.min(255, red + amount);
    const newGreen = Math.min(255, green + amount);
    const newBlue = Math.min(255, blue + amount);

    return `#${newRed.toString(16)}${newGreen.toString(16)}${newBlue.toString(
        16
    )}`;
}
