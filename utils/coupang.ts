import axios from "axios";
import { generateHmac } from "./hmacGenerator";
import KEYS from "../keys";

const DOMAIN = "https://api-gateway.coupang.com";
const BASEURL = "/v2/providers/affiliate_open_api/apis/openapi/v1";

export default async function (REQUEST_METHOD, URL) {
  const authorization = generateHmac(
    REQUEST_METHOD,
    BASEURL + URL,
    KEYS.SECRET_KEY,
    KEYS.ACCESS_KEY
  );
  axios.defaults.baseURL = DOMAIN;

  try {
    const response = await axios.request({
      method: REQUEST_METHOD,
      url: BASEURL + URL,
      headers: { Authorization: authorization },
      // data: REQUEST,
    });
    // console.log("response", response);

    return response.data;
  } catch (err) {
    console.log("err", err);
  }
}
