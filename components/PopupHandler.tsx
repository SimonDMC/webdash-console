import Popup from "@/lib/popup";

export default function PopupHandler({ popupHide }: { popupHide: Function }) {
    const routePopup = new Popup({
        id: "route-popup",
        title: "My First Popup",
        content: `
        An example popup.
        Supports multiple lines.`,
        hideCallback: () => {
            // dispatch popupHide
            popupHide();
        },
    });

    return <></>;
}
