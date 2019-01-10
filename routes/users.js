const express = require("express");
const isAuth = require('../middleware/check-auth');
const UserController = require("../controllers/users");

const router = express.Router();

router.post("/signup", UserController.signup);

router.post("/login", UserController.login);

router.get("/listusers",isAuth, UserController.getUsers);

router.delete("/:id", isAuth, UserController.deletePost);

module.exports = router;
