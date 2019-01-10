const express = require("express");

const BalancedController = require("../controllers/balanced");

const isAuth = require('../middleware/check-auth');

const router = express.Router();

router.post("/balanced", isAuth, BalancedController.validateExp);

router.post("/balanced2", isAuth, BalancedController.validateExp2);


module.exports = router;
