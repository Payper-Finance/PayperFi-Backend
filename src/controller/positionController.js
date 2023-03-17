const PositionService = require("../services/positionData-service.js");
const positionService = new PositionService();

const getLeaderBoardData = async (req, res) => {
  try {
    const result = await positionService.getLeaderBoardData();
    res.send(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPositionHistoryData = async (req, res) => {
  try {
    // let address = req.body.address; //TODO->?
    const data = await positionService.getPositionHistory(req.body.address);
    res.send(data.CompletedPosition);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getLeaderBoardData, getPositionHistoryData };
