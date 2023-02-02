import Head from "next/head";
import Script from "next/script";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
    () => import("../components/PopupHandler"),
    { ssr: false }
);

type ButtonType = {
    name: string;
    id: string;
    command: string;
    color: string;
    index: number;
};

export default function Home() {
    const [buttons, setButtons] = useState<ButtonType[]>([]);
    useEffect(() => {
        let interval: NodeJS.Timer;
        // run immediately
        fetchData();
        // figure out fetch period
        fetch(`/period`)
            .then((res) => res.json())
            .then((data) => {
                console.info(`Fetching buttons every ${data.period}ms`);
                // fetch buttons from server every period
                interval = setInterval(fetchData, data.period);
            });
        return () => clearInterval(interval);
    }, []);

    function fetchData() {
        fetch(`/get`)
            .then((res) => res.json())
            .then((data) => {
                setButtons(data.buttons);
            });
    }

    function popupHide() {
        // save button data
        console.log("Saving button data...");
    }

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

            <DynamicComponentWithNoSSR popupHide={popupHide} />

            {/* import fontawesome */}
            <Script
                src="https://kit.fontawesome.com/c7b17cb045.js"
                crossOrigin="anonymous"
            ></Script>

            <main className={styles.main}>
                <h1 className={styles.title}>WebDash</h1>
                <div className={styles.mainBox}>
                    <div className={styles.buttonWrapper}>
                        {
                            // sort buttons by index
                            [...buttons]
                                .sort((a, b) => a.index - b.index)
                                .map((button) => (
                                    <Button
                                        name={button.name}
                                        id={button.id}
                                        command={button.command}
                                        color={button.color}
                                        index={button.index}
                                        fetchData={fetchData}
                                        key={button.id}
                                    />
                                ))
                        }
                        <AddButton />
                    </div>
                </div>
            </main>
        </>
    );
}
