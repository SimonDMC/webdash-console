import { socket } from "@/pages";

export function send(type: string, data: string) {
    socket.send(`${type}§§§${data}`);
}
