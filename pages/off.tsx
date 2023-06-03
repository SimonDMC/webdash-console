import styles from "@/styles/Home.module.css";
import { copy } from "@/util/CopyCode";
import WebDashHead from "@/components/WebDashHead";
import { useEffect } from "react";
import { baseUrl } from ".";

export default function Home() {
    useEffect(() => {
        let interval: NodeJS.Timer;
        fetch(`${baseUrl}/period`)
            .then((res) => res.json())
            .then((data) => {
                console.info(`Fetching buttons every ${data.period}ms`);
                // fetch buttons from server every period
                interval = setInterval(() => {
                    fetch(`${baseUrl}/get`).then((res) => {
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
                <p className={styles.dashboardOff}>
                    <b>WebDash</b> is currently disabled. To enable it, run{" "}
                    <span className={styles.copyCode} onClick={copy}>
                        /webdash&nbsp;on
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
