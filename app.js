const express = require("express");
const db = require("./utils/db-connection");
const expenseRoute = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
require('dotenv').config()
// const Payment = require("./models/payment");

const app = express();
const cors = require('cors');

// models
require("./models");

app.use(express.json())
app.use(cors());


app.use(express.static('public'));


// routes 
app.use("/user", userRoutes);
app.use("/expense", expenseRoute)
app.use("/", paymentRoutes);



db.sync().then(() => {
    app.listen(8000, () => {
        console.log("server is runnig");
    })
}).catch((error) => {
    console.log(error.message);
})
