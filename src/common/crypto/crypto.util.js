const utils = require("ethereumjs-util");
const { soliditySha3 } = require("web3-utils");
const { Web3 } = require("web3");

const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");

const {
  hmacKey,
  privateKey,
  aesKey,
  usdtAddress,
  tomiAddress,
  usdcAddress,
  wbtcAddress
} = require("../../../configs");

exports.getSignedKeyForBuyCode = async (getSignedKeyForBuyCodeDto) => {
  try {
    const { walletAddress, iv, secret, hmac } = getSignedKeyForBuyCodeDto;

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: walletAddress },
      { type: "string", value: encText },
      { type: "uint256", value: deadline }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      code: encText,
      deadline
    };
    return data;
  } catch (err) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForInstitutionCode = async (getSignedKeyForBuyCodeDto) => {
  try {
    const { walletAddress, iv, secret, hmac, price } =
      getSignedKeyForBuyCodeDto;

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "string", value: encText },
      { type: "address", value: walletAddress },
      { type: "uint256", value: web3.utils.toWei(price.toString(), "ether") },
      { type: "uint256", value: deadline }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      code: encText,
      recipient: walletAddress,
      price: web3.utils.toWei(price.toString(), "ether"),
      deadline
    };
    return data;
  } catch (err) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForInstitutionBuyWithTomiCode = async (
  getSignedKeyForInstitutionBuyWithTomiCodeDto
) => {
  try {
    const {
      walletAddress,
      iv,
      secret,
      hmac,
      price: tomiPrice,
      normalizationFactor,
      dopPrice
    } = getSignedKeyForInstitutionBuyWithTomiCodeDto;

    const referenceTokenPrice = parseInt(tomiPrice * 10 ** 10);

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: tomiAddress },
      { type: "string", value: encText },
      { type: "address", value: walletAddress },
      {
        type: "uint256",
        value: web3.utils.toWei(dopPrice.toString(), "ether")
      },
      { type: "uint8", value: normalizationFactor },
      { type: "uint256", value: referenceTokenPrice },
      { type: "uint256", value: deadline }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      token: tomiAddress,
      code: encText,
      recipient: walletAddress,
      price: web3.utils.toWei(dopPrice.toString(), "ether"),
      normalizationFactor,
      referenceTokenPrice,
      deadline
    };
    return data;
  } catch (ex) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForInstitutionBuyWithStableCoinCode = async (
  getSignedKeyForInstitutionBuyWithStableCoinCodeDto
) => {
  try {
    const { walletAddress, iv, secret, hmac, normalizationFactor, dopPrice } =
      getSignedKeyForInstitutionBuyWithStableCoinCodeDto;

    const referenceTokenPrice = parseInt(1 * 10 ** 10);

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: usdtAddress },
      { type: "string", value: encText },
      { type: "address", value: walletAddress },
      {
        type: "uint256",
        value: web3.utils.toWei(dopPrice.toString(), "ether")
      },
      { type: "uint8", value: normalizationFactor },
      { type: "uint256", value: referenceTokenPrice },
      { type: "uint256", value: deadline }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      token: usdtAddress,
      code: encText,
      recipient: walletAddress,
      price: web3.utils.toWei(dopPrice.toString(), "ether"),
      normalizationFactor,
      referenceTokenPrice,
      deadline
    };
    return data;
  } catch (error) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForBuyWithTomiCode = async (
  getSignedKeyForBuyWithTomiCodeDto
) => {
  try {
    const {
      walletAddress,
      iv,
      secret,
      hmac,
      price: tomiPrice,
      normalizationFactor
    } = getSignedKeyForBuyWithTomiCodeDto;

    const price = parseInt(tomiPrice * 10 ** 10);

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: walletAddress },
      { type: "string", value: encText },
      { type: "uint256", value: price },
      { type: "uint256", value: deadline },
      { type: "address", value: tomiAddress },
      { type: "uint256", value: normalizationFactor }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      code: encText,
      price,
      deadline,
      token: tomiAddress,
      normalizationFactor
    };
    return data;
  } catch (err) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForStableCoinCode = async (
  getSignedKeyForStableCoinCodeDto
) => {
  try {
    const { walletAddress, iv, secret, hmac, normalizationFactor } =
      getSignedKeyForStableCoinCodeDto;

    const price = parseInt(1 * 10 ** 10);

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: walletAddress },
      { type: "string", value: encText },
      { type: "uint256", value: price },
      { type: "uint256", value: deadline },
      { type: "address", value: usdtAddress },
      { type: "uint256", value: normalizationFactor }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      code: encText,
      price,
      deadline,
      token: usdtAddress,
      normalizationFactor
    };
    return data;
  } catch (err) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForStableCoinCodeUsdc = async (
  getSignedKeyForStableCoinCodeDto
) => {
  try {
    const { walletAddress, iv, secret, hmac, normalizationFactor } =
      getSignedKeyForStableCoinCodeDto;

    const price = parseInt(0);

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: walletAddress },
      { type: "string", value: encText },
      { type: "uint256", value: price },
      { type: "uint256", value: deadline },
      { type: "address", value: usdcAddress },
      { type: "uint256", value: normalizationFactor }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      code: encText,
      price,
      deadline,
      token: usdtAddress,
      normalizationFactor
    };
    return data;
  } catch (err) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForWbtc= async (
  getSignedKeyForStableCoinCodeDto
) => {
  try {
    const { walletAddress, iv, secret, hmac, normalizationFactor } =
      getSignedKeyForStableCoinCodeDto;

    const price = parseInt(0);

    const web3 = new Web3();

    const deadline = parseInt(Date.now() / 1000) + 420;

    const algorithm = "aes-192-cbc";
    const ivv = Buffer.from(iv, "hex");

    const key = crypto.scryptSync(secret, "salt", 24);

    const cipher = crypto.createCipheriv(algorithm, key, ivv);
    const encrypted = cipher.update(hmac, "utf8", "hex");

    const encText = [encrypted + cipher.final("hex"), iv].join("|");

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: walletAddress },
      { type: "string", value: encText },
      { type: "uint256", value: price },
      { type: "uint256", value: deadline },
      { type: "address", value: wbtcAddress },
      { type: "uint256", value: normalizationFactor }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      code: encText,
      price,
      deadline,
      token: usdtAddress,
      normalizationFactor
    };
    return data;
  } catch (err) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};

