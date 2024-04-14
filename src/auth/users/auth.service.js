const usersService = require("../../users/users.service");
const { JWT_TOKEN_TYPES } = require("../../../helpers/constants");
const configs = require("../../../configs");
const JWT = require("../../common/auth/jwt");
const redisClient = require("../../../helpers/redis");
const USERS_EVENTS = require("../../users/constants/users.events.constant");
const eventEmitter = require("../../common/events/events.event-emitter");
const { result } = require("lodash");
const referralCodes = require("referral-codes");
const CONSTANTS = require("../../common/constants/constants");

exports.creatorSignup = async (creatorSignupDto, result = {}) => {
  try {
    const response = await usersService.createCreator(creatorSignupDto);

    if (response.ex) throw response.ex;
    if (response.hasConflict) {
      result = { ...response };
    }
    result.data =response
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.signin = async (signInDto, result = {}) => {
  try {
    const { email, password, rememberMe } = signInDto;
    const response = await usersService.findUserByEmailOrUsername(email);

    if (response.ex) throw response.ex;

    const user = response.data;
  
    // if (user?.isDeleted) {
    //   result.userIsBlocked = true;
    // } else {
      if (!user?.password) {
        result.passwordNotExist = true;
      } else {
        if (user && (await user.isPasswordValid(password))) {
          // extract safe values from user
          const {
            password,
        
            ...safeUserData
          } = user._doc;
          // generate access & refresh token
          const [accessToken, refreshToken] = await Promise.all([
            JWT.signToken(
              {
                id: safeUserData._id,
                accessCode: safeUserData.accessCode,
                role: safeUserData.role,
                walletAddress: safeUserData.walletAddress,
              },
              JWT_TOKEN_TYPES.ACCESS_TOKEN
            ),
            JWT.signToken(
              {
                id: safeUserData._id,
                accessCode: safeUserData.accessCode,
                role: safeUserData.role,
                walletAddress: safeUserData.walletAddress,
              },
              JWT_TOKEN_TYPES.REFRESH_TOKEN,
              rememberMe
            ),
          ]);

          // store refresh token in redis
          rememberMe
            ? await redisClient.set(safeUserData._id.toString(), refreshToken, {
                EX: configs.jwt.refreshToken.redisRemeberMeTTL,
              })
            : await redisClient.set(safeUserData._id.toString(), refreshToken, {
                EX: configs.jwt.refreshToken.redisTTL,
              });

          result.data = {
            user: {
              ...safeUserData,
            },
            accessToken,
            refreshToken,
          };
        }
      }
    // }
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.refreshToken = async (refreshTokenDto, result = {}) => {
  try {
    const { userId } = refreshTokenDto;

    const response = await usersService.findUserById(userId);

    if (response.ex) throw response.ex;

    if (!response.data) {
      result.userNotFound = true;
    } else {
      // generate access token
      const accessToken = await JWT.signToken(
        {
          id: response.data._id,
          accessCode: response.data.accessCode,
          role: response.data.role,
          walletAddress: response.data.walletAddress,
        },
        JWT_TOKEN_TYPES.ACCESS_TOKEN
      );

      result.data = {
        accessToken,
      };
    }
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.logout = async (logoutDto, result = {}) => {
  try {
    const { userId } = logoutDto;
    const res = await redisClient.del(userId);
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.forgetPassword = async (forgetPasswordDto, result = {}) => {
  try {
    const { email } = forgetPasswordDto;

    const response = await usersService.findUserByEmailOrUsername(email);
    if (response.ex) throw response.ex;

    if (!response.data) {
      result.userExist = false;
    } else {
      result.userExist = true;
      const user = response.data;
      user.passwordResetToken = await JWT.signPasswordResetToken();
      await user.save();

      const passwordResetLink = `${configs.frontEndUrl}/reset-password?token=${user.passwordResetToken}`;

      eventEmitter.emit(USERS_EVENTS.FORGOT_PASSWORD, {
        receiverEmail: user.email,
        name: user.name,
        passwordResetLink,
      });
    }
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.resetPassword = async (resetPasswordDto, result = {}) => {
  try {
    const response = await usersService.resetPassword(resetPasswordDto);
    if (response.ex) throw response.ex;

    if (response.userNotExist) {
      result = response;
    } else {
      result = response;

      eventEmitter.emit(USERS_EVENTS.PASSWORD_UPDATE, {
        receiverEmail: response.data.email,
        name: response.data.name,
      });
    }
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};
