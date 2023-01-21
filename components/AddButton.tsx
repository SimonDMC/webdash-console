import styles from "@/styles/Home.module.css";

const Button = () => {
    return (
        <div
            className={styles.addButton}
            onClick={() => {
                // TODO: open add popup
                console.log(`Add button clicked`);
            }}
        >
            <div className={styles.addButtonPlus}>+</div>
        </div>
    );
};

export default Button;
