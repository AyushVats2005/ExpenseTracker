// Initialize data
let transactions = [//array containing different object data
  {
    id: 1,
    date: "2025-01-14",
    category: "Subscription",
    amount: -440,
    status: "Success",
    type: "expense",
  },
  {
    id: 2,
    date: "2025-01-10",
    category: "Transfer",
    amount: -440,
    status: "Success",
    type: "expense",
  },
  {
    id: 3,
    date: "2025-01-08",
    category: "Transfer",
    amount: -440,
    status: "Success",
    type: "expense",
  },
];

let monthlyIncome = 2645;//montlyIncome input from dashboard
let monthlyExpenses = 1895;//monthly Expenses from dashboard

// Set today's date as default
const today = new Date().toISOString().split("T")[0];//customizing just for it to give date
document.getElementById("incomeDate").value = today;//storing income date
document.getElementById("expenseDate").value = today;//storing expense date

// Modal functions
function openIncomeModal() {
  document.getElementById("incomeModal").style.display = "block";//makes the id visible
  document.body.style.overflow = "hidden";//prevents background scrolling
}

function openExpenseModal() {
  document.getElementById("expenseModal").style.display = "block";//makes the id visible
  document.body.style.overflow = "hidden";//prevents background scrolling
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";//removing the display of modal
  document.body.style.overflow = "auto";//back to default

  // Reset forms
  if (modalId === "incomeModal") {
    document.getElementById("incomeForm").reset();//resets value after closing
    document.getElementById("incomeDate").value = today;//reassigning value of today
  } else {
    document.getElementById("expenseForm").reset();
    document.getElementById("expenseDate").value = today;
  }
}

// Close modal when clicking outside
window.onclick = function (event) {
  const incomeModal = document.getElementById("incomeModal");
  const expenseModal = document.getElementById("expenseModal");

  if (event.target === incomeModal) {
    closeModal("incomeModal");
  }
  if (event.target === expenseModal) {
    closeModal("expenseModal");
  }
};

// Add income function
function addIncome() {
  const amount = parseFloat(document.getElementById("incomeAmount").value);
  const category = document.getElementById("incomeCategory").value;
  const description = document.getElementById("incomeDescription").value;
  const date = document.getElementById("incomeDate").value;

  if (!amount || !category || !date) {
    alert("Please fill in all required fields");//alert message 
    return;
  }

  // Add to transactions
  const newTransaction = {//object
    id: transactions.length + 1,
    date: date,
    category: category.charAt(0).toUpperCase() + category.slice(1),//First Letter UpperCase
    amount: amount,
    status: "Success",
    type: "income",
    description: description,
  };

  transactions.unshift(newTransaction);

  // Update monthly income
  monthlyIncome += amount;
  updateDashboard();
  updateTransactionsTable();

  closeModal("incomeModal");

  // Show success message
  showNotification("Income added successfully!", "success");
}

// Add expense function
function addExpense() {
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const description = document.getElementById("expenseDescription").value;
  const date = document.getElementById("expenseDate").value;

  if (!amount || !category || !date) {
    alert("Please fill in all required fields");//alert message
    return;
  }

  // Add to transactions
  const newTransaction = {//object
    id: transactions.length + 1,
    date: date,
    category: category.charAt(0).toUpperCase() + category.slice(1),//First Letter UpperCase
    amount: -amount,//negative since in expense
    status: "Success",
    type: "expense",
    description: description,
  };

  transactions.unshift(newTransaction);

  // Update monthly expenses
  monthlyExpenses += amount;
  updateDashboard();
  updateTransactionsTable();

  closeModal("expenseModal");

  // Show success message
  showNotification("Expense added successfully!", "success");
}