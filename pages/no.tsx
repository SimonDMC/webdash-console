import styles from "@/styles/Home.module.css";
import { copy } from "@/util/CopyCode";
import WebDashHead from "@/components/WebDashHead";
import { useEffect } from "react";
import { getSocketURL } from "@/util/SocketHandler";

export default function Home() {
    useEffect(() => {
        const socket = new WebSocket(getSocketURL());
        socket.onclose = () => {
            // refresh page if socket connection is closed
            window.location.reload();
        };
    }, []);
    return (
        <>
            <WebDashHead />
            <main className={styles.main}>
                <p className={styles.unauthorized}>
                    This dashboard is key-protected. To view it, run{" "}
                    <span className={styles.copyCode} onClick={copy}>
                        /webdash&nbsp;link
                    </span>{" "}
                    in-game.
                </p>
                <p className={styles.copiedPopup} id="copied-popup">
                    Copied!
                </p>
            </main>
        </>
    );
}
