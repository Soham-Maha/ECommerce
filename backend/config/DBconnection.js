const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.APP_MONGODB_URL, {


    });
    console.log("MongoDB Connected ....");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnection;