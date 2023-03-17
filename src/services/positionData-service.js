const PositionRepository = require("../repository/Position-Repository.js");

class PositionService {
  constructor() {
    this.positionRepository = new PositionRepository();
  }

  async getLeaderBoardData() {
    try {
      const result = await this.positionRepository.getLeaderBoard();
      result.sort(function (a, b) {
        return parseFloat(a.Totalpnl) - parseFloat(b.Totalpnl);
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPositionHistory(address) {
    try {
      const data = await this.positionRepository.getPositionHistory(address);
      if (data) {
        return data;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = PositionService;
