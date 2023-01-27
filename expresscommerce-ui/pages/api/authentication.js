import { callPostPrivateAPI } from ".";
import { getAccessToken } from "./common";
import { COMMON_API } from "./constants";

export const registerCustomer = async (name, email, password,phonenumber, gender) => {
  const urlPath = COMMON_API.SIGN_UP;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    data: { name: name, email: email, password: password,phonenumber:phonenumber, gender:gender},
  };
  const resData = await callPostPrivateAPI({}, urlPath, config);
  return resData;
};

export const signInCustomer = async (email, password) => {
  const urlPath = COMMON_API.SIGN_IN;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    data: { email: email, password: password },
  };
  const resData = await callPostPrivateAPI({}, urlPath, config);
  return resData;
};
