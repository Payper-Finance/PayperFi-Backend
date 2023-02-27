const mongoose = require("mongoose");

const { MONGO_URL } = require("../config/serverConfig");

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
