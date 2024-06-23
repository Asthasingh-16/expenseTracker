document.addEventListener("DOMContentLoaded", () => {
    const balanceAmount = document.getElementById("balance-amount");
    const incomeAmount = document.getElementById("income-amount");
    const expenseAmount = document.getElementById("expense-amount");
    const transactionButton = document.getElementById("add-transaction-button");
    const noteInput = document.getElementById("note-placeholder");
    const amountInput = document.getElementById("amount-placeholder");
    const transactionTypeInputs = document.getElementsByName("transaction-type");
    const transactionHistory = document.querySelector(".history");

    let balance = 0;
    let income = 0;
    let expense = 0;

    transactionButton.addEventListener("click", () => {
        const note = noteInput.value;
        const amount = parseFloat(amountInput.value);
        let transactionType;
5
        for (const input of transactionTypeInputs) {
            if (input.checked) {
                transactionType = input.value;
                break;
            }
        }

        if (note && !isNaN(amount) && transactionType) {
            addTransaction(note, amount, transactionType);
            noteInput.value = "";
            amountInput.value = "";
        } else {
            alert("Please enter a valid note, amount, and select a transaction type");
        }
    });

    
    function addTransaction(note, amount, type) {
        if (type === "income") {
            income += amount;
            incomeAmount.innerHTML = `<i class="fa fa-inr"></i> ${income.toFixed(2)}`;
        } else {
            expense += amount;
            expenseAmount.innerHTML = `<i class="fa fa-inr"></i> ${expense.toFixed(2)}`;
        }
        updateBalance();
        addTransactionToHistory(note, amount, type);
    }

    function updateBalance() {
        balance = income - expense;
        balanceAmount.innerHTML = `<i class="fa fa-inr"></i> ${balance.toFixed(2)}`;
    }

    function addTransactionToHistory(note, amount, type) {
        const transactionElement = document.createElement("div");
        transactionElement.classList.add("transaction-item");
        transactionElement.style.display = "flex";
        transactionElement.style.justifyContent = "space-between";
        transactionElement.style.padding = "10px 0";
        transactionElement.style.borderBottom = "1px solid #eee";

        const amountDisplay = type === "income" ? amount.toFixed(2) : `- ${amount.toFixed(2)}`;

        transactionElement.innerHTML = `
            <span>${note}</span>
            <span><i class="fa fa-inr"></i> ${amountDisplay}</span>
            <button class="delete-button">X</button>
        `;

        const deleteButton = transactionElement.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            removeTransaction(transactionElement, amount, type);
        });

        transactionHistory.appendChild(transactionElement);
    }

    function removeTransaction(transactionElement, amount, type) {
        if (type === "income") {
            income -= amount;
            incomeAmount.innerHTML = `<i class="fa fa-inr"></i> ${income.toFixed(2)}`;
        } else {
            expense -= amount;
            expenseAmount.innerHTML = `<i class="fa fa-inr"></i> ${expense.toFixed(2)}`;
        }
        updateBalance();
        transactionElement.remove();
    }
});
