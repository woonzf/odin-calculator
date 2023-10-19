// Global variables
let text1 = "";
let text2 = "";
let input = "";
let isInitial = true;
let a = null;
let b = null;
let operator = null;

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelector(".button");
    const display1 = document.querySelector("#display1");
    const display2 = document.querySelector("#display2");

    buttons.addEventListener("click", (e) => {
        text1 = display1.textContent;
        text2 = display2.textContent;
        input = e.target.textContent;

        if (isNumber(input)) insertChar(input);
        if (input === "C") clear();
        if (input === "<-") deleteChar();
        if (isOperator(input)) operate(input);
    })

    // Keyboard support
    document.addEventListener("keypress", (e) => {
        console.log(e.key)
    })
})

// Functions
const isNumber = input => {
    return !isNaN(input) || input === "." ? true : false;
}

const isOperator = (input) => {
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
    // Max display length is 15
    if (text2.length > 14) {
        if (input === "00") return;
        else if (text2.length > 15) return;
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
    updateDisplay("", 0);
    a = b = operator = null;
    isInitial = true;
}

const deleteChar = () => {
    display2.textContent = text2.slice(0, -1);
}

const operate = input => {
    // Initial setup
    if (isInitial) {
        a = +text2;
        operator = input;
        updateDisplay(`${a} ${operator}`, "");
        isInitial = false;
        return;
    }

    if (input === "=") {
        operateEqual();
        return;
    }

    if (input === "%") {
        operatePercent();
        return;
    }

    operateElse();
}

const operateEqual = () => {
    // If last operation is =
    if (text1.split(" ").length === 3) {

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
    console.log(a, operator, b)

    const temp = `${a} ${operator} ${b}`;
    a = calculate();
    updateDisplay(temp, a);
}

const operatePercent = () => {

}

const operateElse = () => {
    if (text1.split(" ").length < 3 && text1 !== "") {
        b = +text2;
    }

    if (text2 !== "") {
        a = calculate();
    }

    operator = input;
    updateDisplay(`${a} ${operator}`, "");
}

const calculate = () => {
    let result = 0;

    switch(operator) {
        case "÷":
            result =  a / b;
            break;
        case "x":
            result =  a * b;
            break;
        case "-":
            result =  a - b;
            break;
        case "+":
            result =  a + b;
            break;
    }

    return result;
}

const round = number => {
    
}

const updateDisplay = (str1, str2) => {
    display1.textContent = str1;
    display2.textContent = str2;
}
