export function addBrightness(color: string, amount: number) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    const roundedAm = Math.round(amount);

    const newRed = Math.min(255, red + roundedAm);
    const newGreen = Math.min(255, green + roundedAm);
    const newBlue = Math.min(255, blue + roundedAm);

    return `#${newRed.toString(16)}${newGreen.toString(16)}${newBlue.toString(
        16
    )}`;
}
