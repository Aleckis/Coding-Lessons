const input = document.getElementById("number");
const button = document.getElementById("convert-btn");
const output = document.getElementById("output");

output.display = "none";

const isNumberValid = (number) => {
  if (number === "") {
    output.textContent = "Please enter a valid number";
    output.style.display = "block";
  } else if (number < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    output.style.display = "block";
  } else if (number > 3999) {
    output.textContent = "Please enter a number less than or equal to 3999";
    output.style.display = "block";
  } else {
    output.textContent = "";
    output.style.display = "none";
    return true;
  }
  return false;
};

const convertNumber = () => {
  const inputNumberValue = input.value;
  let numberCurr = parseInt(input.value);
  let romanNumberArr = [];

  if (!isNumberValid(inputNumberValue)) {
    return;
  }

  while (numberCurr > 0) {
    if (numberCurr >= 1000) {
      romanNumberArr.push("M");
      numberCurr -= 1000;
    } else if (numberCurr >= 900) {
      romanNumberArr.push("CM");
      numberCurr -= 900;
    } else if (numberCurr >= 500) {
      romanNumberArr.push("D");
      numberCurr -= 500;
    } else if (numberCurr >= 400) {
      romanNumberArr.push("CD");
      numberCurr -= 400;
    } else if (numberCurr >= 100) {
      romanNumberArr.push("C");
      numberCurr -= 100;
    } else if (numberCurr >= 90) {
      romanNumberArr.push("XC");
      numberCurr -= 90;
    } else if (numberCurr >= 50) {
      romanNumberArr.push("L");
      numberCurr -= 50;
    } else if (numberCurr >= 40) {
      romanNumberArr.push("XL");
      numberCurr -= 40;
    } else if (numberCurr >= 10) {
      romanNumberArr.push("X");
      numberCurr -= 10;
    } else if (numberCurr >= 9) {
      romanNumberArr.push("IX");
      numberCurr -= 9;
    } else if (numberCurr >= 5) {
      romanNumberArr.push("V");
      numberCurr -= 5;
    } else if (numberCurr >= 4) {
      romanNumberArr.push("IV");
      numberCurr -= 4;
    } else if (numberCurr >= 1) {
      romanNumberArr.push("I");
      numberCurr -= 1;
    }
  }

  const result = romanNumberArr.join("");

  output.textContent = result;
  output.style.display = "block";
};

button.addEventListener("click", convertNumber);
