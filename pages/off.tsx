import styles from "@/styles/Home.module.css";
import { copy } from "@/lib/CopyCode";
import WebDashHead from "@/components/WebDashHead";

export default function Home() {
    return (
        <>
            <WebDashHead />
            <main className={styles.main}>
                <p className={styles.dashboardOff}>
                    <b>WebDash</b> is currently off. To enable it, run{" "}
                    <span className={styles.copyCode} onClick={copy}>
                        /webdash on
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
