//define the number is being counted
let runningTotal = 0;
//define the number that was clicked
let buffer = "0";

//the Operator that was selected
let previousOperator;

//add function button click, if click number, else symbol

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    //it is a symbol, do the function Symbol
    handleSymbol(value);
  } else {
    //it is a number, do the function Number
    handleNumber(value);
  }
  showOnScreen();
  console.log("running Total", runningTotal);
  console.log("buffer", buffer);
}

function handleNumber(value) {
  //this number is still a STRING
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer = buffer + value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "+":
    case "÷":
    case "-":
    case "×":
      handleMath(value);
      break;
    case "=":
      if (previousOperator === null) {
        //need two numbers to do math
        return;
      }
      flushOperator(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }
  //change the buffer into String
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperator(intBuffer);
  }
  previousOperator = value;
  //can be improved
  buffer = "0";
}

function flushOperator(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal = runningTotal + intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
  }
}

//show the result on the screen.
function showOnScreen() {
  document.querySelector(".screen").innerText = buffer;
}

//Select the calc-buttons, addEventListener click --> do function take the innerText

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
