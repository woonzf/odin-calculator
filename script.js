// Buttons to be generated
const buttonList = ["C", "%", "<-", "÷",
                    "7", "8", "9", "x",
                    "4", "5", "6", "-",
                    "1", "2", "3", "+",
                    "00", "0", ".", "="];

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const areaButtons = document.querySelector(".button");

    // Generate buttons
    for (const button of buttonList) {
        const createButton = document.createElement("button");
        createButton.textContent = button;
        areaButtons.appendChild(createButton);
    }

    const buttons = areaButtons.querySelectorAll("button");
    const warningField = document.querySelector(".warning");
    const inputField = document.querySelector(".input");
    const resultField = document.querySelector(".result");
    
    let error = 0;
    let text = "";
    let result = 0;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const input = button.textContent;
            const temp = text;

            // If input is not action
            if (!boolAction(input)) {
                // Insert character
                text = insertChar(input, text);
                error = 0;
                
                // Error if max string length
                if (text.length > 16) {
                    text = temp;
                    result = "Error";
                    error = 1;
                }
            } else {
                switch(input) {
                    // Clear input and result field
                    case "C":
                        text = "";
                        result = 0;
                        error = 0;
                        break;
                    // Delete last character
                    case "<-":
                        text = deleteLastChar(text);
                        error = 0;
                        break;
                    // Calculate
                    case "=":
                        result = operate(text);
                        error = 0;

                        if (isNaN(result)) {
                            result = "Error";
                            error = 2;
                        }

                        break;
                }
            }

            warningField.textContent = getWarning(error);
            inputField.textContent = text;
            resultField.textContent = result;
        });
    });
});

// Functions
const boolAction = str => {
    switch(str) {
        case "C":
        case "<-":
        case "=":
            return true;
        default:
            return false;
    }
}

const boolOperator = str => {
    switch(str) {
        case "%":
        case "÷":
        case "x":
        case "-":
        case "+":
            return true;
        default:
            return false;
    }
}

const insertChar = (input, text) => {
    // If input is number or dot
    if (!isNaN(+input) || input === ".") {
        const arr = text.split(" ");
        const len = arr.length;

        // If previous char is operator
        if (boolOperator(arr[len - 1])) {
            return text + " " + input;
        } else {
            return text + input;
        }
    }
    // If input is operator
    else if (boolOperator(input)) {
        return text + " " + input;
    }
}

const deleteLastChar = str => {
    const arr = str.split(" ");
    const lenArr = arr.length;
    const arrNew = arr.slice(0, lenArr - 1);

    const last = arr[lenArr - 1];
    const lastNew = last.slice(0, last.length - 1);

    if (lastNew.length === 0) {
        return arrNew.join(" ");
    } else {
        return arrNew.join(" ") + " " + lastNew;
    }
}

const getWarning = code => {
    switch(code) {
        case 0:
            return "";
        case 1:
            return "Max string length reached!";
        case 2:
            return "Expression error!";
    }
}

const operate = str => {
    const arr = str.split(" ");

    if (arr.length === 1) {
        return str;
    }

    const a = +arr[0];
    const b = +arr[2];

    switch(arr[1]) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}
