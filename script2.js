// For a single string containing multiple numbers and operators
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

const deleteChar = str => {
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
