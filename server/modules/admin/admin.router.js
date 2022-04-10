const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const { orders, orderStatus } = require("./admin.controller");

// routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
