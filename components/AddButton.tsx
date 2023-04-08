import styles from "@/styles/Home.module.css";

const Button = () => {
    return (
        <div
            className={styles.addButton}
            onClick={() => {
                const el = document.querySelector(".popup.route-popup")!;
                el.classList.remove("fade-out");
                el.classList.add("fade-in");

                const name = document.querySelector(
                    ".popup.route-popup .name"
                )! as HTMLInputElement;
                name.value = "";

                const command = document.querySelector(
                    ".popup.route-popup .command"
                )! as HTMLInputElement;
                command.value = "";

                const color = document.querySelector(
                    ".popup.route-popup .color"
                )! as HTMLInputElement;
                color.value = "#5781af";

                const buttonLabel = document.querySelector(
                    ".popup.route-popup .save"
                )!;
                buttonLabel.innerHTML = "Add";
            }}
        >
            <div className={styles.addButtonPlus}>+</div>
        </div>
    );
};

export default Button;
