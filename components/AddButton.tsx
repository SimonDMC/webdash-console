import styles from "@/styles/Home.module.css";

const Button = () => {
    return (
        <div
            className={styles.addButton}
            onClick={() => {
                const el = document.querySelector(".popup.route-popup")!;
                el.classList.remove("fade-out");
                el.classList.add("fade-in");
            }}
        >
            <div className={styles.addButtonPlus}>+</div>
        </div>
    );
};

export default Button;
