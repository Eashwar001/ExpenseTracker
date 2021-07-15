//Grab the elements from the DOM
const currentBalance = document.getElementById('currentBalance');
const incomeBalance = document.getElementById('incomeBalance');
const expenseBalance = document.getElementById('expenseBalance');
const list = document.getElementById('list');
const transactionName = document.getElementById('text');
const amount = document.getElementById('amount');
const addTransactionBtn = document.getElementById('addTransactionBtn');

//Create object that is used to storing  data in localStorage
let ourData = {
    availableBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    history: ''
};

//Grab from local storage
let historyFromLocalStorage = localStorage.getItem('history');
if (historyFromLocalStorage !== null) {
    let history = JSON.parse(historyFromLocalStorage);
    currentBalance.innerText = history.availableBalance.toFixed(2);
    incomeBalance.innerText = history.totalIncome.toFixed(2);
    expenseBalance.innerText = history.totalExpense.toFixed(2);
    list.innerHTML = JSON.parse(history.history);
}

//add transaction name
addTransactionBtn.addEventListener('click', addInformation);

//function definition for adding information
function addInformation() {
    let availableBalance = Number(currentBalance.innerText);
    let totalIncome = Number(incomeBalance.innerText);
    let totalExpense = Number(expenseBalance.innerText);
    let myTransactionName = validateTransactionName(transactionName.value);
    let myAmount = validateAmount(amount.value);
    if (myAmount === undefined) {
        return;
    }
    if (myTransactionName === 0) {
        return;
    }
    amount.value = '';
    transactionName.value = '';
    if (myAmount > 0) {
        totalIncome += myAmount;
        availableBalance += myAmount;
        incomeBalance.innerText = totalIncome.toFixed(2);
        //This block of code is just for adding list items in history div,This can be shorten
        let createdButton = document.createElement('button');
        let buttonText = document.createTextNode('X');
        createdButton.appendChild(buttonText);
        createdButton.classList.add('deleteButton');
        let createdDiv = document.createElement('div');
        let divText = document.createTextNode('+');
        createdDiv.append(divText);
        let createdSpan = document.createElement('span');
        let spanText = document.createTextNode(`${myAmount}`);
        createdSpan.appendChild(spanText);
        createdDiv.appendChild(createdSpan);
        let createdList = document.createElement('li');
        let listText = document.createTextNode(`${myTransactionName}`);
        createdList.appendChild(listText);
        createdList.appendChild(createdDiv);
        createdList.appendChild(createdButton);
        createdList.classList.add('greenBorder');
        list.appendChild(createdList);

    }
    else {
        totalExpense += Math.abs(myAmount);
        availableBalance += myAmount;
        expenseBalance.innerText = Math.abs(totalExpense).toFixed(2);
        //This block of code is just for adding list items in History Div,This can be shorten.
        let createdButton = document.createElement("button");
        let buttonText = document.createTextNode("X");
        createdButton.appendChild(buttonText);
        createdButton.classList.add("deleteButton");
        let createdDiv = document.createElement("div");
        let createdSpan = document.createElement("span");
        let spanText = document.createTextNode(`${myAmount}`);
        createdSpan.appendChild(spanText);
        createdDiv.appendChild(createdSpan);
        let createdList = document.createElement("li");
        let listText = document.createTextNode(`${myTransactionName}`);
        createdList.appendChild(listText);
        createdList.appendChild(createdDiv);
        createdList.appendChild(createdButton);
        createdList.classList.add("redBorder");
        list.appendChild(createdList);
    }
    //This will update available balance
    currentBalance.innerText = availableBalance.toFixed(2);
    deleteList();
}
deleteList();
function validateAmount(amount) {
    let myAmount = Number(amount);
    if (myAmount === 0) {
        alert('Please Enter Validate Amount');
        return;
    }
    else {
        return myAmount;
    }
}
function validateTransactionName(transactionName) {
    if (transactionName === '') {
        alert('Please Enter Valid Transaction Name');
        return 0;
    }
    else {

        return transactionName;
    }
}
function updateInLocalStorage() {
    ourData.availableBalance = Number(currentBalance.innerText);
    ourData.totalIncome = Number(incomeBalance.innerText);
    ourData.totalExpense = Math.abs(expenseBalance.innerText);
    ourData.history = JSON.stringify(list.innerHTML);
    localStorage.setItem('history', JSON.stringify(ourData));

}
window.onunload = function () {
    updateInLocalStorage();
}
function deleteList() {
    let availableBalance = Number(
        currentBalance.innerText
    );
    let totalIncome = Number(incomeBalance.innerText);
    let totalExpense = Number(expenseBalance.innerText);
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach((element) => {
        element.addEventListener("click", (event) => {
            let balanceToBeRemove;
            if (event.currentTarget.parentElement.classList.contains("greenBorder")) {
                balanceToBeRemove = Number(
                    event.currentTarget.parentElement.childNodes[1].childNodes[1]
                        .textContent
                );
                availableBalance -= balanceToBeRemove;
                totalIncome -= balanceToBeRemove;
            } else if (
                event.currentTarget.parentElement.classList.contains("redBorder")
            ) {
                balanceToBeRemove = Math.abs(
                    Number(
                        event.currentTarget.parentElement.childNodes[1].childNodes[0]
                            .textContent
                    )
                );
                availableBalance += balanceToBeRemove;
                totalExpense -= balanceToBeRemove;
            } else {
                alert("Unexpected Error Occured,Please Try Again");
            }
            //This will update amount after user delete history section
            expenseBalance.innerHTML = totalExpense.toFixed(2);
            incomeBalance.innerText = totalIncome.toFixed(2);
            currentBalance.innerHTML = availableBalance.toFixed(2);
            if (event.currentTarget.parentNode.parentNode) {

                event.currentTarget.parentNode.parentNode.removeChild(
                    event.currentTarget.parentNode
                );
            }
        });
    });


}




