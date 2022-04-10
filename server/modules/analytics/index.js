const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const { orders, users } = require("./analytics.controller");

// routes
router.get("/analytics/orders", authCheck, adminCheck, orders);
router.get("/analytics/users", authCheck, adminCheck, users);

module.exports = router;
