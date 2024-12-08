// HTML elements
const input = document.getElementById("cash");
const button = document.getElementById("purchase-btn");
const currencie = document.querySelectorAll("#cash-in-register > li > span");
const total = document.getElementById("total-amount");
const changeDiv = document.getElementById("change-due");

// Price and Cash in Draw variables
let price = 11.95;
let cid = [
  ["PENNY", 1.83],
  ["NICKEL", 3.05],
  ["DIME", 6.2],
  ["QUARTER", 4.25],
  ["ONE", 12],
  ["FIVE", 55],
  ["TEN", 120],
  ["TWENTY", 80],
  ["ONE HUNDRED", 200],
];
const values = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];

// Function to check whether the client recieves change or not and if he pays enough
const checkMoney = () => {
  const totalMoneyInRegister = cid.reduce(
    (all, item) => all + item[1] * 100,
    0
  );
  const cash = input.value;
  const due = Number(cash * 100) - price * 100;

  if (due < 0) {
    alert("Customer does not have enough money to purchase the item");
  } else if (due === 0) {
    changeDiv.innerHTML = "<h2>No change due - customer paid with exact cash</h2>"
  } else {
    calculateChange(due);
  }
};

// Function to calculate the change needed
const calculateChange = (due) => {
  const dueArr = [];
  const originalDue = due;  // Save the original due amount
  
  // Make a copy of the cid array to work with for calculations
  const cidCopy = cid.map((item) => [...item]);

  // Checks if there is enough money in cid to return change
  if (cid.reduce((acc, value) => acc + (Number(value[1]) * 100), 0) < due) {
    changeDiv.innerHTML = `<h2 style="color: #C01717;">Status: INSUFFICIENT_FUNDS</h2>`;
    return;  // Stop the function if there are insufficient funds
  }

  for (let i = cidCopy.length - 1; i >= 0; i--) {  // Run through cidCopy backwards
    // Checks if due is greater or equal to the value and if there's enough money to return as change
    if (due >= values[i] && cidCopy[i][1] > 0) {
      // Defines how many of a value is present and how much is needed
      const amountAvailable = Math.floor((cidCopy[i][1] * 100) / values[i]);
      const amountNeeded = Math.floor(due / values[i]);

      // Determine how many units of the current denomination to return
      const amountToReturn = Math.min(amountNeeded, amountAvailable);

      if (amountToReturn > 0) {
        // Deduct the change of a certain value from the cidCopy and add it to dueArr at first position
        due -= (amountToReturn * values[i]).toFixed(2);
        cidCopy[i][1] -= ((amountToReturn * values[i]) / 100).toFixed(2);
        dueArr.unshift([cidCopy[i][0], ((amountToReturn * values[i]) / 100).toFixed(2)]);
      }
    }
  }

  // Validate that the sum of dueArr equals the original due amount
  const totalReturned = dueArr.reduce((acc, value) => acc + (value[1] * 100), 0);
  if (totalReturned !== originalDue) {
    changeDiv.innerHTML = `<h2 style="color: #C01717;">Status: INSUFFICIENT_FUNDS</h2>`;
    return;  // Stop if it can't provide exact change
  }

  // If everything is successful, update the original cid and HTML display
  cid = cidCopy;

  // Display cid
  Array.from(currencie).forEach(
    (item, index) => (item.textContent = cid[index][1])
  );
  
  // Display status
  if(cid.reduce((acc, value) => acc + value[1], 0) === 0) {
    changeDiv.innerHTML = `<h2 style="color: #EDDB0D;">Status: CLOSED</h2>`;
  } else {
    changeDiv.innerHTML = `<h2 style="color: #0DDD2A;">Status: OPEN</h2>`;
  }

  // Display change form highest to lowest and clean input value
  dueArr.reverse().forEach(item => changeDiv.innerHTML+= `<p>${item[0]}: $${item[1]}</p>`)
  input.value = "";
};

// Display the values of the variables in the HTML elements
total.textContent = price;
Array.from(currencie).forEach(
  (item, index) => (item.textContent = cid[index][1])
);

// Event listener of the purchase button
button.addEventListener("click", checkMoney);