exports.getSignedKeyForRebuyTomi = async (
  getSignedKeyForBuyWithTomiCodeDto
) => {
  try {
    const {
      walletAddress,
      round,
      price: tomiPrice,
      claimableTomi,
      claimableEth,
      claimableUsdt,
      claimableUsdc,
      claimableWbtc
    } = getSignedKeyForBuyWithTomiCodeDto;

    const web3 = new Web3();
    const price = parseInt(tomiPrice * 10 ** 10).toString();
    const ethPrice = "0";
    const usdtPrice = parseInt(1 * 10 ** 10).toString();
    const usdcPrice = "0"
    const wbtcPrice = "0";


    const prices = [price, ethPrice, usdtPrice, usdcPrice, wbtcPrice];
    const factors = ["8", "0", "20", "0" , "0"];
    const tokens = [
      tomiAddress,
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      usdtAddress,
      usdcAddress,
      wbtcAddress
    ];
    const amounts = [
      claimableTomi > 0 ? web3.utils.toWei(claimableTomi, "ether") : "0",
      claimableEth > 0 ? web3.utils.toWei(claimableEth, "ether") : "0",
      claimableUsdt > 0 ? web3.utils.toWei(claimableUsdt, "mwei") : "0",
      claimableUsdc > 0 ? web3.utils.toWei(claimableUsdc, "mwei") : "0",
      claimableWbtc > 0 ? parseInt(claimableWbtc * 10 ** 8).toString() : "0"
    ];

    const deadline = parseInt(Date.now() / 1000) + 4200;

    const soliditySha3Expected = soliditySha3(
      { type: "address", value: walletAddress },
      { type: "uint32", value: round },
      { type: "uint256", value: prices },
      { type: "uint256", value: factors },
      { type: "uint256", value: deadline },
      {
        type: "bytes",
        value: web3.eth.abi.encodeParameters(
          ["address", "address", "address", "address", "address"],
          [tokens[0], tokens[1], tokens[2], tokens[3], tokens[4]]
        )
      },
      { type: "uint256", value: amounts }
    );

    let signedKey = await web3.eth.accounts.sign(
      soliditySha3Expected,
      "0x" + privateKey
    );

    r = signedKey.signature.slice(0, 66);
    s = "0x" + signedKey.signature.slice(66, 130);
    v = "0x" + signedKey.signature.slice(130, 132);
    let data = {
      v: v,
      r: r,
      s: s,
      round,
      deadline,
      prices,
      factors,
      tokens,
      amounts
    };
    return data;
  } catch (err) {
    console.log("err::", err);
    throw createError(StatusCodes.BAD_REQUEST, err.message);
  }
};
