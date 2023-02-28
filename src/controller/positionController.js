const PositionRepository = require("../repository/positionRepository");

const getLeaderBoardData = async (req, res) => {
  try {
    const result = await PositionRepository.getLeaderBoardData();
    result.sort(function (a, b) {
      return parseFloat(a.Totalpnl) - parseFloat(b.Totalpnl);
    });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const getPositionHistoryData = async (req, res) => {
  try {
    let address = req.body.address;
    const data = await PositionRepository.getPositionHistory(address);
    if (data) {
      res.send(data.CompletedPosition);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getLeaderBoardData, getPositionHistoryData };
