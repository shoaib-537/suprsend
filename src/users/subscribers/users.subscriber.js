const eventEmitter = require("../../common/events/events.event-emitter");
const USERS_EVENTS = require("../constants/users.events.constant");
const emailUtil = require("../../common/email/email.util");

const loginCredentials = async (loginCredentialsEmailPayload) => {
  try {
    console.log("loginCredentialsEmailPayload",loginCredentialsEmailPayload)
    const result = await emailUtil.loginCredentialsMail(
      loginCredentialsEmailPayload
    );
    if (result.ex) throw result.ex;
  } catch (ex) {
    console.log(ex);
  }
};

const sendPasswordResetEmail = async (passwordResetDto) => {
  try {
    const result = await emailUtil.sendPasswordResetEmail(passwordResetDto);
    if (result.ex) throw result.ex;
  } catch (ex) {
    console.log(ex);
  }
};

const sendPasswordUpdateSuccessEmail = async (passwordUpdateDto) => {
  try {
    const result = await emailUtil.sendPasswordUpdateSuccessEmail(
      passwordUpdateDto
    );
    if (result.ex) throw result.ex;
  } catch (ex) {
    console.log(ex);
  }
};

exports.registerListeners = () => {
  eventEmitter.on(
    USERS_EVENTS.MEGA_AGENT_EMAIL_LOGIN_CREDENTIALS,
    loginCredentials
  );
  eventEmitter.on(USERS_EVENTS.FORGOT_PASSWORD, sendPasswordResetEmail);
  eventEmitter.on(USERS_EVENTS.PASSWORD_UPDATE, sendPasswordUpdateSuccessEmail);
};
