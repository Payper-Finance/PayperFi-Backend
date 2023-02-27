const { Router } = require("express");
const express = require("express");
const candleController = require("../controller/candleController");

const router = express.Router();

router.get("/granularity", candleController.candleData);

module.exports = router;
