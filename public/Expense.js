
let form = document.querySelector("form");
let amount = document.querySelector("#inputval");
let category = document.querySelector("#select");
let description = document.querySelector("#descinput");
let button = document.querySelector("button");

const List = document.getElementById("list");
const showpremuiumbutton = document.querySelector(".showpremuiumbutton");
const buypremiumbtn = document.querySelector(".buyMembership");
const ListPremium = document.querySelector("#premiumUSerList");
const DownloadExpenses = document.querySelector("#DownloadExpenses");

const limitSelect = document.getElementById("optionpage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");


const ContentList = document.getElementById("contentList")

let currentPage = 1;
let currentLimit = 5;

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post("http://localhost:8000/expense/add",
      {
        amount: amount.value,
        category: category.value,
        description: description.value,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("Expense added");
    form.reset();
    getAllExpenses();
  } catch (error) {
    console.log("user not added");
    console.log(error);
  }
});

const getAllExpenses = async () => {
  try {
    const token = localStorage.getItem("token");
    const allExpense = await axios.get("http://localhost:8000/expense/getAll", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const Data = allExpense.data;
    List.innerHTML = "";
    Data.forEach((item) => {
      let li = document.createElement("li");
      li.innerHTML = ` 
                   Rs ${item.amount}  (${item.category})  ${item.description},
                   <button onclick="deleteExpense(${item.id})">DeleteExpense</button>
                `;
      List.appendChild(li);
    });
  } catch (error) {
    console.log(error.message);
  }
};


const deleteExpense = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/expense/delete/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    getAllExpenses();
    console.log("Expense deleted");
    showExpenseBylimit(currentPage);
  } catch (error) {
    // alert("Something went wrong");
    console.log("Not Authorize to delete other's expenses");
    console.log(error);
  }
};

window.addEventListener("load-Dom-data", getAllExpenses());



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ premium users @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

buypremiumbtn.addEventListener("click", () => {
  window.location.href = "../views/index.html";
});

showpremuiumbutton.addEventListener("click", async () => {
  try {
    console.log("show premium btn hit");
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/expense/premiumUser",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("users Displayed", response.data);
    const Data = response.data;
    console.log(Data);
    ListPremium.innerHTML = "";

    Data.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = ` ${item.name}   ${item.totalExpense}`;
      ListPremium.appendChild(li);
    });

    console.log("users Displayed");
  } catch (error) {
    console.log(error);
  }
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ShowUserByLimit and Pagination @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



limitSelect.addEventListener("change", function () {
  currentLimit = this.value;
  currentPage = 1;
  showExpenseBylimit(currentPage);
});


async function showExpenseBylimit(page) {
  currentPage = page;
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`http://localhost:8000/expense/all?page=${currentPage}&limit=${currentLimit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    showExpenseReport(res.data.expenses)
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


function renderPagination(pagination) {
  pageInfo.innerText = "Page " + pagination.currentpage + " of " + pagination.totalpage;

  prevBtn.style.display = pagination.haspreviouspage ? "inline" : "none";
  nextBtn.style.display = pagination.hasnextpage ? "inline" : "none";

  if (pagination.haspreviouspage) {
    prevBtn.onclick = function () {
      showExpenseBylimit(pagination.previouspage);
    };
  }

  if (pagination.hasnextpage) {
    nextBtn.onclick = function () {
      showExpenseBylimit(pagination.nextpage);
    };
  }

}

window.onload = function () {
  showExpenseBylimit(1);
};




DownloadExpenses.addEventListener('click', async () => {
  console.log("DownloadReport fun hit in js 201")
  const token = localStorage.getItem("token");
  console.log(token);
  try {
    const response = await axios.get("http://localhost:8000/expense/download",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const Data = response.data.contentReponse;
    console.log(Data);
    showContentUrl(Data);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
})


function showContentUrl(Data) {
  try {
    ContentList.innerHTML = "";
    Data.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.ContentUrl}`
      ContentList.appendChild(li);
    })
    res.status(200).json({ message: "successfull" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}