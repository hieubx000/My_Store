const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

// controller
const { create, read, update, remove, list, getSubs } = require("./category.controller");

// routes
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;
