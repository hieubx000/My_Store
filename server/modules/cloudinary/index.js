const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");

// controllers
const { upload, remove } = require("./cloudinary.controller");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
