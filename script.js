document.addEventListener("DOMContentLoaded", function () {
  let inputExpenceName = document.getElementById("input-expense");
  let inputExpenceAmount = document.getElementById("input-amount");
  let expenseForm = document.getElementById("input-form");
  let expensesListDisplay = document.getElementById("expenses-list");
  let totalAmoutDisplay = document.getElementById("total-amout");
  let noExpensesDisplay = document.getElementById("no-expenses-display");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  renderExpenses();

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = inputExpenceName.value;
    let amount = parseFloat(inputExpenceAmount.value);
    let expense = {
      id: Date.now(),
      name,
      amount,
    };
    expenses.push(expense);
    saveExpensesToLS();
    renderExpenses();
    inputExpenceAmount.value = "";
    inputExpenceName.value = "";
  });

  async function renderExpenses() {
    let totalAmount = 0;
    expensesListDisplay.innerHTML = "";
    if (expenses.length > 0) {
      expensesListDisplay.classList.remove("hidden");
      totalAmoutDisplay.classList.remove("hidden");
      noExpensesDisplay.classList.add("hidden");
      expenses.forEach((expense) => {
        const li = document.createElement("li");
        li.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "my-1",
          "border",
          "rounded-sm",
          "py-2",
          "px-4"
        );
        li.innerHTML = `
            <p>${expense.name} - ₹${expense.amount}</p>
            <button
            id="${expense.id}"
            class="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md"
            >
            Delete
            </button>
        `;
        expensesListDisplay.appendChild(li);
        totalAmount += expense.amount;
      });
    } else {
      expensesListDisplay.classList.add("hidden");
      totalAmoutDisplay.classList.add("hidden");
      noExpensesDisplay.classList.remove("hidden");
    }
    const p = document.querySelector("#total-amout > p");
    p.textContent = `Total: ₹${totalAmount}`;
  }

  totalAmoutDisplay.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      expenses.length = 0;
      saveExpensesToLS();
      renderExpenses();
    }
  });

  expensesListDisplay.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const btnId = e.target.id;
      expenses = expenses.filter((expense) => expense.id != btnId);
      saveExpensesToLS();
      renderExpenses();
    }
  });

  function saveExpensesToLS() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
});
