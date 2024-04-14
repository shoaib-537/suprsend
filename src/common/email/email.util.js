const sgMail = require("@sendgrid/mail");
const configs = require("../../../configs");
sgMail.setApiKey(configs.sendgrid.apiKey);
const client = require("@sendgrid/client");

exports.loginCredentialsMail = async (
  loginCredentialsEmailPayload,
  result = {}
) => {
  try {
    const { receiverName, receiverEmail, password, leader } =
      loginCredentialsEmailPayload;

    const msg = {
      to: receiverEmail,
      from: {
        email: configs.sendgrid.sender,
        name: configs.sendgrid.senderName
      },
      templateId: configs.sendgrid.loginCredentials,
      dynamicTemplateData: {
        name: receiverName,
        email: receiverEmail,
        password,
        leader
      }
    };
    const res = await sgMail.send(msg);
  } catch (ex) {
    console.log("ex",ex.response.body.errors)
    result.ex = ex;
  } finally {
    return result;
  }
};


exports.tempCreatorSignup = async (tempCreatorSignupPayload, result = {}) => {
  try {
    const {
      projectName,
      companySize,
      projectIndustry,
      website,
      twitterLink,
      telegramLink,
      projectCreatorName,
      projectCreatorPosition,
      email,
    } = tempCreatorSignupPayload;
    const msg = {
      to: email,
      from: {
        email: configs.sendgrid.sender,
        name: configs.sendgrid.senderName,
      },
      templateId: configs.sendgrid.tempCreatorSignupTemplatedId,
      dynamicTemplateData: {
        projectName,
        companySize,
        projectIndustry,
        website,
        twitterLink,
        telegramLink,
        projectCreatorName,
        projectCreatorPosition,
        email,
      },
    };
    const res = await sgMail.send(msg);
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.tempLeaderSignup = async (tempLeaderSignupPayload, result = {}) => {
  try {
    const { nickName, twitterLink, telegramLink, country, email } =
      tempLeaderSignupPayload;

    const msg = {
      to: email,
      from: {
        email: configs.sendgrid.sender,
        name: configs.sendgrid.senderName,
      },
      templateId: configs.sendgrid.tempLeaderSignupTemplatedId,
      dynamicTemplateData: {
        nickName,
        twitterLink,
        telegramLink,
        country,
        email,
      },
    };
    const res = await sgMail.send(msg);
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.sendPasswordResetEmail = async function (
  resetPasswordEmailPayload,
  result = {}
) {
  try {
    const { receiverEmail, name, passwordResetLink } =
      resetPasswordEmailPayload;

    const msg = {
      to: receiverEmail,
      from: {
        email: configs.sendgrid.sender,
        name: configs.sendgrid.senderName,
      },
      templateId: configs.sendgrid.passwordResetEmailTemplateId,
      dynamicTemplateData: {
        name,
        passwordResetLink,
      },
    };
    const res = await sgMail.send(msg);
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.sendPasswordUpdateSuccessEmail = async function (
  passwordUpdateDto,
  result = {}
) {
  try {
    const { receiverEmail, name } = passwordUpdateDto;

    const msg = {
      to: receiverEmail,
      from: {
        email: configs.sendgrid.sender,
        name: configs.sendgrid.senderName,
      },
      templateId: configs.sendgrid.passwordResetSuccessEmailTemplateId,
      dynamicTemplateData: {
        name,
      },
    };
    const res = await sgMail.send(msg);
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.institutionDopBuyedSuccessfully = async (
  dopBuyedSuccessfullyPayload,
  result = {}
) => {
  try {
    const { receiverEmail, dopPurchased, recipientAddress, amount, token } =
      dopBuyedSuccessfullyPayload;

    const msg = {
      to: receiverEmail,
      from: {
        email: configs.sendgrid.sender,
        name: configs.sendgrid.senderName,
      },
      templateId: configs.sendgrid.institutionDopBuyedSuccessfullyTemplatedId,
      dynamicTemplateData: {
        dopPurchased,
        recipientAddress,
        amount,
        token,
      },
    };
    const res = await sgMail.send(msg);
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};

exports.dopBuyedSuccessfully = async (
  dopBuyedSuccessfullyPayload,
  result = {}
) => {
  try {
    const { receiverEmail, dopPurchased, amount, token } =
      dopBuyedSuccessfullyPayload;

    const msg = {
      to: receiverEmail,
      from: {
        email: configs.sendgrid.sender,
        name: configs.sendgrid.senderName,
      },
      templateId: configs.sendgrid.dopBuyedSuccessfullyTemplatedId,
      dynamicTemplateData: {
        dopPurchased,
        amount,
        token,
      },
    };
    const res = await sgMail.send(msg);
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};
