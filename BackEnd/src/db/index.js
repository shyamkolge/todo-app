const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}`
    );
    console.log("Connection to DB is Successfully Establised..!");
  } catch (error) {
    console.log("DB :: index.js :: Connection error");
  }
};

module.exports = connectDB;
