import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { copy } from "@/lib/CopyCode";

export default function Home() {
    return (
        <>
            <Head>
                <title>WebDash</title>
                <meta
                    name="description"
                    content="A Web Dashboard for your Minecraft server."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="https://simondmc.com/media/webdash-favicon.png"
                />
            </Head>

            <main className={styles.main}>
                <p className={styles.unauthorized}>
                    This dashboard is key-protected. To view it, run{" "}
                    <span className={styles.copyCode} onClick={copy}>
                        /webdash link
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
