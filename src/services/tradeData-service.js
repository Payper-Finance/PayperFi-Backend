const TradeDataRepository = require("../repository/Trade-Repository.js");
const { helperCandle } = require("../utils/helper");

class TradeDataService {
  constructor() {
    this.tradeDataRepo = new TradeDataRepository();
  }
  async getCandleData(time) {
    try {
      // request for 5 min
      if (time == "5minute") {
        const result = await this.tradeDataRepo.getData5min();
        result.reverse();
        return result;
      }
      //  request for 15 min
      else if (time == "15minute") {
        var newdate_Minute = new Date().getMinutes();
        let x = 0;
        if (newdate_Minute % 15 >= 5 && newdate_Minute % 15 < 10) {
          x = 2;
        }
        if (newdate_Minute % 15 > 0 && newdate_Minute % 15 < 5) {
          x = 1;
        }
        const result = await this.tradeDataRepo.getData15min(x);
        result.reverse();
        const newarr = await helperCandle(result);
        return newarr;
      }
      // request for hour
      else if (time == "hour") {
        const result = await this.tradeDataRepo.getDataHour();
        return result;
      }
      // request for day
      else if (time == "day") {
        const result = await this.tradeDataRepo.getDataDay();
        return result;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // pagination logic for fetching hour data ->
  async getPageDataHour(pageSize, page) {
    try {
      const result = await this.tradeDataRepo.getPageDataHour(pageSize, page);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TradeDataService;
