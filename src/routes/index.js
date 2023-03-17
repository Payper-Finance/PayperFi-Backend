const express = require("express");
const positionController = require("../controller/positionController");
const tradeDataController = require("../controller/tradeDataController");

const router = express.Router();

//   route --> ApiRoutes/granularity
router.get("/granularity", tradeDataController.candleData);

//    route --->  ApiRoutes/leaderboard
router.get("/leaderboard", positionController.getLeaderBoardData);

//   route --> ApiRoutes/positionshistory
router.post("/positionshistory", positionController.getPositionHistoryData);

router.get("/pagination", tradeDataController.checkPagination);

// check-->
// router.get("/checkAPI", tradeDataController.checkAPI);

module.exports = router;
