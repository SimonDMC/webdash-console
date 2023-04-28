import Head from "next/head";
import Script from "next/script";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export const baseUrl = "http://localhost:26666";
//export const baseUrl = "";

const Popup = dynamic(() => import("../components/PopupHandler"), {
    ssr: false,
});

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
        fetch(`${baseUrl}/period`)
            .then((res) => res.json())
            .then((data) => {
                console.info(`Fetching buttons every ${data.period}ms`);
                // fetch buttons from server every period
                interval = setInterval(fetchData, data.period);
            });
        return () => clearInterval(interval);
    }, []);

    function fetchData() {
        fetch(`${baseUrl}/get`)
            .then((res) => res.json())
            .then((data) => {
                const stateEl = document.querySelector(".invalid");
                if (!stateEl || stateEl.innerHTML === "false") {
                    setButtons(data.buttons);
                } else {
                    stateEl.innerHTML = "false";
                }
            });
    }

    const [dragId, setDragId] = useState("");
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        setDragId(e.currentTarget.id);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const dragBtn = buttons.find((button) => button.id === dragId);
        const dropBtn = buttons.find(
            (button) => button.id === e.currentTarget.id
        );

        const dragBtnIndex = dragBtn!.index;
        const dropBtnIndex = dropBtn!.index;

        // send drag request to server
        fetch(`${baseUrl}/drag`, {
            method: "POST",
            body: `${dragBtnIndex}§§§${dropBtnIndex}`,
        });

        // mark next incoming buttons as invalid (atrocious but react hooks don't work in setInterval)
        document.querySelector(".invalid")!.innerHTML = "true";

        const newBtnState = [...buttons];

        // set dragged route after reordering
        const draggedBtn = newBtnState.find((button) => button.id === dragId)!;

        // reorder routes
        if (dragBtnIndex < dropBtnIndex) {
            // dragged route is below dropped route
            for (let i = dragBtnIndex + 1; i <= dropBtnIndex; i++) {
                newBtnState.find((button) => button.index === i)!.index--;
            }
        } else {
            // dragged route is above dropped route
            for (let i = dragBtnIndex - 1; i >= dropBtnIndex; i--) {
                newBtnState.find((button) => button.index === i)!.index++;
            }
        }

        draggedBtn.index = dropBtnIndex;

        setButtons(newBtnState);
    };

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

            <Popup fetchData={fetchData} />

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
                                        fetchData={fetchData}
                                        key={button.id}
                                        handleDrag={handleDrag}
                                        handleDrop={handleDrop}
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
