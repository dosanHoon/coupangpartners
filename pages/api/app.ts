import axios from "axios";
import { generateHmac } from "./hmacGenerator";
import { ACCESS_KEY, SECRET_KEY } from "../keys";

const REQUEST_METHOD = "POST";
const DOMAIN = "https://api-gateway.coupang.com";
const URL = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";

const REQUEST = {
  coupangUrls: [
    "https://www.coupang.com/np/search?component=&q=good&channel=user",
    "https://www.coupang.com/np/coupangglobal",
  ],
};

(async () => {
  const authorization = generateHmac(
    REQUEST_METHOD,
    URL,
    SECRET_KEY,
    ACCESS_KEY
  );
  axios.defaults.baseURL = DOMAIN;

  try {
    const response = await axios.request({
      method: REQUEST_METHOD,
      url: URL,
      headers: { Authorization: authorization },
      data: REQUEST,
    });
    console.log(response.data);
  } catch (err) {
    console.error(err.response.data);
  }
})();
