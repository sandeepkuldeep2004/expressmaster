import { callGetPrivateAPI } from ".";
import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";

export const getCategoryPage = async (categoryCode) => {
  const urlPath = COMMON_API.GET_CATEGORY_PAGE + categoryCode;
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
  return resData;
};
