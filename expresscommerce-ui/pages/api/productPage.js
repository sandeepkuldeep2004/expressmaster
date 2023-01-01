import { callGetPrivateAPI } from ".";
import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";

export const getProductPage = async (productCode, accessToken) => {
  const urlPath = COMMON_API.GET_PRODUCT_PAGE + productCode;
  let token = "";
  if (accessToken) token = accessToken;
  else {
    const guestToken = await getAccessToken();
    token = guestToken.data.accessToken;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  return resData;
};
