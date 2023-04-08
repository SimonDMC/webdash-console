import Popup from "@/lib/popup";
import { baseUrl } from "@/pages";

export default function PopupHandler({ fetchData }: { fetchData: Function }) {
    new Popup({
        id: "route-popup",
        title: "My First Popup",
        content: `
        <div class="popup-wrapper">
            row§{popup-label}[Name:]<input class="name popup-input">
            row§{popup-label}[Command:]<input class="command popup-input">
            row§{popup-label}[Color:]<input class="color popup-input" type="color">
            id§id-placeholder
            mid-row§{btn-save}[Save]
        </div>
        `,
        backgroundColor: "#232c35",
        textColor: "#fff",
        titleColor: "#fff",
        closeColor: "#fff",
        fontSizeMultiplier: 1.3,
        widthMultiplier: 0.8,
        hideTitle: true,
        css: `
        .popup-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 0 10%;
        }
        .popup-label {
            font-family: "Inter", sans-serif;
            font-weight: 500;
        }
        .popup .row {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;
            margin-left: 0;
        }

        .popup-input {
            width: 60%;
            height: 1.7em;
            font-size: .6em;
            border: none;
            border-radius: .3em;
            outline: none;
        }

        @media (max-aspect-ratio: 1/1) {
            .popup .row {
                flex-direction: column;
                align-items: flex-start;
            }

            .popup-input {
                width: 100%;
            }
        }

        .popup-input:not(.color) {
            background-color: #333d46;
            color: #fff;
            padding-left: .3em;
            font-family: "Minecraft", monospace;
        }

        .popup .row:has(.color) {
            margin-bottom: .9em;
        }

        .popup p {
            margin: .3em;
        }

        .popup-body {
            margin-bottom: 0;
        }

        .popup-body > :last-child, .popup-wrapper > :last-child {
            margin: 0;
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

        /* Save Button */

        .popup .mid-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        .popup button.save {
            background-color: #3c4b5b;
            color: #fff;
            border: none;
            padding: .3em .5em;
            font-weight: 500;
            letter-spacing: .01em;
        }

        /* Button ID */

        .id {
            display: none;
        }`,
        loadCallback: () => {
            const saveButton = document.querySelector(
                ".popup.route-popup .save"
            )!;

            // check if save button has click event listener
            if (!saveButton.classList.contains("hasListener")) {
                saveButton.classList.add("hasListener");

                // add click event listener

                saveButton.addEventListener("click", () => {
                    const name = document.querySelector(
                        ".popup.route-popup .name"
                    )! as HTMLInputElement;
                    const command = document.querySelector(
                        ".popup.route-popup .command"
                    )! as HTMLInputElement;
                    const color = document.querySelector(
                        ".popup.route-popup .color"
                    )! as HTMLInputElement;
                    const id = document.querySelector(
                        ".popup.route-popup .id"
                    )!;

                    // remove leading slash
                    if (command.value.startsWith("/")) {
                        command.value = command.value.slice(1);
                    }

                    // adding a route
                    if (saveButton.innerHTML === "Add") {
                        fetch(`${baseUrl}/add`, {
                            method: "POST",
                            body: `${name.value}§§§${command.value}§§§${color.value}`,
                        });
                        // refresh
                        fetchData();
                    } else {
                        // editing a route
                        fetch(`${baseUrl}/edit`, {
                            method: "PUT",
                            body: JSON.stringify({
                                id: id.innerHTML,
                                name: name.value,
                                command: command.value,
                                color: color.value,
                            }),
                        });
                        // refresh
                        fetchData();
                    }

                    // close popup
                    const closeButton = document.querySelector(
                        ".popup.route-popup .popup-close"
                    )! as HTMLButtonElement;
                    closeButton.click();
                });
            }
        },
    });

    return <></>;
}
