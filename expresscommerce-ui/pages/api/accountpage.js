import { callPostPrivateAPI, callGetPrivateAPI, callPutPrivateAPI, callDeletePrivateAPI } from ".";
import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";

// @desc get getPersonalDetails for the customer
export const getPersonalDetails = async (email) => {
    const urlPath = COMMON_API.GET_MYACCOUNT_PAGE + email + '/myAccount';
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
}; //end of method


// @desc get getAllOrders for the customer
export const getAllOrders = async (email) => {
    const urlPath = COMMON_API.GET_MYACCOUNT_PAGE + email + '/orders';
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
}; //end of method

// @desc get getOrderDetails for the customer
export const getOrderDetails = async (orderId) => {
    const urlPath = COMMON_API.GET_ORDER_PAGE + 'orders/' + orderId;
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
}; //end of method

// @desc get getAddresses for the customer
export const getAddresses = async (email) => {
  const urlPath = COMMON_API.GET_MYACCOUNT_PAGE + email +'/addresses';
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
}; //end of method

// @desc get getAddress for the customer
export const getAddress = async (email, addressId) => {
  const urlPath = COMMON_API.GET_MYACCOUNT_PAGE + email +'/addresses/' + addressId;
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
}; //end of method

// @desc get deleteAddress for the customer
export const deleteAddress = async (email,addressId) => {
  const urlPath = COMMON_API.GET_MYACCOUNT_PAGE + email +'/addresses/' + addressId;
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {},
  };
  const resData = await callDeletePrivateAPI({}, urlPath, config);
  return resData;
}; //end of method

// @desc get postAddress for the customer
export const postAddress = async (email,payload) => {
  const urlPath = COMMON_API.GET_MYACCOUNT_PAGE + email +'/addresses';
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {...payload},
  };
  const resData = await callPostPrivateAPI({}, urlPath, config);
  return resData;
}; //end of method


// @desc get updateAddress for the customer
export const updateAddress = async (email, addressId, payload) => {
  const urlPath = COMMON_API.GET_MYACCOUNT_PAGE + email +'/addresses/' + addressId;
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {...payload},
  };
  const resData = await callPutPrivateAPI({}, urlPath, config);
  return resData;
}; //end of method