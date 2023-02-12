import Popup from "@/lib/popup";

export default function PopupHandler({ popupHide }: { popupHide: Function }) {
    new Popup({
        id: "route-popup",
        title: "My First Popup",
        content: `
        <div class="popup-wrapper">
            row§{popup-label}[Name:]<input class="name popup-input">
            row§{popup-label}[Command:]<input class="command popup-input">
            row§{popup-label}[Color:]<input class="color popup-input" type="color">
        </div>
        `,
        backgroundColor: "#232c35",
        textColor: "#fff",
        titleColor: "#fff",
        closeColor: "#fff",
        fontSizeMultiplier: 1.3,
        widthMultiplier: 0.8,
        hideTitle: true,
        hideCallback: () => {
            // dispatch popupHide
            popupHide();
        },
        css: `
        .popup-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 0 10%;
        }
        .popup-label {
            font-family: "Minecraft", monospace;
        }
        .popup .row {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;
        }
        .popup-input {
            width: 60%;
            height: 1.7em;
            font-size: .6em;
            border: none;
            border-radius: .3em;
            outline: none;
        }
        .popup-input:not(.color) {
            background-color: #333d46;
            color: #fff;
            padding-left: .3em;
            font-family: "Minecraft", monospace;
        }
        .popup p {
            margin: .3em;
        }
        .popup-body {
            margin-bottom: 0;
        }

        /* Color picker */
        .color {
            background-color: transparent;
        }
        .color::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        .color::-webkit-color-swatch {
            border: none;
            border-radius: .3em;
        }
        `,
    });

    return <></>;
}
