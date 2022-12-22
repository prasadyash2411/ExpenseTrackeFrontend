function addNewExpense(e){
    e.preventDefault();

    const expenseDetails = {
        expenseamount: e.target.expenseamount.value,
        description: e.target.description.value,
        category: e.target.category.value,

    }
    console.log(expenseDetails)
    // const token  = localStorage.getItem('token')
    axios.post('https://crudcrud.com/api/e1fa1dda155048b4a77d77c2e3471d82/products',expenseDetails )
        .then((response) => {
    localStorage.setItem(response.data._id, JSON.stringify(expenseDetails))
    console.log(response)
    addNewExpensetoUI(response.data);

     }).catch(err => showError(err))

}


window.addEventListener('DOMContentLoaded', ()=> {
    axios.get('https://crudcrud.com/api/e1fa1dda155048b4a77d77c2e3471d82/products')
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
                Delete Product
            </button>
        </li>`
}

function deleteExpense( expenseid) {
    removeExpensefromUI(expenseid);
    axios.delete(`https://crudcrud.com/api/e1fa1dda155048b4a77d77c2e3471d82/products/${expenseid}`)
    localStorage.removeItem(expenseid)
}


function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}