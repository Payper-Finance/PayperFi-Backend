const {
  TradeDataHour,
  TradeDataDay,
  TradeDataMinute,
} = require("../models/TradeData");

// getData5min
const getData5min = async () => {
  const result = await TradeDataMinute.find({})
    .sort({ _id: -1 })
    .limit(864, function (data) {
      return data.reverse();
    })
    .catch((err) => console.log(err));

  return result;
};

//getData15min
const getData15min = async (x) => {
  const result = await TradeDataMinute.find({})
    .sort({ _id: -1 })
    .limit(864 + x, function (data) {
      return data;
    })
    .catch((err) => console.log(err));
  return result;
};

//hour
const getDataHour = async () => {
  const result = await TradeDataHour.find({})
    .then(function (data) {
      return data;
    })
    .catch((err) => console.log(err));
  return result;
};

//Day
const getDataDay = async () => {
  const result = await TradeDataDay.find({})
    .then(function (data) {
      return data;
    })
    .catch((err) => console.log(err));
  return result;
};

module.exports = {
  getData15min,
  getData5min,
  getDataDay,
  getDataHour,
};
