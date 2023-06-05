import styles from "@/styles/Home.module.css";
import { copy } from "@/util/CopyCode";
import WebDashHead from "@/components/WebDashHead";
import { useEffect } from "react";
import { webURL } from ".";

export default function Home() {
    useEffect(() => {
        let interval: NodeJS.Timer;
        fetch(`${webURL}/period`)
            .then((res) => res.json())
            .then((data) => {
                console.info(`Fetching buttons every ${data.period}ms`);
                // fetch buttons from server every period
                interval = setInterval(() => {
                    fetch(`${webURL}/get`).then((res) => {
                        // refresh page if successful
                        if (res.status === 200) {
                            window.location.reload();
                        }
                    });
                }, data.period);
            });
        return () => clearInterval(interval);
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
