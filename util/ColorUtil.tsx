export function addBrightness(color: string, amount: number) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    const roundedAm = Math.round(amount);

    let newRed = red + roundedAm;
    let newGreen = green + roundedAm;
    let newBlue = blue + roundedAm;

    // clamp between 0 and 255
    newRed = Math.min(Math.max(newRed, 0), 255);
    newGreen = Math.min(Math.max(newGreen, 0), 255);
    newBlue = Math.min(Math.max(newBlue, 0), 255);

    // ensure hex is 2 digits
    const redAsHex = newRed.toString(16).padStart(2, "0");
    const greenAsHex = newGreen.toString(16).padStart(2, "0");
    const blueAsHex = newBlue.toString(16).padStart(2, "0");

    return `#${redAsHex}${greenAsHex}${blueAsHex}`;
}
