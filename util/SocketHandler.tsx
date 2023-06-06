import { socket } from "@/pages";

export function send(type: string, data: string) {
    socket.send(`${type}§§§${data}`);
}

export function getSocketURL() {
    // get socket port from meta tag
    const socketPort = document.querySelector("meta[name='socket-port']");
    const host = window.location.hostname;
    const socketURL = `ws://${host}:${socketPort?.getAttribute("content")}`;

    return socketURL;
}
