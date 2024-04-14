const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../common/constants/constants");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
    },
   
    
  },
  { timestamps: true }
);

usersSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  this.isDeleted = true;
  return this.save();
};

usersSchema.pre("save", async function (next) {
  // check if password is present and is modified.
  if (this.password && this.isModified("password")) {
    // call your hashPassword method here which will return the hashed password.
    this.password = await bcrypt.hash(this.password, 10);
  }
  // everything is done, so let's call the next callback.
  next();
});

usersSchema.methods.isPasswordValid = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", usersSchema);
