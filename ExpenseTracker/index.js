function addNewExpense(e){
    e.preventDefault();

    const expenseDetails = {
        expenseamount: e.target.expenseamount.value,
        description: e.target.description.value,
        orderId: e.target.orderId.value
        // category: e.target.category.value,

    }
    console.log(expenseDetails)
    // const token  = localStorage.getItem('token')
    axios.post('https://crudcrud.com/api/8a1e1458b1834d8d86e510025a7723aa/products',expenseDetails )
        .then((response) => {
    localStorage.setItem(expenseDetails.orderId, JSON.stringify(expenseDetails))
    console.log(response)
    addNewExpensetoUI(response.data);

     }).catch(err => showError(err))

}


// window.addEventListener('DOMContentLoaded', ()=> {
//     axios.get('https://crudcrud.com/api/8a1e1458b1834d8d86e510025a7723aa/products')
//     .then(response => {
//             response.data.forEach(expense => {

//                 addNewExpensetoUI(expense);
//             })
//     }).catch(err => {
//         showError(err)
//     })
// });

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('Products');
    const expenseElemId = `expense-${expense.orderId}`;
    document.getElementById('totalValue').innerHTML = Number(document.getElementById('totalValue').innerHTML) + Number(expense.expenseamount)
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.description}
            <button onclick='deleteExpense("${expense.orderId}")'>
                Delete Product
            </button>
        </li>`
}

function deleteExpense( expenseid) {
    removeExpensefromUI(expenseid);
    axios.delete(`https://crudcrud.com/api/8a1e1458b1834d8d86e510025a7723aa/products/${expenseid}`)
    const expense  = JSON.parse(localStorage.getItem(expenseid))
    document.getElementById('totalValue').innerHTML = Number(document.getElementById('totalValue').innerHTML) - Number(expense.expenseamount)
    localStorage.removeItem(expenseid)
}


function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
    
}

