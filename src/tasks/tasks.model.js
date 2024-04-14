const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../common/constants/constants");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
    },
    isImportant: {
      type: Boolean,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ustaskers", taskSchema);
