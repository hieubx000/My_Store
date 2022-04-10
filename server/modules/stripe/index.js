const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("./stripe.controller");
// const { route } = require("./user");

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
