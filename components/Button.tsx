import styles from "@/styles/Home.module.css";
import { baseUrl, key } from "@/pages/index";

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
    return (
        <div
            className={styles.button}
            id={id}
            draggable="true"
            onDragStart={(e) => handleDrag(e)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
            style={{ backgroundColor: color }}
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
            <p className={styles.buttonCommand}>{command}</p>
            <div className={styles.buttonControls}>
                <i className="fa-solid fa-pen"></i>
                <i className="fa-regular fa-trash-can"></i>
            </div>
        </div>
    );
};

export default Button;
