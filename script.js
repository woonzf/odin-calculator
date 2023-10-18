// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelector(".button");
    const display1 = document.querySelector("#display1");
    const display2 = document.querySelector("#display2");

    buttons.addEventListener("click", (e) => {
        const input = e.target.textContent;

        if (isNumber(input)) insertChar(input)
        if (input === "C") clear()
        if (input === "<-") deleteChar()
        if (isOperator(input)) operate(input)
    })

    // Keyboard support
    document.addEventListener("keypress", (e) => {
        console.log(e.key)
    })
})

// Functions
const isNumber = input => {
    return !isNaN(input) || input === "." ? true : false
}

const isOperator = (input) => {
    switch(input) {
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
    const text = display2.textContent;

    // Max display length is 15
    if (text.length > 14) {
        if (input === "00") return
        else if (text.length > 15) return
    }

    // Prevent more than 1 dot
    if (text.includes(".") && input === ".") return

    if (text === "0" || text === "00") {
        if (input === ".") display2.textContent = "0.";
        else display2.textContent = input;
        return
    }

    display2.textContent += input;
}

const clear = () => {
    display1.textContent = "";
    display2.textContent = 0;
}

const deleteChar = () => {
    display2.textContent = display2.textContent.slice(0, -1);
}

const operate = input => {
    if (display1.textContent === "") {
        display1.textContent = display2.textContent + " " + input;
        display2.textContent = "";
        return
    }

    const d1Len = display1.textContent.split(" ").length;

    if (d1Len > 2) {
        display1.textContent = display2.textContent + " " + input;
        display2.textContent = "";
    }

    const arr = display1.textContent.split(" ");
    const a = +arr[0];
    const b = +display2.textContent;
    const operator = arr[1];

    console.log(a, b, operator)

    let result = "";

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

    if (input === "=") {
        display1.textContent += " " + b;
        display2.textContent = result;
        return
    }

    display1.textContent = result + " " + input;
    display2.textContent = "";
}
