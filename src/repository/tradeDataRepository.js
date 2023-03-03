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

//get prevMinData
const previousMinData = async () => {
  try {
    const result = await TradeDataMinute.find()
      .limit(1)
      .sort({ $natural: -1 })
      .limit(1);
    return result;
  } catch (error) {
    console.log("Something Went Wrong In Repo");
  }
};

//get prevHourData
const previousHourData = async () => {
  try {
    const result = await TradeDataHour.find()
      .limit(1)
      .sort({ $natural: -1 })
      .limit(1);
    return result;
  } catch (error) {
    console.log("Something Went Wrong In Repo");
  }
};

// get prevDayData
const previousDayData = async () => {
  try {
    const result = await TradeDataDay.find()
      .limit(1)
      .sort({ $natural: -1 })
      .limit(1);
    return result;
  } catch (error) {
    console.log("Something Wrong In Repo");
  }
};

//create Min data
const createMinData = async (data) => {
  try {
    const result = await TradeDataMinute.create(data);
  } catch (error) {
    console.log("Something Wrong in Repo");
  }
};
//create Hour Data
const createHourData = async (data) => {
  try {
    const result = await TradeDataHour.create(data);
  } catch (error) {
    console.log("Something Wrong in Repo");
  }
};

//Create Day data
const createDayData = async (data) => {
  try {
    const result = await TradeDataDay.create(data);
  } catch (error) {
    console.log("Something Wrong in Repo");
  }
};

//update Minute Data
const updateMinData = async (prevMinId, newvalues) => {
  try {
    await TradeDataMinute.findByIdAndUpdate({ _id: prevMinId }, newvalues, {
      new: true,
    });
  } catch (error) {
    console.log("Something went wrong in repo");
    throw error;
  }
};

//update Hour Data
const updateHourData = async (prevHourId, newvalues) => {
  try {
    await TradeDataHour.findByIdAndUpdate({ _id: prevHourId }, newvalues, {
      new: true,
    });
  } catch (error) {
    console.log("Something went wrong in repo");
    throw error;
  }
};

//update Day Data
const updateDayData = async (prevDayId, newvalues) => {
  try {
    await TradeDataDay.findByIdAndUpdate({ _id: prevDayId }, newvalues, {
      new: true,
    });
  } catch (error) {
    console.log("Something went wrong in repo");
    throw error;
  }
};

module.exports = {
  getData15min,
  getData5min,
  getDataDay,
  getDataHour,
  updateDayData,
  updateHourData,
  updateMinData,
  createDayData,
  createHourData,
  createMinData,
  previousDayData,
  previousHourData,
  previousMinData,
};
