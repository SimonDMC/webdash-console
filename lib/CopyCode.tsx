export function copy(ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const copyingEl = ev.currentTarget;
    const copiedPopup = document.getElementById("copied-popup");

    if (copiedPopup) {
        navigator.clipboard.writeText(copyingEl.innerHTML);
        const box = copyingEl.getBoundingClientRect();
        copiedPopup.style.top = `${box.top}px`;
        copiedPopup.style.left = `${box.left}px`;
        copiedPopup.style.width = `${box.right - box.left}px`;
        copiedPopup.style.height = `${box.bottom - box.top}px`;
        copiedPopup.style.display = "block";
        setTimeout(() => {
            copiedPopup.style.transform = "translate(0, -1.1em)";
            setTimeout(() => {
                copiedPopup.style.opacity = "0";
                setTimeout(() => {
                    copiedPopup.style.transform = "translate(0, 0)";
                    copiedPopup.style.opacity = "1";
                    copiedPopup.style.display = "none";
                }, 300);
            }, 800);
        }, 1);
    }
}
