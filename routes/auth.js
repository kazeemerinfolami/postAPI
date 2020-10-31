const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
} = require("../controller/auth");

//Validators
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators/index");

//signup.................................................................
router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);

//signIn..................................................................

module.exports = router;
