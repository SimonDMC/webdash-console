import { useState, useEffect } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";
import Button from "@/components/Button";
import AddButton from "@/components/AddButton";
import WebDashHead from "@/components/WebDashHead";
import ZoomButtons from "@/components/ZoomButtons";
import { getZoomLevel } from "@/util/LocalStorage";
import { getSocketURL, send } from "@/util/SocketHandler";

export let socket: WebSocket;
let loaded = false;

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
        socket = new WebSocket(getSocketURL());

        socket.onopen = () => {
            const key = new URLSearchParams(window.location.search).get("key");
            if (key) {
                // send auth request
                send("auth", key);
            }
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setButtons(data.buttons);
            loaded = true;
        };

        socket.onclose = () => {
            // refresh page if socket connection is closed
            window.location.reload();
        };
    }, []);

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

        // send drag request
        send("drag", `${dragBtnIndex}§§§${dropBtnIndex}`);

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

    const [inFullscreen, setInFullscreen] = useState(false);
    function enterFullscreen() {
        const elem = document.documentElement;
        inFullscreen ? document.exitFullscreen() : elem.requestFullscreen();
        setInFullscreen(!inFullscreen);
    }

    function rerender() {
        setButtons([...buttons]);
    }

    return (
        <>
            <WebDashHead />
            <Popup />

            {/* import fontawesome */}
            <Script
                src="https://kit.fontawesome.com/c7b17cb045.js"
                crossOrigin="anonymous"
            ></Script>

            <main className={styles.main}>
                <h1 className={styles.title} onDoubleClick={enterFullscreen}>
                    WebDash
                </h1>
                <div className={styles.mainBoxWrapper}>
                    <div className={styles.zoomOverlay}>
                        <ZoomButtons rerender={rerender} />
                    </div>
                    <div
                        className={
                            loaded ? styles.mainBox : styles.mainBoxLoading
                        }
                    >
                        <div
                            className={styles.buttonWrapper}
                            style={{
                                fontSize: `${getZoomLevel() / 10}em`,
                            }}
                        >
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
                </div>
                <a
                    className={styles.credit}
                    href="https://simondmc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made by SimonDMC
                </a>
            </main>
        </>
    );
}
