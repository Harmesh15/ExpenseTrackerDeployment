const form = document.querySelector("form");
const input = document.querySelector("#fpswd");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    let token = localStorage.getItem("token");
    console.log("send request");
    const response = await axios.post(
      "/password/forgotpassword ",
      {
        email: input.value,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    alert("Password reset successfully");
    console.log(response);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
});
