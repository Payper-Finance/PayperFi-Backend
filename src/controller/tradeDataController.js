//testing
const TradeDataService = require("../services/tradeData-service.js");

const tradeDataService = new TradeDataService();

// logic for fetching candleData -->
const candleData = async (req, res) => {
  try {
    console.log(req.query.candle);
    const result = await tradeDataService.getCandleData(req.query.candle);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// pagination logic for fetching hour data -->
const hourPagination = async (req, res) => {
  try {
    console.log(req.query.pageSize);
    console.log(req.query.page);
    const result = await tradeDataService.getPageDataHour(
      req.query.pageSize,
      req.query.page
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  candleData,
  hourPagination,
};
