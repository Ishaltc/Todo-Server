const express = require("express");
const { register, login, sentResetPasswordCode, updatePassword } = require("../controllers/users");
const router = express.Router();

// auth apis //
router.post("/api/register", register);
router.post("/api/login", login);


module.exports = router;
