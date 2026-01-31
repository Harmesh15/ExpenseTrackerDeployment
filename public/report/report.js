const page1btn = document.querySelector('#page1');
const firstTablebody = document.getElementById("firstTablebody");


let currentpage = 1;
async function fetchExpenses(page){
    try{
      const token =localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8000/expense/all?page=${page}`,
        {
            headers:{
                authorization: `Bearor ${token}`
            }
        }
      );  

       const expenses = res.data.expenses;
       const pagination = res.data.pagination;
        
      console.log(res.data.expenses,"this is expense from fetchfun of report");
      showExpense(expenses);
      showpagination(pagination);
      

    }catch(error){
        console.log(error);
    }
};

function renderPagination(pagination) {
  if (pagination.haspreviouspage) {
    prevBtn.onclick = () => fetchExpenses(pagination.previouspage);
  }

  if (pagination.nextpage) {
    nextBtn.onclick = () => fetchExpenses(pagination.nextpage);
  }

  pageInfo.innerText = `Page ${pagination.currentpage} of ${pagination.totalpage}`;
}


async function showExpense(expenses){

  firstTablebody.innerHTML = ""; 

  expenses.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(item.createdAt).toLocaleDateString()}</td>
      <td>${item.description}</td>
      <td>${item.category}</td>
      <td>-</td>
      <td>${item.amount}</td>
    `;
    firstTablebody.appendChild(tr);
  });

} 

function showpagination(pagination){
    try{
      console.log("show pagination hit")
     pagination.forEach((item)=>{
         const  tr = document.createElement("tr");
         tr.innerHTML = `
         <tr>${item.description}</tr>
         `
       firstTablebody.appendChild(tr);  
    })
    }catch(error){
        console.log(error)
    }
}

