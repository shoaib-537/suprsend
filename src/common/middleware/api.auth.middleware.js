const authService = require("../../common/auth/auth.service");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

exports.authenticateAPIUser = (req, res, next) => {
  try {
    const base64Creds = req.headers?.authorization?.split(" ")[1];

    if (!base64Creds) {
      throw createError(StatusCodes.UNAUTHORIZED, "UnAuthroized");
    }
    const authAPIUserDto = {
      base64Creds
    };
    const result = authService.authenticateAPIUser(authAPIUserDto);

    if (result.ex) throw result.ex;

    if (!result.data.isAuthenticated) {
      throw createError(StatusCodes.UNAUTHORIZED, "Invalid auth credentials");
    }

    next();
  } catch (ex) {
    next(ex);
  }
};
