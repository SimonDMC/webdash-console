import styles from "@/styles/Home.module.css";

type ButtonProps = {
    name: string;
    id: string;
    command: string;
    color: string;
    index: number;
    fetchData: Function;
};

const Button = ({
    name,
    id,
    command,
    color,
    index,
    fetchData,
}: ButtonProps) => {
    return (
        <div
            className={styles.button}
            style={{ backgroundColor: color }}
            onClick={async (e) => {
                // clicked edit button
                if ((e.target as HTMLElement).className.includes("fa-pen")) {
                    console.log(`Button ${index} edit clicked`);
                    return;
                }

                // clicked delete button
                if (
                    (e.target as HTMLElement).className.includes("fa-trash-can")
                ) {
                    await fetch(`/delete`, {
                        method: "DELETE",
                        body: id,
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
                    fetch(`/send`, {
                        method: "POST",
                        body: id,
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
