const PositionHistory = require("../models/PositionHistory");

class PositionRepository {
  //get leaderboard data -->
  async getLeaderBoard() {
    try {
      const result = await PositionHistory.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }
  // get position history -->
  async getPositionHistory(address) {
    try {
      const result = await PositionHistory.findOne({ Address: address })
        .select("Address")
        .lean();

      if (result) {
        try {
          let data = await PositionHistory.findOne({ Address: address });
          return data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //get position address -->
  async getPositionAddress(address) {
    try {
      const result = await PositionHistory.findOne({
        Address: address,
      });
      return result;
    } catch (error) {
      console.log("Something went Wrong");
      throw error;
    }
  }
  //update -->
  async updatePositionAddress(key, data) {
    try {
      await PositionHistory.findOneAndUpdate(key, data);
    } catch (error) {
      console.log("Something went wrong ");
      throw error;
    }
  }
  // position create
  async positionCreate(data) {
    try {
      const result = await PositionHistory.create(data);
    } catch (error) {
      console.log("Something Went Wrong");
      throw error;
    }
  }
}

module.exports = PositionRepository;
