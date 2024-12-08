const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div");

const checkNumber = (number) => {
  if (number === "") {
    alert("Please provide a phone number");
    return;
  }

  let isValidNumber = false;

  const redFlags = /([a-z]|^-)/gi;
  const hasOpeningParenthesis = number.includes("(");
  const hasClosingParenthesis = number.includes(")");
  const nOfHyphens = number.split("-").length - 1;

  if (
    redFlags.test(number) ||
    (hasClosingParenthesis && !hasOpeningParenthesis) ||
    (hasOpeningParenthesis && !hasClosingParenthesis)
  ) {
    showResults(isValidNumber, number);
    return;
  } else if (
    hasOpeningParenthesis &&
    hasClosingParenthesis &&
    !number.match(/\(\d{3}\)/)
  ) {
    showResults(isValidNumber, number);
    return;
  }

  if (nOfHyphens === 1 && !number.match(/(-\d{4})$/)) {
    showResults(isValidNumber, number);
    return;
  } else if (nOfHyphens === 2 && !number.match(/(-\d{3}-\d{4})$/)) {
    showResults(isValidNumber, number);
    return;
  } else if (nOfHyphens > 2) {
    showResults(isValidNumber, number);
    return;
  }

  const ignoredChars = /([\s-\(\)])/g;
  const formattedNumber = number.replace(ignoredChars, "");

  if (formattedNumber.length === 10) {
    isValidNumber = true;
  } else if (formattedNumber.length === 11 && formattedNumber[0] === "1") {
    isValidNumber = true;
  }

  showResults(isValidNumber, number);
};

const showResults = (result, number) => {
  switch (result) {
    case true:
      results.innerHTML += `<p><span style="color: #3deb1a;">Valid</span> US number: ${number}</p>`;
      break;
    default:
      results.innerHTML += `<p><span style="color: #f01616;">Invalid</span> US number: ${number}</p>`;
      break;
  }
};

const clearInput = () => {
  input.value = "";
  results.innerHTML = "";
};

checkBtn.addEventListener("click", () => checkNumber(input.value));
clearBtn.addEventListener("click", clearInput);
