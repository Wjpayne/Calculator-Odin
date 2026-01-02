//Global variables

const display = document.getElementById("display");
let currentInput = "";
let operator = null;
let previousInput = "";

//update display function

function updateDisplay() {
  display.textContent = currentInput || "0";
}

//append number function

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  currentInput += number;
  updateDisplay();
}

//choose operator function

function chooseOperator(op) {
  // allow negative numbers
  if (currentInput === "" && op === "-") {
    currentInput = "-";
    updateDisplay();
    return;
  }

  if (currentInput === "") return;

  if (previousInput !== "") compute();
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

//compute function

function compute() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  let computation;
  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = "";
  updateDisplay();
}

//clear function

function clearCalculator() {
  currentInput = "";
  operator = null;
  previousInput = "";
  updateDisplay();
}

// Number buttons
document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.innerText));
});

// Operator buttons
document.querySelectorAll("[data-action]").forEach((button) => {
  const action = button.dataset.action;
  if (["add", "subtract", "multiply", "divide"].includes(action)) {
    button.addEventListener("click", () => chooseOperator(button.innerText));
  }
});

// Equals and Clear
document
  .querySelector("[data-action='equals']")
  .addEventListener("click", compute);
document
  .querySelector("[data-action='clear']")
  .addEventListener("click", clearCalculator);

// Backspace
document
  .querySelector("[data-action='backspace']")
  .addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  });

// --- Keyboard support ---
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Numbers
  if (/\d/.test(key)) {
    appendNumber(key);
  }

  // Decimal
  if (key === ".") appendNumber(".");

  // Operators
  if (["+", "-", "*", "/"].includes(key)) chooseOperator(key);

  // Enter = Compute
  if (key === "Enter" || key === "=") {
    compute();
    e.preventDefault(); // prevent form submission
  }

  // Backspace
  if (key === "Backspace") backspace();
  e.preventDefault();

  // Delete = clear
  if (key === "Delete") clearCalculator();
  e.preventDefault();

  // N = toggle sign
  if (key.toLowerCase() === "n") toggleSign();
});

// Initial display

updateDisplay();
