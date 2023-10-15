const buttonList = ["C", "%", "<-", "÷",
                    "7", "8", "9", "x",
                    "4", "5", "6", "-",
                    "1", "2", "3", "+",
                    "00", "0", ".", "="];

document.addEventListener("DOMContentLoaded", () => {
    const areaButtons = document.querySelector(".button");

    for (const button of buttonList) {
        const createButton = document.createElement("button");
        createButton.textContent = button;
        areaButtons.appendChild(createButton);
    }
});
