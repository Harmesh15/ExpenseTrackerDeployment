const express = require("express");
const router = express.Router();
const authorizationToken = require("../middleware/auth");
const paymentController = require("../controller/paymentControllers");
console.log("Payment route hit");

router.get("/page", paymentController.getPaymentPage);
router.post("/pay", authorizationToken, paymentController.processPayment);
router.get("/payment-status/:orderId", paymentController.updatePaymentStatus);

module.exports = router;
