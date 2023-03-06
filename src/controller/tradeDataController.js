const {
  getData15min,
  getData5min,
  getDataDay,
  getDataHour,
  getPageDataHour,
} = require("../repository/tradeDataRepository");

const { helperCandle } = require("../utils/helper");

const candleData = async (req, res) => {
  console.log(req.query.candle);
  if (req.query.candle == "5minute") {
    const result = await getData5min();
    console.log(result);
    res.send(result.reverse());
  } else if (req.query.candle == "15minute") {
    var newdate_Minute = new Date().getMinutes();
    let x = 0;
    if (newdate_Minute % 15 >= 5 && newdate_Minute % 15 < 10) {
      x = 2;
    }
    if (newdate_Minute % 15 > 0 && newdate_Minute % 15 < 5) {
      x = 1;
    }
    const result = await getData15min(x);
    result.reverse();
    const newarr = await helperCandle(result);
    res.send(newarr);
  } else if (req.query.candle == "hour") {
    const result = await getDataHour();
    res.send(result);
  } else if (req.query.candle == "day") {
    const result = await getDataDay();
    res.send(result);
  }
};

const checkPagination = async (req, res) => {
  try {
    console.log(req.query.pageSize);
    console.log(req.query.page);
    const result = await getPageDataHour(req.query.pageSize, req.query.page);
    return res.status(201).json({
      success: true,
      message: "Successfully fetch the data",
      err: {},
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch the data",
      err: error,
    });
  }
};

module.exports = {
  candleData,
  checkPagination,
};
