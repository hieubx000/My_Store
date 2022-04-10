const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

// controller
const { create, remove, list } = require("./coupon.controller");

// routes
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
