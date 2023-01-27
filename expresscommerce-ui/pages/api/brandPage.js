import { callGetPrivateAPI } from ".";
import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";

export const getBrandPage = async (brandName) => {
  const urlPath = COMMON_API.GET_BRAND_PAGE + brandName;
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    params:{
      currentPage:0,
      pageSize:100,
      sort:'asc'
    },
    data: {},
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  console.log(resData);
  return resData;
};

export const getImageByBrand = async (brandName) => {
  const urlPath = COMMON_API.GET_BRAND_IMAGES + brandName;
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    params:{
      currentPage:0,
      pageSize:100,
      sort:'asc'
    },
    data: {},
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  console.log(resData);
  return resData;
};
