const configs = require("../../../configs");

exports.authenticateAPIUser = (authAPIUserDto, result = {}) => {
  try {
    const { base64Creds } = authAPIUserDto;
    const credentials = Buffer.from(base64Creds, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    result.data = {
      isAuthenticated:
        configs.apiCredentials.username === username &&
        configs.apiCredentials.password === password
    };
  } catch (ex) {
    result.ex = ex;
  } finally {
    return result;
  }
};
