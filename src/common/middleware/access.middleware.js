const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const CONSTANTS = require("../constants/constants");

exports.isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === CONSTANTS.ROLES.ADMIN) {
      next();
    } else {
      throw createError(StatusCodes.FORBIDDEN, `Only Admin can access`);
    }
  } catch (ex) {
    next(ex);
  }
};
exports.isCreator = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === CONSTANTS.ROLES.CREATOR) {
      next();
    } else {
      throw createError(StatusCodes.FORBIDDEN, `Only creator can access`);
    }
  } catch (ex) {
    next(ex);
  }
};

exports.isGodAgent = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === CONSTANTS.ROLES.GOD_AGENT) {
      next();
    } else {
      throw createError(StatusCodes.FORBIDDEN, `Only god agent can access`);
    }
  } catch (ex) {
    next(ex);
  }
};

exports.isMegaAgent = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === CONSTANTS.ROLES.MEGA_AGENT) {
      next();
    } else {
      throw createError(
        StatusCodes.FORBIDDEN,
        `Only mega agent can create super agent`
      );
    }
  } catch (ex) {
    next(ex);
  }
};

exports.isSuperAgent = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === CONSTANTS.ROLES.SUPER_AGENT) {
      next();
    } else {
      throw createError(
        StatusCodes.FORBIDDEN,
        `Only super agent can create agent`
      );
    }
  } catch (ex) {
    next(ex);
  }
};

exports.isGodOrSuperAgent = (req, res, next) => {
  try {
    const { role } = req.user;

    if (
      role === CONSTANTS.ROLES.GOD_AGENT ||
      role === CONSTANTS.ROLES.SUPER_AGENT
    ) {
      next();
    } else {
      throw createError(
        StatusCodes.FORBIDDEN,
        `Only god or super agent can create agent`
      );
    }
  } catch (ex) {
    next(ex);
  }
};

exports.isGodOrMegaAgent = (req, res, next) => {
  try {
    const { role } = req.user;

    if (
      role === CONSTANTS.ROLES.MEGA_AGENT ||
      role === CONSTANTS.ROLES.GOD_AGENT
    ) {
      next();
    } else {
      throw createError(
        StatusCodes.FORBIDDEN,
        `Only god or mega agent can create super agent`
      );
    }
  } catch (ex) {
    next(ex);
  }
};

exports.isGodOrMegaOrSuperAgent = (req, res, next) => {
  try {
    const { role } = req.user;

    if (
      role === CONSTANTS.ROLES.GOD_AGENT ||
      role === CONSTANTS.ROLES.MEGA_AGENT ||
      role === CONSTANTS.ROLES.SUPER_AGENT
    ) {
      next();
    } else {
      throw createError(
        StatusCodes.FORBIDDEN,
        `Only god, mega and super agent can create agent`
      );
    }
  } catch (ex) {
    next(ex);
  }
};
