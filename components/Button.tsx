import localFont from "@next/font/local";
import { ButtonType } from "@/pages";
import styles from "@/styles/Home.module.css";

const minecraft = localFont({ src: "../pages/Minecraft.woff2" });

const Button = ({ name, id, command, color, index }: ButtonType) => {
    return (
        <div
            className={styles.button}
            style={{ backgroundColor: color }}
            onClick={(e) => {
                // clicked edit button
                if ((e.target as HTMLElement).className.includes("fa-pen")) {
                    console.log(`Button ${index} edit clicked`);
                    return;
                }

                // clicked delete button
                if (
                    (e.target as HTMLElement).className.includes("fa-trash-can")
                ) {
                    console.log(`Button ${index} delete clicked`);
                    return;
                }

                // make sure user didn't click control background
                if (
                    !(e.target as HTMLElement).className.includes(
                        "buttonControls"
                    )
                ) {
                    fetch(`/send`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: id,
                    });
                    console.log(`Button ${index} clicked`);
                }
            }}
        >
            <p className={styles.buttonName}>{name}</p>
            <p className={`${styles.buttonCommand} ${minecraft.className}`}>
                {command}
            </p>
            <div className={styles.buttonControls}>
                <i className="fa-solid fa-pen"></i>
                <i className="fa-regular fa-trash-can"></i>
            </div>
        </div>
    );
};

export default Button;
