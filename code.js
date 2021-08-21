"use strict"

// functions
let check = (item, _class) => item.classList.contains(_class);

//dom elements
let toggleThemes = document.querySelector(".theme-toggle");

let numbers = [...document.getElementsByClassName("num-js")];

let operations = [...document.getElementsByClassName("op-js")];

let screen = document.querySelector(".screen");

let clear = document.querySelector(".reset-btn");

let equal = document.querySelector(".equal-btn");

let del = document.querySelector(".delete-btn");

//variables
let themeNumber = localStorage.getItem("themeNumber");

let calculator = {
    shownValue: "0",
    currentOperation: "",
    firstValue: 0,
    onhold: false,
    opDone: false,
    add: (x, y) => {
        return x + y;
    },
    sub: (x, y) => {
        return x - y;
    },
    mul: (x, y) => {
        return x * y;
    },
    div: (x, y) => {
        return x / y;
    },
    clear: function () {
        this.shownValue = "0";
    },
    delete: function () {
        this.shownValue = this.shownValue.slice(0, -1);
    },
    equal: function (currentOperation, x) {
        this.shownValue = currentOperation(x, this.shownValue);
    }
};
//local storage
themeNumber ? document.body.classList = `theme-${themeNumber}` : themeNumber = 1;


//event listner
toggleThemes.addEventListener("click", () => {
    themeNumber++;
    if (themeNumber === 4) {
        themeNumber = 1;
    }
    document.body.classList = `theme-${themeNumber}`;
    localStorage.setItem("themeNumber", themeNumber);
})


let update = () => {
    calculator.shownValue = calculator.shownValue.length >= 15 ?
        calculator.shownValue.substring(0, 15) :
        calculator.shownValue;
    screen.innerText = calculator.shownValue;
};

clear.addEventListener("click", () => {
    calculator.clear();
    update();
});

del.addEventListener("click", () => {
    calculator.delete();
    update();
})

//handling operations
operations.forEach(op => {
    op.addEventListener("click", e => {
        if (!calculator.onhold) {
            calculator.currentOperation = e.target.id;
            calculator.firstValue = parseFloat(calculator.shownValue);
            calculator.shownValue = "0";
            calculator.onhold = true
        }

        ;
    });
});

//handling numbers
numbers.forEach(num => {
    num.addEventListener("click", event => {
        let targetValue = event.target.innerText;
        if (calculator.shownValue === "0" || calculator.opDone === true) {
            calculator.shownValue = targetValue;
            calculator.opDone = false;
            update();
        } else {
            if (!(targetValue === "." && calculator.shownValue.includes("."))) {
                calculator.shownValue += targetValue;
                update();
            }
        }
    });
});

//getting results
equal.addEventListener("click", () => {
    calculator.shownValue = parseFloat(calculator.shownValue);
    calculator.equal(
        calculator[`${calculator.currentOperation}`],
        calculator.firstValue
    );
    update();
    calculator.firstValue = calculator.shownValue;
    calculator.onhold = false;
    calculator.opDone = true;
});