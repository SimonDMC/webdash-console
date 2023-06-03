import { getZoomLevel, setZoomLevel } from "@/lib/LocalStorage";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

type ZoomButtonsProps = {
    rerender: Function;
};

const ZoomButtons = ({ rerender }: ZoomButtonsProps) => {
    function zoomIn() {
        setZoomLevel(Math.min(getZoomLevel() + 1, 15));
        rerender();
    }

    function zoomOut() {
        setZoomLevel(Math.max(getZoomLevel() - 1, 4));
        rerender();
    }

    const listener = (e: WheelEvent) => {
        if (!e.ctrlKey) return;

        e.preventDefault();
        e.stopPropagation();

        if (e.deltaY > 0) {
            zoomOut();
        } else {
            zoomIn();
        }
    };

    // not using built-in react listeners because they can't be set as non-passive
    document.addEventListener("wheel", listener, {
        passive: false,
    });

    useEffect(() => {
        return () => {
            document.removeEventListener("wheel", listener);
        };
    });

    return (
        <div className={styles.zoomButtons}>
            <div className={styles.zoomButton} onClick={zoomIn}>
                +
            </div>
            <div className={styles.zoomDivider}></div>
            <div className={styles.zoomButton} onClick={zoomOut}>
                -
            </div>
        </div>
    );
};

export default ZoomButtons;
