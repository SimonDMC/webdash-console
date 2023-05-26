import styles from "@/styles/Home.module.css";
import { baseUrl, key } from "@/pages/index";
import { addBrightness } from "@/lib/ColorUtil";

type ButtonProps = {
    name: string;
    id: string;
    command: string;
    color: string;
    fetchData: Function;
    handleDrag: Function;
    handleDrop: Function;
};

const Button = ({
    name,
    id,
    command,
    color,
    fetchData,
    handleDrag,
    handleDrop,
}: ButtonProps) => {
    function getButtonColor() {
        if (isLight()) {
            return styles.blackButton;
        }
        return styles.whiteButton;
    }

    function getCommandColor() {
        if (isLight()) {
            return styles.darkCommand;
        }
        return styles.lightCommand;
    }

    function getBorderColor() {
        if (isLight()) {
            // remove 10% of color
            return addBrightness(color, -25);
        }
        // add 10% of color
        return addBrightness(color, 25);
    }

    function getControlsColor() {
        if (isLight()) {
            // remove 20% of color
            return addBrightness(color, -51);
        }
        // add 20% of color
        return addBrightness(color, 51);
    }

    function isLight() {
        let colorPortion = color.substring(1);
        let numColor = parseInt(colorPortion, 16);
        // if brightness is more than 80%
        if (
            (numColor >> 16) * 0.299 +
                ((numColor >> 8) & 0x00ff) * 0.587 +
                (numColor & 0x0000ff) * 0.114 >
            255 * 0.8
        ) {
            return true;
        }
        return false;
    }

    return (
        <div
            className={`${styles.button} ${getButtonColor()}`}
            id={id}
            draggable="true"
            onDragStart={(e) => handleDrag(e)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
            style={{
                backgroundColor: color,
                border: `0.1em solid ${getBorderColor()}`,
            }}
            onClick={async (e) => {
                // clicked edit button
                if ((e.target as HTMLElement).className.includes("fa-pen")) {
                    const el = document.querySelector(".popup.route-popup")!;
                    el.classList.remove("fade-out");
                    el.classList.add("fade-in");

                    const nameEl = document.querySelector(
                        ".popup.route-popup .name"
                    )! as HTMLInputElement;
                    nameEl.value = name;

                    const commandEl = document.querySelector(
                        ".popup.route-popup .command"
                    )! as HTMLInputElement;
                    commandEl.value = command;

                    const colorEl = document.querySelector(
                        ".popup.route-popup .color"
                    )! as HTMLInputElement;
                    colorEl.value = color;

                    const idEl = document.querySelector(
                        ".popup.route-popup .id"
                    )!;
                    idEl.innerHTML = id;

                    const buttonLabel = document.querySelector(
                        ".popup.route-popup .save"
                    )!;
                    buttonLabel.innerHTML = "Save";
                    return;
                }

                // clicked delete button
                if (
                    (e.target as HTMLElement).className.includes("fa-trash-can")
                ) {
                    await fetch(`${baseUrl}/delete`, {
                        method: "DELETE",
                        body: id,
                        headers: {
                            Authorization: key,
                        },
                    });
                    // refresh
                    fetchData();
                    return;
                }

                // make sure user didn't click control background
                if (
                    !(e.target as HTMLElement).className.includes(
                        "buttonControls"
                    )
                ) {
                    fetch(`${baseUrl}/send`, {
                        method: "POST",
                        body: id,
                        headers: {
                            Authorization: key,
                        },
                    });
                }
            }}
        >
            <p className={styles.buttonName}>{name}</p>
            <p className={`${styles.buttonCommand} ${getCommandColor()}`}>
                {command}
            </p>
            <div
                className={styles.buttonControls}
                style={{
                    backgroundColor: getControlsColor(),
                }}
            >
                <i className="fa-solid fa-pen"></i>
                <i className="fa-regular fa-trash-can"></i>
            </div>
        </div>
    );
};

export default Button;
