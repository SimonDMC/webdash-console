import localFont from "@next/font/local";
import { ButtonType } from "@/pages";
import styles from "@/styles/Home.module.css";

const minecraft = localFont({ src: "../pages/Minecraft.woff2" });

const Button = ({ name, id, command, color, index }: ButtonType) => {
    return (
        <div
            className={styles.button}
            style={{ backgroundColor: color }}
            onClick={() => {
                fetch(`/send`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: id,
                });
                console.log(`Button ${index} clicked`);
            }}
        >
            <p className={styles.buttonName}>{name}</p>
            <p className={`${styles.buttonCommand} ${minecraft.className}`}>
                {command}
            </p>
        </div>
    );
};

export default Button;
