import Head from "next/head";
import Script from "next/script";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export type ButtonType = {
    name: string;
    id: string;
    command: string;
    color: string;
    index: number;
};

const buttons = [
    {
        name: "Camera 1",
        id: "button1",
        command: "/say Hello World!",
        color: "#5781af",
        index: 1,
    },
    {
        name: "Top View",
        id: "button2",
        command: "/tp @a[tag=cam] 58 108 9789898754",
        color: "#5781af",
        index: 2,
    },
] as ButtonType[];

export default function Home() {
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
