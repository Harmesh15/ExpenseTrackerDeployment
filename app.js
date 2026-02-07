require("dotenv").config();
const path = require("path");
const fs = require("fs");
const https = require("https");
// const { ENV } = require("./config/.env.js");

const express = require("express");
const db = require("./utils/db-connection");
const expenseRoute = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const forgotPassRoute = require("./routes/forgotRoute");

// const Payment = require("./models/payment");

const app = express();
const cors = require("cors");

// models
require("./models");

app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: ENV.BASE_URL,
//     cred entials: true,
//   }),
// );

// app.get("/config", (req, res) => {
//   res.json({
//     baseUrl: ENV.BASE_URL,
//   });
// });

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

app.use(express.static("public"));

// routes
app.use("/", userRoutes);
app.use("/expense", expenseRoute);
app.use("/password", forgotPassRoute);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 8000;

db.sync()
  .then(() => {
    // https.createServer({ key:privateKey, cert:certificate } ,app)
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
