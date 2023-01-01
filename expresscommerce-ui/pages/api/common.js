import { callPostPrivateAPI } from ".";
import { COMMON_API } from "./constants";

export const getAccessToken = async () => {
  const urlPath = COMMON_API.GET_ACCESS_TOKEN;
  const config = {
    headers: {},
    data: { secretkey: process.env.OCC_SECRET, clientkey: process.env.OCC_CLIENT_ID  },
  };
  const resData = await callPostPrivateAPI({}, urlPath, config);
  return resData;
};
