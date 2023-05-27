import { getZoomLevel, setZoomLevel } from "@/lib/LocalStorage";
import styles from "@/styles/Home.module.css";

type ZoomButtonsProps = {
    rerender: Function;
};

const ZoomButtons = ({ rerender }: ZoomButtonsProps) => {
    function zoomIn() {
        setZoomLevel(getZoomLevel() + 0.1);
        rerender();
    }

    function zoomOut() {
        setZoomLevel(getZoomLevel() - 0.1);
        rerender();
    }

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
