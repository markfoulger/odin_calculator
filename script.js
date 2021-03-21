//
// Blinking prompt
//
const blinkTimeMS = 500;
const blinkPrompt = document.querySelector('#blink_prompt');

setInterval(() => {
    blinkPrompt.style.opacity = 1 - blinkPrompt.style.opacity;
}, blinkTimeMS);

//
// Calculator functions
//

function add(x, y) {
    return +x + +y;
}

function subtract(x, y) {
    return +x - +y;
}

function multiply(x, y) {
    return +x * +y;
}

function divide(x, y) {
    if (+y == 0) {
        alert('Oi! do not divide by zero');
        return '';
    } 
    return Number((+x / +y).toFixed(4));;
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
            return '';
    }
}

//
// Calculator UI
//

const numeralButtons = document.querySelectorAll('.numeral_button');
const operatorButtons = document.querySelectorAll('.operator_button');
const clearButton = document.querySelector('#clear_button');
const backspaceButton = document.querySelector('#backspace_button')
const equalsButton = document.querySelector('.equals_button');
const display = document.querySelector('#display_text');

function clearInput() {
    display.textContent = '';
}

function backspaceInput() {
    const [x, operator, y] = display.textContent.split(' ');
    if (operator === undefined) {
        display.textContent = x.substring(0, x.length - 1);
    } else {
        if (y === '') {
            display.textContent = x;
        } else {
            const len = display.textContent.length;
            display.textContent = display.textContent.substring(0, len - 1);
        }
    }
}

function handleNumberInput(numeral) {
    const [x, operator, y] = display.textContent.split(' ');
    const currentDigit = operator === undefined ? x : y;
    if (numeral === '.' && currentDigit.includes('.')) {
        return;
    }
    display.textContent = display.textContent + numeral;
}

function handlerOperatorInput(op) {
    const [x, operator, y] = display.textContent.split(' ');
    if (operator === undefined) {
        display.textContent += ` ${op} `;
    } else {
        if (y === '') {
            display.textContent = x + ` ${op} `;
        } else {
            parseCalculation();
        }
    }
}

function parseCalculation() {
    const [x, operator, y] = display.textContent.split(' ');
    if (y && y !== '') {
        display.textContent = operate(operator, x, y);
    }
}

//
// Event Listeners
//

clearButton.addEventListener('click', clearInput);

backspaceButton.addEventListener('click', backspaceInput);

equalsButton.addEventListener('click', parseCalculation);

numeralButtons.forEach(numeralButton => {
    numeralButton.addEventListener('click', e => handleNumberInput(e.target.value));
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', e => handlerOperatorInput(e.target.dataset.operator))
});

document.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.key.match(/[0-9]|\./)) { // contains 0-9 or full stop
        handleNumberInput(e.key);
    } else if (e.key === 'Backspace') { // backspace button
        backspaceInput();
    } else if (e.key.match(/\+|\-|\*|\//)) { // +, -, /, * operator buttons
        handlerOperatorInput(e.key);
    } else if (e.key ==='Enter') {
        parseCalculation();
    }
});
    