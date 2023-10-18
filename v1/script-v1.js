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
    const inputField = document.querySelector(".input");
    const resultField = document.querySelector(".result");
    
    let text = "";
    let result = "";

    buttons.forEach(button => {
        if (button.textContent === "C") {
            button.classList.add("clear");
        }

        button.addEventListener("click", () => {
            const input = button.textContent;
            const temp = result;

            // If input is not action and operator
            if (!isAction(input) && !isOperator(input)) {
                // Insert character
                result = insertChar(input, result);
                
                // Ignore input if max length
                if (result.length > 16) {
                    result = temp;
                }
            }

            // If input is operator
            if (isOperator(input)) {
                if (typeof text === "number") {
                    text = String(text);
                }

                // Replace operator if last input is operator
                if (isOperator(text.charAt(text.length - 1))) {
                    if (result !== "") {
                        text = isError(operate(text + " " + result)) + " " + input;
                    } else {
                        text = text.split(" ")[0] + " " + input;
                    }
                } else {
                    text = result + " " + input;
                }

                result = "";
            }
            
            // If input is action
            if (isAction(input)) {
                switch(input) {
                    // Clear input and result field
                    case "C":
                        text = "";
                        result = "0";
                        break;
                    // Convert percentage
                    case "%":
                        result = isError(text.split(" ")[0] / 100);
                        text = result;
                        break;
                    // Delete last character
                    case "<-":
                        result = result.slice(0, -1);
                        break;
                    // Calculate
                    case "=":
                        if (text !== "") {
                            if (isOperator(text.charAt(text.length - 1))) {
                                text = text + " " + result;
                            }
                        } else {
                            text = result;
                        }

                        result = isError(operate(text));
                        break;
                }
            }

            inputField.textContent = text;
            resultField.textContent = result;
        });
    });
});

// Functions
const isAction = str => {
    switch(str) {
        case "C":
        case "%":
        case "<-":
        case "=":
            return true;
        default:
            return false;
    }
}

const isOperator = str => {
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

const isError = str => {
    if (isNaN(str)) {
        return "Oops!";
    }
    else if (!isFinite(str)) {
        return "Infinity and be...";
    } else {
        return round(str);
    }
}

const insertChar = (input, str) => {
    // If str starts with 0
    if (+str === 0) {
        // Return 0. if first input is .
        if (input === ".") {
            return 0 + input;
        }

        // Allow decimal
        if (str.startsWith("0.")) {
            return str + input;
        }
        
        // Prevent integer starts with 0
        return str.slice(1, -1) + input;
    }

    // Ignore . if str is decimal
    if (input === ".") {
        if (+str % 1 !== 0 || str.endsWith(".")) {
            return str;
        }
    }

    return str + input;
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
            return a + b;
        case "-":
            return a - b;
        case "x":
            return a * b;
        case "÷":
            return a / b;
    }
}

const round = str => {
    // Convert to string if variable is number
    if (typeof str === "number") {
        str = String(str);
    }

    // If decimal
    if (str % 1 !== 0) {
        const decimal = str.split(".")[1];

        // Round to 3 decimal if decimal more than 3
        if (decimal.length > 3) {
            return parseFloat(str).toFixed(3);
        }
    }

    return str;
}
