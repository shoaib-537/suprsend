const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const authService = require("./auth.service.js");
const configs = require("../../../configs");

exports.creatorSignup = async (req, res, next) => {
  try {
    const creatorSignupDto = { ...req.body };
    const result = await authService.creatorSignup(creatorSignupDto);
    if (result.ex) throw result.ex;

    if (result.hasConflict) {
      const error = createError(StatusCodes.CONFLICT, result.conflictMessage);
      error.details = `${result.conflictField} already exist`;
      throw error;
    }

    res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      message: " Signup Successful",
      data: result.data,
    });
  } catch (ex) {
    next(ex);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const signInDto = req.body;

    const result = await authService.signin(signInDto);

    if (result.ex) throw result.ex;

    if (result.passwordNotExist)
      throw createError(
        StatusCodes.UNAUTHORIZED,
        "Email or password is incorrect"
      );

    // throw error if credentials invlaid
    if (!result.data)
      throw createError(
        StatusCodes.UNAUTHORIZED,
        "Email or password is incorrect"
      );

    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Signin Successful",
      data: result.data,
    });
  } catch (ex) {
    next(ex);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshTokenDto = req.user;

    const result = await authService.refreshToken(refreshTokenDto);

    if (result.ex) throw result.ex;

    if (result.userNotFound) throw createError.Unauthorized();

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      messages: "Access Token creation successful",
      data: result.data,
    });
  } catch (ex) {
    next(ex);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const logoutDto = {
      userId: req.user.id,
    };
    const result = await authService.logout(logoutDto);

    if (result.ex) throw result.ex;

    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Logout Successful",
    });
  } catch (ex) {
    next(ex);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const forgetPasswordDto = {
      ...req.body,
    };
    const result = await authService.forgetPassword(forgetPasswordDto);

    if (result.ex) throw result.ex;

    if (!result.userExist)
      throw createError(StatusCodes.NOT_FOUND, "User not found");

    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Password reset link sent via email",
    });
  } catch (ex) {
    next(ex);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const resetPasswordDto = {
      passwordResetToken: token,
      password,
    };
    const result = await authService.resetPassword(resetPasswordDto);
    if (result.ex) throw result.ex;

    if (!result.data)
      throw createError(StatusCodes.NOT_FOUND, "User not found");

    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Your Password has been successfuly changed.",
    });
  } catch (ex) {
    next(ex);
  }
};
