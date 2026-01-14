const express = require("express");
const route = express.Router();
const expenseController = require("../controller/expenseController");

route.post("/add",expenseController.addExpense);
route.delete("/delete/:id",expenseController.deleteExpense);
route.get("/getAll",expenseController.getExpense);

module.exports = route;