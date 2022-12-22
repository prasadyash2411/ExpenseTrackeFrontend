function addNewExpense(e){
    e.preventDefault();

    const expenseDetails = {
        expenseamount: e.target.expenseamount.value,
        description: e.target.description.value,
        category: e.target.category.value,

    }
    console.log(expenseDetails)
    // const token  = localStorage.getItem('token')
    axios.post('https://crudcrud.com/api/892e97cc02c54028a49e690520aed8f4/orders',expenseDetails )
        .then((response) => {
    localStorage.setItem(response.data._id, JSON.stringify(expenseDetails))
    console.log(response)
    addNewExpensetoUI(response.data);

     }).catch(err => showError(err))

}


window.addEventListener('DOMContentLoaded', ()=> {
    axios.get('https://crudcrud.com/api/892e97cc02c54028a49e690520aed8f4/orders')
    .then(response => {
            response.data.forEach(expense => {

                addNewExpensetoUI(expense);
            })
    }).catch(err => {
        showError(err)
    })
});

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById(expense.category);
    const expenseElemId = `expense-${expense._id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense("${expense._id}")'>
                Delete Order
            </button>
        </li>`
}

function deleteExpense( expenseid) {
    removeExpensefromUI(expenseid);
    axios.delete(`https://crudcrud.com/api/892e97cc02c54028a49e690520aed8f4/orders/${expenseid}`)
    localStorage.removeItem(expenseid)
}


function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}