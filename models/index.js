const users = require("../models/userModel");
const expense = require("../models/expenseModel");
const Payment = require("../models/Payment");
const forgotpassword = require("../models/ForgotPassworModel");

users.hasMany(expense, { foreignKey: "userId" });
expense.belongsTo(users, { foreignKey: "userId" });

users.hasMany(Payment);
Payment.belongsTo(users);

users.hasMany(forgotpassword, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

forgotpassword.belongsTo(users, {
  foreignKey: "userId",
});

module.exports = { users, expense, Payment, forgotpassword };
