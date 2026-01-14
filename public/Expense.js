 let form = document.querySelector('form');
 let amount = document.querySelector('#inputval');
 let category = document.querySelector('#select');
 let description = document.querySelector('#descinput');
 let button = document.querySelector('button');
 const List = document.getElementById("list");




 form.addEventListener('submit', async function(Event){
    Event.preventDefault();


    let object = {
        amount:amount.value,
        category:category.value,
        description:description.value

    }

       try{
          const  response = await axios.post("http://localhost:8000/expense/add",object); 
          console.log("response of post",response.data);
          getAllExpenses();
       }catch(error){
        console.log(error);
       }
 })


const getAllExpenses = async ()=>{


    try{
           const allExpense  = await axios.get("http://localhost:8000/expense/getAll")
           const Data = allExpense.data;

           List.innerHTML = "";
       
            Data.forEach((item)=>{
                let li = document.createElement('li');
                li.innerHTML = `
                   ${item.amount} ${item.category}   ${item.description},
                   <button onclick="deleteExpense(${item.id})">DeleteExpense</button>
                   <button onclick="editExpense(${item.id})">editExpense</button>
                `
                List.appendChild(li);
            })
    }catch(error){
        console.log(error);
    }
}

const deleteExpense = async (id)=>{   
   try{
        const deleteval = await axios.delete(`http://localhost:8000/expense/delete/${id}`);
        console.log("delete Expense");
        getAllExpenses();
   }catch(error){
    console.log(error);
   }
}




 window.addEventListener("load-Dom-data", getAllExpenses());


     









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

