const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signbtn = document.querySelector("#signup");
const fpassbtn = document.querySelector("#fpswd");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let object = {
      email: email.value,
      password: password.value,
    };

    console.log(object);
    const response = await axios.post(
      "http://localhost:8000/user/login",
      object,
    );
    alert("You are Login now");

    localStorage.setItem("token", response.data.token);
    window.location.href = "../Expense.html";
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
  }
});

signbtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../signup/signup.html";
});

// forgot Password Api

fpassbtn.addEventListener("click", async () => {
  console.log("Click on Forgate button");
  try {
    const response = await axios.post(
      "http://localhost:8000/password/sendmail",
      {
        email: email.value,
      },
    );
    console.log(response);
    alert("Please check you email to reset your Password");
  } catch (error) {
    console.log(error);
  }
  //    window.location.href="../forgot/forgot.html";
});
