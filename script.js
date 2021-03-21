//
// Blinking prompt
//
const blinkTimeMS = 500;
const blinkPrompt = document.querySelector('#blink_prompt');

setInterval(() => {
    blinkPrompt.style.opacity = 1 - blinkPrompt.style.opacity;
}, blinkTimeMS);

//
// Calcuator functions
//

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x + y;
}

function operate(operator, x, y) {
    switch (operator){
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '*':
            return multiply(x,y);
        case '/':
            return divide(x,y);
        default:
            console.error('Invalid operation');
    }
}

//
// Calculator UI
//

const numeralButtons = document.querySelectorAll('.numeral_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const clearButton = document.querySelector('#clear_button');
const backspaceButton = document.querySelector('#backspace_button')
const display = document.querySelector('#display_text');

function clearInput() {
    display.textContent = '';
}

function backspaceInput() {
    if (display.textContent.length > 1) {
        const numLength = display.textContent.length;
        display.textContent =  display.textContent.slice(0, numLength - 1);
    } else {
        display.textContent = '';
    }
}

function handleNumberInput(numeral) {
    if (numeral === '.') {
        if (!display.textContent.includes('.')){
            display.textContent = display.textContent + numeral;
        }
    } else if (!isNaN(numeral)) {
        display.textContent = display.textContent + numeral;
    } else {
        console.error('Invalid numeral input');
    }
}


//
// Event Listeners
//

clearButton.addEventListener('click', clearInput);

backspaceButton.addEventListener('click', backspaceInput);

numeralButtons.forEach(numeralButton => {
    numeralButton.addEventListener('click', e => handleNumberInput(e.target.value));
});

document.addEventListener('keydown', e => {
    if (e.key.match(/[0-9]|\./)) { // contains 0-9 or full stop
        handleNumberInput(e.key);1
    }
    if (e.keyCode === 8) { // backspace button
        e.preventDefault();
        backspaceInput();
    } 
});
    