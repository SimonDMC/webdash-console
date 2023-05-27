import Script from "next/script";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import WebDashHead from "@/components/WebDashHead";

export const baseUrl = "http://localhost:26666";
//export const baseUrl = "";
export let key = "";

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
        // store key
        key = new URLSearchParams(window.location.search).get("key") ?? "";
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
        fetch(`${baseUrl}/get`, {
            headers: {
                Authorization: key,
            },
        })
            .then((res) => {
                // refresh page if unauthorized or forbidden
                if (res.status === 401 || res.status === 403) {
                    window.location.reload();
                } else {
                    return res.json();
                }
            })
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

    const [touchId, setTouchId] = useState("");
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.targetTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target instanceof HTMLDivElement) {
            setTouchId(target.id);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const dragBtn = buttons.find((button) => button.id === dragId);
        const dropId =
            e.nativeEvent instanceof MouseEvent ? e.currentTarget.id : touchId;

        const dropBtn = buttons.find((button) => button.id === dropId);

        if (!dragBtn || !dropBtn) {
            return;
        }

        const dragBtnIndex = dragBtn!.index;
        const dropBtnIndex = dropBtn!.index;

        // send drag request to server
        fetch(`${baseUrl}/drag`, {
            method: "POST",
            body: `${dragBtnIndex}§§§${dropBtnIndex}`,
            headers: {
                Authorization: key,
            },
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
            <WebDashHead />
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
                                        handleTouchMove={handleTouchMove}
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
