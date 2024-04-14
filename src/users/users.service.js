const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const referralCodes = require("referral-codes");
const generator = require("generate-password");
const User = require("./users.model");
const CONSTANTS = require("../common/constants/constants");
const eventEmitter = require("../common/events/events.event-emitter");
const USERS_EVENTS = require("./constants/users.events.constant");
const configs = require("../../configs");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

const crypto = require("crypto");
const { ObjectId } = require("mongodb");

exports.findUserByEmailOrUsername = async (email, result = {}) => {
  try {
    result.data = await User.findOne({
      email,
    }).select(
      "_id name email role accessCode walletAddress isDeleted accessCodeEnabled password"
    );
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.findUserById = async (userId, result = {}) => {
  try {
    result.data = await User.findById(userId, "-__v");
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.createCreator = async (createCreatorDto, result = {}) => {
  try {
   
    const user = await User.create({
      ...createCreatorDto,
    });
    const {password, ...safeData}= user._doc
    result.data = safeData
  } catch (ex) {
    if (
      ex.name === CONSTANTS.DATABASE_ERROR_NAMES.MONGO_SERVER_ERROR &&
      ex.code === CONSTANTS.DATABASE_ERROR_CODES.UNIQUE_VIOLATION
    ) {
      const uniqueViolaterMessage = ex.message.split("{ ")[1];
      const uniqueViolaterField = uniqueViolaterMessage.split(":")[0];
      result.conflictMessage = `${uniqueViolaterField} already exist`;
      result.conflictField = uniqueViolaterField;
      result.hasConflict = true;
    }
  } finally {
    return result;
  }
};


exports.resetPassword = async (resetPasswordDto, result = {}) => {
  try {
    const { passwordResetToken, password } = resetPasswordDto;
    const pass = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      {
        passwordResetToken,
      },
      { $unset: { passwordResetToken: "" }, password: pass }
    );

    if (user) {
      result.data = {
        ...(user && { name: user.name }),
        ...(user && { email: user.email }),
      };
    } else {
      result.userNotExist = true;
    }
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};
