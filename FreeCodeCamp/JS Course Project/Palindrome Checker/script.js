const inputElement = document.getElementById("text-input");
const buttonElement = document.getElementById("check-btn");
const resultElement = document.getElementById("result");

const cleanString = (sample) => {
    const regex = /[a-zA-Z0-9]/i;

    let letters = [];
    for (const char of sample) {
        if (regex.test(char)) {
            letters.push(char);
        }
    }
    return letters.join("").toLowerCase();
};

const showResults = (text, isPalindrome) => {
    resultElement.style.display = "block";
    if (isPalindrome) {
        resultElement.style.color = "#3de605";
        resultElement.innerText = `${text} is a palindrome`;
    } else {
        resultElement.style.color = "#ff1100";
        resultElement.innerText = `${text} is not a palindrome`;
    }
}

const checkPalindrome = () => {
    const originalText = inputElement.value;
    let isPalindrome = true;

    if (originalText === "") {
        alert("Please input a value");
        return;
    }

    const text = cleanString(originalText);
    let letters = [];

    for (const char of text) {
        letters.push(char);
    }

    let index = 1;
    for (const letter of letters) {
        if (letter !== letters[letters.length - index]) {
            isPalindrome = false;
            break;
        }
        index++;
    }

    showResults(originalText, isPalindrome)
};

buttonElement.addEventListener("click", checkPalindrome);
