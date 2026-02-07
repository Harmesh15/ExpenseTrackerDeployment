const form = document.querySelector("form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let object = {
      name: username.value,
      email: email.value,
      password: password.value,
    };

    const res = await axios.post("/user/signup", object);
    form.reset();
    alert("You register successfully");
    console.log(res.data);
  } catch (error) {
    console.log(error.res.message);
  }
});

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

const loginpagebtn = document.querySelector("#loginpagebtn");

loginpagebtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../login/login.html";
});
