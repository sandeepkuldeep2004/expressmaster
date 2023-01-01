import { callGetPrivateAPI } from ".";
import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";


export const getHomePageMainMenu = async () => {
  const urlPath = COMMON_API.GET_MAIN_MENUS;
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {},
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  return resData;
};


// top selling product home page
export const getTopSellingProduct = async () => {
  const token = await getAccessToken();
   const urlPath = COMMON_API.HOME + 'cms/component/topselling';
   const config = {
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token.data.accessToken}`,
     },
   };
   const resData = await callGetPrivateAPI({}, urlPath, config);
   return resData;

 };

 // Brand product home page
export const getBrandProduct = async () => {
  const token = await getAccessToken();
   const urlPath = COMMON_API.HOME + 'brands';
   const config = {
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token.data.accessToken}`,
     },
   };
   const resData = await callGetPrivateAPI({}, urlPath, config);
   return resData;

 };
