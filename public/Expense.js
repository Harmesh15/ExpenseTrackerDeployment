let form = document.querySelector('form');
let amount = document.querySelector('#inputval');
let category = document.querySelector('#select');
let description = document.querySelector('#descinput');
let button = document.querySelector('button');

const List = document.getElementById("list");
const showpremuiumbutton = document.querySelector(".showpremuiumbutton");
const buypremiumbtn = document.querySelector(".buyMembership");
const ListPremium = document.querySelector("#premiumUSerList");
const showExpense = document.querySelector("#showExpense")

const limitSelect = document.getElementById("optionpage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
let currentLimit = 5;



form.addEventListener('submit', async function (event) {
   event.preventDefault();
   const token = localStorage.getItem("token");
   try {
      const response = await axios.post("http://localhost:8000/expense/add", {
         amount: amount.value,
         category:category.value,
         description: description.value,
         Expensenote:description.value + category.value,
         note:description.value + category.value,
      },
       {
            headers: {
               authorization: `Bearer ${token}`
            }
         }
      );
      console.log("Expense added")
      form.reset();
      getAllExpenses();
   } catch (error) {
      console.log("user not added")
      console.log(error);
   }
})

const getAllExpenses = async () => {
   try {
      const token = localStorage.getItem("token");
      const allExpense = await axios.get("http://localhost:8000/expense/getAll",
          {
            headers: {
               authorization: `Bearer ${token}`
            }
         }
      )
      const Data = allExpense.data;
      List.innerHTML = "";

      Data.forEach((item) => {
         let li = document.createElement('li');
         li.innerHTML = ` 
                   Rs ${item.amount}  (${item.category})  ${item.description},
                   <button onclick="deleteExpense(${item.id})">DeleteExpense</button>
                `
         List.appendChild(li);
      })
   } catch (error) {
      console.log(error.message);
   }
}


window.addEventListener("load-Dom-data", getAllExpenses())

const deleteExpense = async (id) => { 
   try {
      const token = localStorage.getItem("token");
      const deleteval = await axios.delete(`http://localhost:8000/expense/delete/${id}`, 
         {
            headers: {
               authorization: `Bearer ${token}`
            }
         }
      );
      console.log("Expense deleted");
      getAllExpenses();
       fetchExpenses(currentPage);
   } catch (error) {
      alert("Something went wrong")
      console.log("Not Authorize to delete other's expenses")
      console.log(error);
   }
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ premium users @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

buypremiumbtn.addEventListener("click",()=>{
   window.location.href="../views/index.html";
})


showpremuiumbutton.addEventListener("click" , async ()=>{     
   try{
      console.log("show premium btn hit");
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/expense/premiumUser",{
         headers:{
            authorization:`Bearer ${token}`
         }
      });
      console.log("users Displayed",response.data);
      const Data = response.data;
      console.log(Data);
      ListPremium.innerHTML = "";
               Data.forEach((item)=>{
                  const li = document.createElement("li");
                  li.innerHTML = `
                   ${item.name}   ${item.totalExpense}
                   `
         ListPremium.appendChild(li);
      })
      console.log("users Displayed");
      
   }catch(error){
      console.log(error);
   }
})



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Report_Page_Logic @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const page1btn = document.querySelector('#page1');
const firstTablebody = document.getElementById("firstTablebody");
const pagebutton = document.getElementById('pagebtn');


limitSelect.addEventListener("change", function () {
  currentLimit = this.value;
  currentPage = 1;
  fetchExpenses(currentPage);
});


async function fetchExpenses(page) {
  currentPage = page;
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      `http://localhost:8000/expense/all?page=${currentPage}&limit=${currentLimit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showExpenseReport(res.data.expenses);
    renderPagination(res.data.pagination);

  } catch (error) {
    console.log(error.message);
  }
}


function showExpenseReport(expenses) {
  List.innerHTML = "";

  expenses.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      Rs ${item.amount} (${item.category}) ${item.description}
      <button onclick="deleteExpense(${item.id})">Delete</button>
    `;

    List.appendChild(li);
  });
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@_Pagination_@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function renderPagination(pagination) {
  pageInfo.innerText =
    "Page " + pagination.currentpage + " of " + pagination.totalpage;

  prevBtn.style.display = pagination.haspreviouspage ? "inline" : "none";
  nextBtn.style.display = pagination.hasnextpage ? "inline" : "none";

  if (pagination.haspreviouspage) {
    prevBtn.onclick = function () {
      fetchExpenses(pagination.previouspage);
    };
  }

  if (pagination.hasnextpage) {
    nextBtn.onclick = function () {
      fetchExpenses(pagination.nextpage);
    };
  }
}

window.onload = function () {
  fetchExpenses(1);
};











































// function renderPagination(pagination) {
//   if (pagination.haspreviouspage) {
//     prevBtn.onclick = () => fetchExpenses(pagination.previouspage);
//   }

//   if (pagination.nextpage) {
//     nextBtn.onclick = () => fetchExpenses(pagination.nextpage);
//   }

//   pageInfo.innerText = `Page ${pagination.currentpage} of ${pagination.totalpage}`;
// }




//async function  showReportbtn(){

//   try{
//     firstTablebody.innerHTML = ""; 

//   expenses.forEach(item => {
//    const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${new Date(item.createdAt).toLocaleDateString()}</td>
//       <td>${item.description}</td>
//       <td>${item.category}</td>
//       <td>-</td>
//       <td>${item.amount}</td>
//     `;
//     firstTablebody.appendChild(tr);
//     console.log(firstTablebody,"hello from expense js")
//   });
//   }catch(error){
//    console.log(error)
//   }


//}


// window.addEventListener("load-Dom-data", getAllExpenses());
// const updateExpense = async (req,res)=>{ 
//    const token = localStorage.getItem("token"); 
//      try{
        
//       const response = await axios.put(`http://localhost:8000/expense/update/${id}`,{
//          amount: amount.value,
//          category: category.value,
//          description: description.value
//       },
//        {
//             headers: {
//                authorization: `Bearer ${token}`
//             }
//          }

//       );
      
//     }catch(error){
//         console.log(error);
//     }

// }
// localStorage.setItem("data",JSON.stringify(object));
// let list = document.createElement('li');
// list.textContent = inputval + "  " + categoryval + "  " + descval ;
// let deleteBtn = document.createElement('button');
// deleteBtn.textContent = "Delete";
// list.appendChild(deleteBtn);
// let editbtn = document.createElement('button');
// editbtn.textContent = "Edit";
// list.appendChild(editbtn);
// let ulList = document.querySelector('.ul-list');
// ulList.append(list);
// console.log(ulList);

