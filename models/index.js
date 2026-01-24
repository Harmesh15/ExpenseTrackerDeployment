const users = require("../models/userModel");
const expense = require("../models/expenseModel")
const Payment = require("../models/Payment");


users.hasMany(expense, { foreignKey: "userId"});
expense.belongsTo(users, { foreignKey:"userId"});

users.hasMany(Payment);
Payment.belongsTo(users);

module.exports = { users, expense,Payment };