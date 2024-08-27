
let currOperator = null;
let num1 = null;
let num2 = null;
let lockScreen = false;
let isDecimal = false;


let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
//make message for divide by 0
let divide = (a,b) => {
    if(b == 0) {
        lockScreen = true;
        return "CAN'T DIVIDE BY 0!";
    }
    return a / b;
};

let power = (a,b) => Math.pow(a, b);



const displayCurrent = document.getElementById('displayCurrent');
const displayFull = document.getElementById('displayFull');

const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const divideBtn = document.getElementById('divBtn');
const eqBtn = document.getElementById('eqBtn');
const delBtn = document.getElementById('delBtn');
const clearBtn = document.getElementById('clearBtn');
const decimalBtn = document.getElementById('decimalBtn');
const signBtn = document.getElementById('signBtn');
const powerBtn = document.getElementById('powerBtn');

const numButtons = document.getElementsByClassName('num');

for(const element of numButtons) {
    element.addEventListener('click', () => {
        if(lockScreen) {
            return;
        }
        if(hitOp) {
            //once you hit a number after an operator it locks in the operator
            currOperator = opToChange;
            hitOp = false;
            opToChange = null;
            //find out the operator to display it to full
            let opString = "null";
            switch(currOperator) {
                case add:
                    opString = "+";
                    break;
                case subtract:
                    opString = "-";
                    break;
                case multiply:
                    opString = "x";
                    break;
                case divide:
                    opString = "/";
                    break;
                case power:
                    opString = "^";
                    break;
            }
            displayFull.textContent = displayCurrent.textContent + " " + opString + " ";
            displayCurrent.textContent = element.textContent;
        } else {
            //check if number too big to add more
            const str = displayCurrent.textContent;
            if(str.length >= 20) {
                return
            }
            displayCurrent.textContent += element.textContent;
        }
        
    });
};

let hitOp = false;
let opToChange = null;
//let noNumsAllowed = false;

function operatorListener(op) {
    //for divide by 0 screen lock or if a not a number is there
    if(lockScreen || parseFloat(displayCurrent.textContent) == NaN) {
        return;
    }
    //means we are not doing calculation yet, so lock in this number as num1, and notify that we hit an operator
    //we can still change until we lock in the operator using numbers
    if(currOperator == null) {
        num1 = parseFloat(displayCurrent.textContent);
        hitOp = true;
        opToChange = op;
    } else {
        //we are doing calculation
        num2 = parseFloat(displayCurrent.textContent);
        num1 = currOperator(num1, num2);
        currOperator = null;
        hitOp = true;
        opToChange = op;
        displayFull.textContent += `${num2} = ${num1}`;
        displayCurrent.textContent = num1;
    }
    isDecimal = false;
}

addBtn.addEventListener('click', () => {
    operatorListener(add);
});

subtractBtn.addEventListener('click', () => {
    operatorListener(subtract);
});

multiplyBtn.addEventListener('click', () => {
    operatorListener(multiply);
});

divideBtn.addEventListener('click', () => {
    operatorListener(divide);
});

powerBtn.addEventListener('click', () => {
    operatorListener(power);
})



eqBtn.addEventListener('click', () => {
    if(currOperator != null) {
        let str = displayCurrent.textContent;
        num2 = parseFloat(str);
        num1 = currOperator(num1, num2);
        displayCurrent.textContent = num1;
        str = displayCurrent.textContent;
        currOperator = null;
        hitOp = false;
        opToChange = null;

        //displayFull
        displayFull.textContent += `${num2} = ${num1}`;

        //check if decimal there
        if(str.includes(".")) {
            isDecimal = true;
        } else {
            isDecimal = false;
        }
        //check if NaN, if so lock screen
        if(str == "NaN") {
            lockScreen = true;
        }
    }
});

delBtn.addEventListener('click', () => {
    if(lockScreen) {
        return;
    }
    let str = displayCurrent.textContent;
    //do not delete for Infinity as NAN
    if(str == "Infinity") {
        return;
    }
    if(str.length > 0) {
        //check if removing the decimal point
        if(str.substring(str.length - 1) == ".") {
            isDecimal = false;
        }
        displayCurrent.textContent = str.slice(0, -1);
    }    
});

clearBtn.addEventListener('click', () => {
    displayCurrent.textContent = 0;
    displayFull.textContent = "";
    num1 = null;
    num2 = null;
    currOperator = null;
    hitOp = false;
    opToChange = null;
    lockScreen = false;
    isDecimal = false;
});

//decimal problems and sign probelms when you input . or +/- right after operator, which causes the decimal or sign to 
//be ignored, also might want to add something where decimal gets a 0 appended to it if nothing else is in there
// then style the buttons
//optional add a power and a % for either mod or percent

decimalBtn.addEventListener('click', () => {
    if(isDecimal) {
        return;
    }
    //for divide by 0 screen lock or if a not a number is there
    if(lockScreen || parseFloat(displayCurrent.textContent) == NaN) {
        return;
    }
    displayCurrent.textContent += '.';
    isDecimal = true;
});

signBtn.addEventListener('click', () => {
    //for divide by 0 screen lock or if a not a number is there
    if(lockScreen || parseFloat(displayCurrent.textContent) == NaN) {
        return;
    }
    const str = displayCurrent.textContent;
    if(str.includes("-")) {
        displayCurrent.textContent = str.slice(1);
    } else {
        displayCurrent.textContent = "-" + str;
    }
});




