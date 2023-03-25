const {
  TradeDataHour,
  TradeDataDay,
  TradeDataMinute,
} = require("../models/TradeData");

class TradeDataRepository {
  // create minute data
  async createMinData(data) {
    try {
      const result = await TradeDataMinute.create(data);
    } catch (error) {
      console.log("Something Wrong in Repo");
      throw error;
    }
  }

  // create hour data
  async createHourData(data) {
    try {
      const result = await TradeDataHour.create(data);
    } catch (error) {
      console.log("Something Wrong in Repo");
    }
  }

  // create day data
  async createDayData(data) {
    try {
      const result = await TradeDataDay.create(data);
    } catch (error) {
      console.log("Something Wrong in Repo");
    }
  }

  //get 5 min data
  async getData5min() {
    try {
      const result = await TradeDataMinute.find({})
        .sort({ _id: -1 })
        .limit(864);
      // console.log(result);
      return result;
    } catch (error) {
      console.log("Something Went Wrong");
      throw error;
    }
  }

  // get 15 min data
  async getData15min(x) {
    try {
      const result = await TradeDataMinute.find({})
        .sort({ _id: -1 })
        .limit(864 + x);
      return result;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  // get Hour data
  async getDataHour() {
    try {
      const result = await TradeDataHour.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  // get Day Data
  async getDataDay() {
    try {
      const result = await TradeDataDay.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  // get prev Min data
  async previousMinData() {
    try {
      const result = await TradeDataMinute.find()
        .limit(1)
        .sort({ $natural: -1 })
        .limit(1);
      return result;
    } catch (error) {
      console.log("Something Went Wrong ");
      throw error;
    }
  }

  // get prev Hour data
  async previousHourData() {
    try {
      const result = await TradeDataHour.find()
        .limit(1)
        .sort({ $natural: -1 })
        .limit(1);
      return result;
    } catch (error) {
      console.log("Something Went Wrong In Repo");
      throw error;
    }
  }

  // get prev Day Data
  async previousDayData() {
    try {
      const result = await TradeDataDay.find()
        .limit(1)
        .sort({ $natural: -1 })
        .limit(1);
      return result;
    } catch (error) {
      console.log("Something Wrong In Repo");
      throw error;
    }
  }

  // update minute data
  async updateMinData(prevMinId, newvalues) {
    try {
      await TradeDataMinute.findByIdAndUpdate({ _id: prevMinId }, newvalues, {
        new: true,
      });
    } catch (error) {
      console.log("Something went wrong in repo");
      throw error;
    }
  }
  // update hour data
  async updateHourData(prevHourId, newvalues) {
    try {
      await TradeDataHour.findByIdAndUpdate({ _id: prevHourId }, newvalues, {
        new: true,
      });
    } catch (error) {
      console.log("Something went wrong in repo");
      throw error;
    }
  }
  // update day data
  async updateDayData(prevDayId, newvalues) {
    try {
      await TradeDataDay.findByIdAndUpdate({ _id: prevDayId }, newvalues, {
        new: true,
      });
    } catch (error) {
      console.log("Something went wrong in repo");
      throw error;
    }
  }

  // PAGINATION -->
  // for fetching Hour Data -->
  async getPageDataHour(pageSize, page) {
    try {
      const result = await TradeDataHour.find({})
        .sort({ _id: -1 })
        .limit(pageSize)
        .skip(pageSize * page);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TradeDataRepository;
