const express = require("express");
const router = express.Router();

// const expressJWT = require("express-jwt");
// require("dotenv").config();
const { requireSignIn } = require("../controller/auth");
const { read, update, remove } = require("../controller/user");

router.get("/user/:id", read);
router.put("/user/update/:id", requireSignIn, update);
router.delete("/user/delete/:id", requireSignIn, remove );

module.exports = router;
