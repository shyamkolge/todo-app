const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const todoSchema = new Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },

  title: {
    type: String,
    require: true,
  },

  body: {
    type: String,
    require: true,
  },

  isChecked: {
    type: Boolean,
    default: false,
  },
},{timestamps : true});

const todoModel = model("todoModel", todoSchema);

module.exports = todoModel;
