const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

exports.getTomiPriceDifference = (marketPrice, averagePrice) => {
  try {
    const absoluteDifference = Math.abs(marketPrice - averagePrice);

    const averageValue = (marketPrice + averagePrice) / 2;

    const percentageDifference = (absoluteDifference / averageValue) * 100;

    const absPercentageDifference = Math.abs(percentageDifference);

    return absPercentageDifference;
  } catch (error) {
    console.log("error", error);
    throw createError(StatusCodes.BAD_REQUEST, error.message);
  }
};
