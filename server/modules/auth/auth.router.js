const router = require("express").Router();
// middleware
const { authCheck, adminCheck } = require("./auth.validation");
// controller
const { createOrUpdateUser, currentUser } = require("./auth.controller");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
