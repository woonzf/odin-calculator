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

    const buttons = areaButtons.querySelectorAll("button");
    const inputField = document.querySelector(".input");
    let text = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const input = button.textContent;

            if (!isNaN(+input)) {
                text += input;
            }
            else if (input === "C") {
                text = "";
            }
            else if (input === "<-") {
                const arr = text.split(" ");
                const arrLen = arr.length;
                const arrNew = arr.slice(0, arrLen - 1);

                const last = arr[arrLen - 1];
                const lastNew = last.slice(0, last.length - 1);

                text = arrNew.join(" ") + " " + lastNew;
            } else {
                text += " " + input + " ";
            }

            inputField.textContent = text;
        });
    });
});
