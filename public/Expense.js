let form = document.querySelector('form');
let amount = document.querySelector('#inputval');
let category = document.querySelector('#select');
let description = document.querySelector('#descinput');
let button = document.querySelector('button');
const List = document.getElementById("list");
const showpremuiumbutton = document.querySelector(".showpremuiumbutton");
const buypremiumbtn = document.querySelector(".buyMembership");
const ListPremium = document.querySelector("#premiumUSerList");




form.addEventListener('submit', async function (event) {
   event.preventDefault();

   console.log("hello from add expense funtion")
   const token = localStorage.getItem("token");
   console.log(token,"token le liya hai add karne k liye");

   try {
      const response = await axios.post("http://localhost:8000/expense/add", {
         amount: amount.value,
         category:category.value,
         description: description.value
      },
       {
            headers: {
               authorization: `Bearer ${token}`
            }
         }
      );
      console.log("user added")
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
                   ${item.amount} ${item.category} ${item.description},
                   <button onclick="deleteExpense(${item.id})">DeleteExpense</button>
                   <button onclick="editExpense(${item.id})">editExpense</button>
                `
         List.appendChild(li);
      })
   } catch (error) {
      console.log(error.message);
   }
}

window.addEventListener("load-Dom-data", getAllExpenses())

const deleteExpense = async (id) => { 
   console.log("delete button clicked");
   try {
      const token = localStorage.getItem("token");
      console.log(token);
      const deleteval = await axios.delete(`http://localhost:8000/expense/delete/${id}`, 
         {
            headers: {
               authorization: `Bearer ${token}`
            }
         }
      );
      console.log("delete Expense");
      getAllExpenses();
   } catch (error) {
      alert("Something went wrong")
      console.log("Not Authorize to delete other's expenses")
      console.log(error);
   }
}



// buy premium button
buypremiumbtn.addEventListener("click",()=>{
   window.location.href="../views/index.html";
})


showpremuiumbutton.addEventListener("click" , async ()=>{ 

   console.log("show premium btn hit");     
   try{
      
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/expense/premiumUser",{
         headers:{
            authorization:`Bearer ${token}`
         }
      });

      const Data = response.data;
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

