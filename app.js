require("dotenv").config();
const path = require("path");
const fs = require("fs");
const https = require("https");
const axios = require("axios");
// const { ENV } = require("./config/.env.js");

const express = require("express");
const db = require("./utils/db-connection");
const expenseRoute = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const forgotPassRoute = require("./routes/forgotRoute");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

// const DATABASE_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// const Payment = require("./models/payment");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);

const app = express();
const cors = require("cors");

// models
require("./models");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

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

// const api = axios.create({
//   baseURL: "https://expensetrackerdeployment-2.onrender.com",
// });

// routes
app.use("/user", userRoutes);
app.use("/expense", expenseRoute);
app.use("/password", forgotPassRoute);
app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  window.location.href = "./public/signup/signup.html";
});

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
