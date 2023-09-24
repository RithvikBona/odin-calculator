
let currOperator = null;
let num1 = null;
let num2 = null;


let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
//make message for divide by 0
let divide = (a,b) => a/b;

const displayCurrent = document.getElementById('displayCurrent');
const displayFull = document.getElementById('displayFull');

const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divBtn');
const eqBtn = document.getElementById('eqBtn');

const numButtons = document.getElementsByClassName('num');

for(const element of numButtons) {
    element.addEventListener('click', () => {
        if(hitOp) {
            currOperator = opToChange;
            hitOp = false;
            opToChange = null;
            displayCurrent.textContent = element.textContent;
        } else {
            displayCurrent.textContent += element.textContent;
        }
        
    });
};

let hitOp = false;
let opToChange = null;
//let noNumsAllowed = false;

addBtn.addEventListener('click', () => {
    if(currOperator == null) {
        num1 = parseInt(displayCurrent.textContent);
        hitOp = true;
        opToChange = add;
    } else {
        num2 = parseInt(displayCurrent.textContent);
        num1 = currOperator(num1, num2);
        currOperator = null;
        hitOp = true;
        opToChange = add;
        displayCurrent.textContent = num1;
    }
});

subtractBtn.addEventListener('click', () => {
    if(currOperator == null) {
        num1 = parseInt(displayCurrent.textContent);
        hitOp = true;
        opToChange = subtract;
    } else {
        num2 = parseInt(displayCurrent.textContent);
        num1 = currOperator(num1, num2);
        currOperator = null;
        hitOp = true;
        opToChange = subtract;
        displayCurrent.textContent = num1;
    }
});

multiplyBtn.addEventListener('click', () => {
    if(currOperator == null) {
        num1 = parseInt(displayCurrent.textContent);
        hitOp = true;
        opToChange = multiply;
    } else {
        num2 = parseInt(displayCurrent.textContent);
        num1 = currOperator(num1, num2);
        currOperator = null;
        hitOp = true;
        opToChange = multiply;
        displayCurrent.textContent = num1;
    }
});

divideBtn.addEventListener('click', () => {
    if(currOperator == null) {
        num1 = parseInt(displayCurrent.textContent);
        hitOp = true;
        opToChange = divide;
    } else {
        num2 = parseInt(displayCurrent.textContent);
        num1 = currOperator(num1, num2);
        currOperator = null;
        hitOp = true;
        opToChange = divide;
        displayCurrent.textContent = num1;
    }
});

eqBtn.addEventListener('click', () => {
    if(currOperator != null) {
        num1 = currOperator(num1, num2);
        displayCurrent.textContent = num1;
        currOperator = null;
    }
});



