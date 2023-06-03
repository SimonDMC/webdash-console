export function getZoomLevel() {
    const zoomLevel = localStorage.getItem("zoomLevel");
    if (zoomLevel !== null) {
        return parseFloat(zoomLevel);
    }
    return 10;
}

export function setZoomLevel(zoomLevel: number) {
    localStorage.setItem("zoomLevel", zoomLevel.toString());
}
