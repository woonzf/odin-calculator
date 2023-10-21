// Global variables
let text1 = "";
let text2 = "";
let a = null;
let b = null;
let operator = null;
const MAX_LENGTH = 12;

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelector(".button");
    const display1 = document.querySelector("#display1");
    const display2 = document.querySelector("#display2");

    buttons.addEventListener("click", (e) => {
        runCalculator(e.target.textContent);
    })

    // Keyboard support
    document.addEventListener("keydown", (e) => {
        let input = e.key;

        switch(input) {
            case "Delete":
                input = "C";
                break;
            case "p":
                input = "%";
                break;
            case "Backspace":
                input = "<-";
                break;
            case "/":
                input = "÷";
                break;
            case "*":
                input = "x";
                break;
            case "Enter":
                // Prevent entering last mouse click
                e.preventDefault();
                input = "=";
                break;
        }

        runCalculator(input);
    })
})

// Functions
const runCalculator = input => {
    text1 = display1.textContent;
    text2 = display2.textContent;

    if (isNumber(input)) {
        insertChar(input);
        return;
    }

    if (input === "C") {
        clear();
        return;
    }

    if (input === "<-") {
        deleteChar();
        return;
    }

    if (isOperator(input)) {
        operate(input);
        return;
    }
}

const isNumber = input => {
    // Accept number and dot
    return !isNaN(input) || input === "." ? true : false;
}

const isOperator = input => {
    switch(input) {
        case "%":
        case "÷":
        case "x":
        case "-":
        case "+":
        case "=":
            return true;
        default:
            return false;
    }
}

const insertChar = input => {
    // If max display length
    const len = text2.length;
    if (len >= MAX_LENGTH - 1) {
        if (input === "00" || len >= MAX_LENGTH) return;
    }

    // Prevent more than 1 dot
    if (text2.includes(".") && input === ".") return;

    // Auto convert to 0. if display2 is 0 or empty
    if (text2 === "0" || text2 === "00" || text2 === "") {
        if (input === ".") display2.textContent = "0.";
        else display2.textContent = input;
        return;
    }

    display2.textContent += input;
}

const clear = () => {
    a = b = operator = null;
    updateDisplay("", 0);
}

const deleteChar = () => {
    display2.textContent = text2.slice(0, -1);
}

const operate = input => {
    // Initial setup
    if (text1 === "" && input !== "=" && input !== "%") {
        // Ignore ÷ and x as first input
        if (text2 == 0 && (input === "÷" || input === "x")) return;
        
        // Allow + and - as first char
        const arr = ["+", "-", "."];
        if (!arr.some(item => text2.includes(item)) && +text2 === 0) {
            if (input === "+" || input === "-") {
                insertChar(input);
                return;
            }
        }

        // Change sign to -
        if (text2 === "+" && input === "-") {
            display2.textContent = "-";
            return;
        }

        // Change sign to +
        if (text2 === "-" && input === "+") {
            display2.textContent = "+";
            return;
        }

        // Ignore if text2 is not a number
        if (isNaN(text2)) return;

        a = +text2;
        operator = input;
        updateDisplay(`${a} ${operator}`, "");
        return;
    }

    switch(input) {
        case "=":
            operateEqual();
            break;
        case "%":
            operatePercent();
            break;
        default:
            operateElse(input);
            break;
    }
}

const operateEqual = () => {
    if (text1 === "") return;

    // If last operation is =
    if (text1.split(" ").length === 3 || text1 === "") {
        // Update a and display if text2 changes
        if (+text2 !== a && text2 !== "") {
            a = +text2;
            display1.textContent = "";
        }
        
        // Ignore
        return;
    }

    // Result is a if b is missing
    if (text1 === "" || text2 === "") {
        updateDisplay("", a);
        return;
    }

    b = +text2;
    const temp = `${a} ${operator} ${b}`;
    a = calculate();
    updateDisplay(temp, a);
}

const operatePercent = () => {
    // Update a if text2 is modified
    if (+text2 !== a && text2 !== "" && text1.split(" ").length !== 2) {
        a = +text2;
    }

    // Convert text2 if no a
    if (text1 === "" && text2 !== "") {
        // Only accept up to 0.001
        const aNew = +text2 / 100;
        if (aNew < 1e-3) return;

        a = round(aNew);
        updateDisplay("", a);
        return;
    }

    // Convert a if b is missing or last operation is % or =
    if (text2 === "" || text1.includes("%") || text1.split(" ").length === 3) {
        a = round(a / 100);
        updateDisplay("", a);
        return;
    }

    if (operator === "x") b = +text2 / 100;
    else b = a * +text2 / 100;

    const temp = a;
    a = round(calculate());
    updateDisplay(`${temp} ${operator} ${text2}%`, a);
}

const operateElse = input => {
    // Update a if text2 changes after =
    const len = text1.split(" ").length;
    if (+text2 !== a && len === 3) {
        a = +text2;
    }

    // Calculate if text2 is not empty
    if (len < 3 && text2 !== "") {
        b = +text2;
        a = calculate();
    }

    operator = input;
    updateDisplay(`${a} ${operator}`, "");
}

const calculate = () => {
    let result = 0;

    switch(operator) {
        case "÷":
            result = a / b;
            break;
        case "x":
            result = a * b;
            break;
        case "-":
            result = a - b;
            break;
        case "+":
            result = a + b;
            break;
    }

    if (isNaN(result)) return 0;
    if (!isFinite(result)) return result;
    return round(result);
}

const round = number => {
    // Round to 3 decimal if decimal more than 3
    if (number % 1 !== 0) {
        const decimal = String(number).split(".")[1].length;
        if (decimal > 3) return +(number.toFixed(3));
        return number;
    }

    return number;
}

const updateDisplay = (str1, str2) => {
    display1.textContent = str1;
    display2.textContent = str2;
}
