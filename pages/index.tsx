import Head from "next/head";
import Script from "next/script";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export type ButtonType = {
    name: string;
    id: string;
    command: string;
    color: string;
    index: number;
};

export default function Home() {
    const [buttons, setButtons] = useState<ButtonType[]>([]);
    useEffect(() => {
        // run immediately
        fetchData();
        // fetch buttons from server twice a second
        const interval = setInterval(fetchData, 500);
        return () => clearInterval(interval);
    }, []);

    function fetchData() {
        fetch(`/get`)
            .then((res) => res.json())
            .then((data) => {
                setButtons(data.buttons);
            });
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="A Web Dashboard for your Minecraft server."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* import fontawesome */}
            <Script
                src="https://kit.fontawesome.com/c7b17cb045.js"
                crossOrigin="anonymous"
            ></Script>

            <main className={`${styles.main} ${inter.className}`}>
                <h1 className={styles.title}>WebDash</h1>
                <div className={styles.mainBox}>
                    <div className={styles.buttonWrapper}>
                        {buttons.map((button) => (
                            <Button
                                name={button.name}
                                id={button.id}
                                command={button.command}
                                color={button.color}
                                index={button.index}
                                key={button.index}
                            />
                        ))}
                        <AddButton />
                    </div>
                </div>
            </main>
        </>
    );
}
