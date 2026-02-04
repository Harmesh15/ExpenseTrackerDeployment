require('dotenv').config()
const path = require("path");
const fs = require("fs");
const https = require("https");


const express = require("express");
const db = require("./utils/db-connection");
const expenseRoute = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const forgotPassRoute = require("./routes/forgotRoute");

// const Payment = require("./models/payment");

const app = express();
const cors = require('cors');

// models
require("./models");

app.use(express.json())
app.use(cors());

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');


app.use(express.static('public'));


// routes 
app.use("/user", userRoutes);
app.use("/expense", expenseRoute)
app.use("/password",forgotPassRoute)
app.use("/", paymentRoutes);


const PORT = process.env.PORT || 8000;


db.sync().then(() => {
    // https.createServer({ key:privateKey, cert:certificate } ,app)
    app.listen(8000, () => {console.log(`server is runnig on port ${PORT}`);
    })
}).catch((error) => {
    console.log(error.message);
})
