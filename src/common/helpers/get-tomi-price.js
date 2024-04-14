const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const configs = require("../../../configs");
const axios = require("axios");

exports.getTomiPrice = async () => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=TOMI`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": configs.coinMarketCap.apiKey
        }
      }
    );

    const { TOMI } = response.data.data;

    const tomiPrice = TOMI.filter((tomi) => {
      if (tomi.id === +configs.coinMarketCap.tomiId) {
        return {
          ...tomi
        };
      }
    });

    const tomiUsdtPrice = tomiPrice[0].quote.USD.price;

    return tomiUsdtPrice;
  } catch (error) {
    console.log("coin market cap error::", error);
    throw createError(StatusCodes.BAD_REQUEST, error.message);
  }
};

exports.getTomiPriceFromCoingecko = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "https://tomipay-staging.tomi.com/" + "users/private-keys"
    });

    const token = response?.data?.keys?.AddCustomToken;

    const coingeckoList = await axios.get(
      `https://pro-api.coingecko.com/api/v3/coins/list?include_platform=true&x_cg_pro_api_key=${token}`
    );

    const getTomiId = coingeckoList.data.filter((coin) => {
      if (coin?.id === "tominet") {
        return coin;
      }
    });

    const tomiPrice = await axios.get(
      `https://pro-api.coingecko.com/api/v3/coins/${getTomiId[0].id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_pro_api_key=${token}`
    );

    let currentTomiPrice = tomiPrice.data?.market_data?.current_price?.usd;

    return currentTomiPrice;
  } catch (error) {
    console.log("coin gecko error::", error);
    throw createError(StatusCodes.BAD_REQUEST, error.message);
  }
};
