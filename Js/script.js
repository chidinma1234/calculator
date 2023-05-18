'use strict';
const buttons = document.querySelectorAll('.button');
const arr = Array.from(buttons);
const html = document.querySelector('html');

const currentInput = document.querySelector('.current-input');
const btns = document.querySelector('.buttons');
const specialBtn = document.querySelector('.special-buttons');

arr.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const colorModes = ['theme1', 'theme2', 'theme3'];
    html.setAttribute('data-color-mode', colorModes[index]);
    arr.forEach((item, itemIndex) => {
      if (itemIndex !== index) {
        item.style.opacity = '0';
      } else {
        item.style.opacity = '1';
      }
    });
  });
});

//creating an object to keep track of the firstOperand,operator,displayValue
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const updateDisplay = function () {
  currentInput.textContent = calculator.displayValue;
};
updateDisplay();
//function to check btn that is clicked
const handleClickOnBtn = function (target) {
  if (target.classList.contains('key-operator')) {
    handleOperator(target.textContent);
  } else if (target.classList.contains('clear')) {
    deleteDigit();
  } else if (target.classList.contains('decimal')) {
    inputDecimal(target.textContent);
  } else if (target.textContent) {
    inputDigit(target.textContent);
  }
  updateDisplay();
};

const handleClickOnSpecialBtn = function (target) {
  if (target.classList.contains('key-operator')) {
    handleOperator(target.textContent);
  } else if (target.classList.contains('reset')) {
    resetCalculator();
  }
  updateDisplay();
};

//function to display on the screen
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
}
//function to display decimal
function inputDecimal(dot) {
  //check if the displayValue has the decimal point
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperand) {
  const { firstOperand, displayValue, operator } = calculator;

  const targetValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperand;
    return;
  }
  if (firstOperand === null && !isNaN(targetValue)) {
    calculator.firstOperand = targetValue;
  } else if (operator) {
    const result = calculate(firstOperand, targetValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperand;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function deleteDigit() {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue.slice(0, -1);
  if (calculator.displayValue === '') {
    calculator.displayValue = '0';
  }
}

//EventListener
btns.addEventListener('click', (e) => {
  const { target } = e;
  if (!target) return;
  handleClickOnBtn(target);
});

specialBtn.addEventListener('click', (e) => {
  const { target } = e;
  if (!target) return;
  handleClickOnSpecialBtn(target);
});
