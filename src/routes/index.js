const express = require("express");
const positionController = require("../controller/positionController");
const candleController = require("../controller/candleController");

const router = express.Router();

//   route --> ApiRoutes/granularity
router.get("/granularity", candleController.candleData);

//    route --->  ApiRoutes/leaderboard
router.get("/leaderboard", positionController.getLeaderBoardData);

//   route --> ApiRoutes/positionshistory
router.post("/positionshistory", positionController.getPositionHistoryData);

module.exports = router;
