const TradeDataRepository = require("../repository/Trade-Repository.js");
const tradeDataRepo = new TradeDataRepository();

const { VMMCONTRACT } = require("../config/serverConfig");
const PRECISION = 1000000000000000000;

const tradeaction = async () => {
  let storage = await axios
    .get(`https://api.ghostnet.tzkt.io/v1/contracts/${VMMCONTRACT}/storage/`)
    .then((result) => {
      return result.data;
    });

  let marketpricedata = (storage.current_mark_price / PRECISION).toFixed(4);

  var previous_data_Minute = await tradeDataRepo.previousMinData();

  var previous_data_Hour = await tradeDataRepo.previousHourData();

  var previous_data_Day = await tradeDataRepo.previousDayData();

  if (previous_data_Minute.length == 0) {
    let data = {
      Date: new Date(),
      Open: marketpricedata,
      Close: marketpricedata,
      High: marketpricedata,
      Low: marketpricedata,
    };

    await tradeDataRepo.createMinData(data);

    await tradeDataRepo.createHourData(data);

    await tradeDataRepo.createDayData(data);

    console.log("1 document upDated 000.1");
    return;
  }
  var newdate_Minute = new Date().getMinutes();
  var newdate_Hour = new Date().getHours();
  var newdate_Day = new Date().getDate();
  console.log(newdate_Hour);

  console.log(newdate_Day);

  if (previous_data_Minute[0].Date.getMinutes() - newdate_Minute >= 5) {
    let data = {
      Date: new Date(),
      Open: marketpricedata,
      Close: marketpricedata,
      High: marketpricedata,
      Low: marketpricedata,
    };

    await tradeDataRepo.createMinData(data);
    console.log("1 document upDated 000.12");
  }

  if (previous_data_Hour[0].Date.getHours() - newdate_Hour >= 1) {
    let data = {
      Date: new Date(),
      Open: marketpricedata,
      Close: marketpricedata,
      High: marketpricedata,
      Low: marketpricedata,
    };

    await tradeDataRepo.createHourData(data);
    console.log("1 document upDated 000.123");
  }
  console.log(previous_data_Day[0]);
  if (previous_data_Day[0].Date.getDate() - newdate_Day >= 1) {
    let data = {
      Date: new Date(),
      Open: marketpricedata,
      Close: marketpricedata,
      High: marketpricedata,
      Low: marketpricedata,
    };

    await tradeDataRepo.createDayData(data);
    console.log("1 document upDated");
    return;
  } else {
    if (marketpricedata > previous_data_Minute[0].High) {
      var newvalues = {
        $set: {
          time: previous_data_Minute[0].Date,
          Open: previous_data_Minute[0].Open,
          Close: marketpricedata,
          High: marketpricedata,
          Low: previous_data_Minute[0].Low,
        },
      };

      const prevMinId = previous_data_Minute[0]._id;
      await tradeDataRepo.updateMinData(prevMinId, newvalues);
    } else if (marketpricedata < previous_data_Minute[0].Low) {
      var newvalues = {
        $set: {
          time: previous_data_Minute[0].Date,
          Open: previous_data_Minute[0].Open,
          Close: marketpricedata,
          High: previous_data_Minute[0].High,
          Low: marketpricedata,
        },
      };

      const prevMinId = previous_data_Minute[0]._id;
      await tradeDataRepo.updateMinData(prevMinId, newvalues);
    } else {
      var newvalues = {
        $set: {
          time: previous_data_Minute[0].Date,
          Open: previous_data_Minute[0].Open,
          Close: marketpricedata,
          High: previous_data_Minute[0].High,
          Low: previous_data_Minute[0].Low,
        },
      };

      const prevMinId = previous_data_Minute[0]._id;
      await tradeDataRepo.updateMinData(prevMinId, newvalues);
    }

    if (marketpricedata > previous_data_Hour[0].High) {
      var newvalues = {
        $set: {
          time: previous_data_Hour[0].Date,
          Open: previous_data_Hour[0].Open,
          Close: marketpricedata,
          High: marketpricedata,
          Low: previous_data_Hour[0].Low,
        },
      };

      const prevHourId = previous_data_Hour[0]._id;
      await tradeDataRepo.updateHourData(prevHourId, newvalues);
    } else if (marketpricedata < previous_data_Hour[0].Low) {
      var newvalues = {
        $set: {
          time: previous_data_Hour[0].Date,
          Open: previous_data_Hour[0].Open,
          Close: marketpricedata,
          High: previous_data_Hour[0].High,
          Low: marketpricedata,
        },
      };

      const prevHourId = previous_data_Hour[0]._id;
      await tradeDataRepo.updateHourData(prevHourId, newvalues);
    } else {
      var newvalues = {
        $set: {
          time: previous_data_Hour[0].Date,
          Open: previous_data_Hour[0].Open,
          Close: marketpricedata,
          High: previous_data_Hour[0].High,
          Low: previous_data_Hour[0].Low,
        },
      };

      const prevHourId = previous_data_Hour[0]._id;
      await tradeDataRepo.updateHourData(prevHourId, newvalues);
    }

    if (marketpricedata > previous_data_Day[0].High) {
      var newvalues = {
        $set: {
          time: previous_data_Day[0].Date,
          Open: previous_data_Day[0].Open,
          Close: marketpricedata,
          High: marketpricedata,
          Low: previous_data_Day[0].Low,
        },
      };

      const prevDayId = previous_data_Day[0]._id;
      await tradeDataRepo.updateDayData(prevDayId, newvalues);
    } else if (marketpricedata < previous_data_Day[0].Low) {
      var newvalues = {
        $set: {
          time: previous_data_Day[0].Date,
          Open: previous_data_Day[0].Open,
          Close: marketpricedata,
          High: previous_data_Day[0].High,
          Low: marketpricedata,
        },
      };

      const prevDayId = previous_data_Day[0]._id;
      await tradeDataRepo.updateDayData(prevDayId, newvalues);
    } else {
      var newvalues = {
        $set: {
          time: previous_data_Day[0].Date,
          Open: previous_data_Day[0].Open,
          Close: marketpricedata,
          High: previous_data_Day[0].High,
          Low: previous_data_Day[0].Low,
        },
      };

      const prevDayId = previous_data_Day[0]._id;
      await tradeDataRepo.updateDayData(prevDayId, newvalues);
    }
  }
};

module.exports = {
  tradeaction,
};
