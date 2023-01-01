import { callPostPrivateAPI, callGetPrivateAPI } from ".";
import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";


// @desc get postDeliveryAddress for the customer
export const postDeliveryAddress = async (email, cartId, payload) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/addresses/delivery';
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
};//end of method       

// @desc post postUseDeliveryAddress for the customer
export const postUseDeliveryAddress = async (email, cartId, uId) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/deliveryAddress/select';
  const token = await getAccessToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data:  JSON.stringify({'uid': uId}),
  };
  const resData = await callPostPrivateAPI({}, urlPath, config);
  return resData;
};//end of method       

// @desc get getAllDeliveryAddress for the customer
export const getAllDeliveryAddress = async (email, cartId) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/deliveryAddress';
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {}
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  return resData;
};//end of method       

// @desc get getPaymentDetails for the customer
export const getPaymentDetails = async (email, cartId) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/payment/details';
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {}
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  return resData;
};//end of method       


// @desc get getDeliveryModes for the customer
export const getDeliveryModes = async (email, cartId) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/delivery/modes';
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {}
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  return resData;
}; //end of method   


// @desc get postDeliveryModes for the customer
export const postDeliveryModes = async (email, cartId, modeId) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/deliverymode';
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: JSON.stringify({'deliveryMode': modeId}),
  };
  const resData = await callPostPrivateAPI({}, urlPath, config);
  return resData;
}; //end of method   


// @desc post postPayment & PLave order for the customer
export const postPayment = async (email, payload) => {
  // const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/payment';
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/placeorder1';
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


// @desc get getReviewSummary for the customer
export const getReviewSummary = async (email, cartId) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/carts/' + cartId +'/summary';
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: {}
  };
  const resData = await callGetPrivateAPI({}, urlPath, config);
  return resData;
}; //end of method  

// @desc post postPlaceOrder for the customer
export const postPlaceOrder = async (email) => {
  const urlPath = COMMON_API.POST_CHECKOUT_PAGE + email + '/placeorder';
  const token = await getAccessToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.data.accessToken}`,
    },
    data: JSON.stringify({'termsCheck': 'Agreed'}),
  };
  const resData = await callPostPrivateAPI({}, urlPath, config);
  return resData;
}; //end of method  