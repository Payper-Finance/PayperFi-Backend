const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socket = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const {
  TradeDataHour,
  TradeDataDay,
  TradeDataMinute,
} = require("./models/TradeData");
const PositionHistory = require("./models/PositionHistory");
const TokenIssue = require("./models/TokensAddress");
const { validateAddress } = require("@taquito/utils");
const signalR = require("@microsoft/signalr");
const { TezosToolkit } = require("@taquito/taquito");
const { InMemorySigner } = require("@taquito/signer");

const { connect } = require("./config/database");

const { PORT, PVT_KEY, VMMCONTRACT } = require("./config/serverConfig");

const { tradeaction } = require("./utils/tradeDatahelper");
const { positionAction } = require("./utils/positionDatahelper");
const ApiRoutes = require("./routes/index");

const PRECISION = 1000000000000000000;

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/ApiRoutes", ApiRoutes);

//cleaned --> connection to the database
const server = app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await connect();
  console.log("MongoDB Connected");
});

//socket connection
const iO = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//send Data function --> helper function
const senddata = async () => {
  var x = await TradeDataMinute.find()
    .limit(1)
    .sort({ $natural: -1 })
    .limit(1)
    .then((results) => {
      return results;
    });
  return x;
};

iO.on("connection", (client) => {
  client.on("message", async (data) => {
    if (data == "history") {
      //db query
      TradeDataMinute.find({}, function (err, result) {
        if (err) throw err;

        client.emit("data1", result);
      });
    } else if (data == "upDate") {
      // send data
      var x = await senddata();
      client.emit("data2", x);
    }
  });

  //db query
  TradeDataMinute.watch([
    { $match: { operationType: { $in: ["insert"] } } },
  ]).on("change", (data) => {
    console.log("Insert action triggered"); //getting triggered thrice
    client.emit("data3", data.fullDocument.Close);
  });

  TradeDataMinute.watch([
    { $match: { operationType: { $in: ["update"] } } },
  ]).on("change", (data) => {
    console.log("UpDate action triggered"); //getting triggered thrice
    client.emit("data4", data.updateDescription.updatedFields.Close);
  });
});

console.log("A user connected");

//connection making
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://api.ghostnet.tzkt.io/v1/ws")
  .build();

async function init() {
  await connection.start();
  await connection.invoke("SubscribeToOperations", {
    address: VMMCONTRACT,
    types: "transaction",
  });
}

connection.onclose(init);

connection.on("operations", (msg) => {
  try {
    console.log(msg);
    if (msg.type == 1) {
      let data = msg.data;
      for (let i = 0; i < data.length; i++) {
        if (!!data[i].initiator && !!data[i].parameter.entrypoint) {
          var OpHash = data[i].hash;
          positionAction(OpHash);
          // LiquidationFunction()
        }
      }
      tradeaction();
    }
  } catch (err) {
    console.log(err);
  }
});

init();
