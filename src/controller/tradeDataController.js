
//testing
const TradeDataService = require("../services/tradeData-service.js");

const tradeDataService = new TradeDataService();

//candleData
const candleData = async (req, res) => {
  try {
    console.log(req.query.candle);
    const result = await tradeDataService.getCandleData(req.query.candle);
    res.send(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// check pagination logic -->
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

// const checkAPI = async (req, res) => {
//   try {
//     const result = await tezosTradeData.getData5min();
//     console.log(result);
//     return res.status(201).json({
//       success: true,
//       message: "Successfully fetch the data",
//       err: {},
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       data: {},
//       success: false,
//       message: "Not able to fetch the data",
//       err: error,
//     });
//   }
// };

module.exports = {
  candleData,
  checkPagination,
  checkAPI,
};
