const PositionHistory = require("../models/PositionHistory");

class PositionRepository {
  //leader board data -->
  async getLeaderBoard() {
    const result = await PositionHistory.find({})
      .then(function (data) {
        return data;
      })
      .catch((err) => console.log(err));
    return result;
  }

  // position history -->
  async getPositionHistory(address) {
    try {
      const result = await PositionHistory.findOne({ Address: address })
        .select("Address")
        .lean();
      if (result) {
        let data = await PositionHistory.findOne({ Address: address })
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
        return data;
      }
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = PositionRepository;
