let expression = "0";
let result = "";
let canUseDecimal = true;
const operations = ["+", "-", "*", "/"];

$(document).ready(() => {
  $(".buttons")
    .children()
    .each(function () {
      $(this).on("click", function () {
        const value = $(this).text();

        if (expression === "0" && value === "0") {
        } else if (value === "=") {
          try {
            result = parseFloat(eval(expression).toFixed(4));
            $("#display").text(result);
            expression = "0";
            canUseDecimal = true; 
          } catch (error) {
            $("#display").text("Error");
            expression = "0"; 
          }
        } else if (value === "AC") {
          expression = "0";
          $("#display").text("0");
          canUseDecimal = true; 
        } else if (value === ".") {
          if (canUseDecimal) {
            expression += value;
            $("#display").text(expression);
            canUseDecimal = false; 
          } else {
            return; 
          }
        } else if (operations.includes(value)) {
          canUseDecimal = true;
          if (operations.includes(expression[expression.length - 1]) && value !== "-") {
            expression = expression.replace(/[\+\-\*\/]+$/, ""); 
            expression += value;
          } else {
            expression += value; 
          }
        } else {
          if (expression === "0" && value !== "0") {
            expression = value; 
          } else {
            expression += value; 
          }
          $("#display").text(expression);
        }

        console.log(expression);
      });
    });
});
