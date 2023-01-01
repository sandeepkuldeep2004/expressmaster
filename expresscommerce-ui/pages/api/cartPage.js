import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";
import { callGetPrivateAPI, callPostPrivateAPI, callPutPrivateAPI, callDeletePrivateAPI } from ".";

export const getCartPage = async (email) => {
    const urlPath = COMMON_API.GET_CART_PAGE + email + '/cart/';
    const token = await getAccessToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.accessToken}`,
       // Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.cmFobWFuemlhMTY3QGdtYWlsLmNvbQ.58s80cEnt1ArwDmSIMqBtAe5PFoYSNqNPzUo_RnO0HY",
      },
      data: {},
    };
    const resData = await callGetPrivateAPI({}, urlPath, config);
    //console.log(resData);
    return resData;
  };
  // add to cart page
  export const addToCartPage = async (productCode,quantity, userID) => {
    const token = await getAccessToken();
     const urlPath = COMMON_API.POST_CART_PAGE + userID + '/cart';
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token.data.accessToken}`,
       },
       data: { productCode: productCode, quantity: quantity },
     };
     const resData = await callPostPrivateAPI({}, urlPath, config);
     return resData;
 
   };

   export const updateCartEntry = async (userID,cartId,entryNumber,quantity ) => {
    const token = await getAccessToken();
     const urlPath = COMMON_API.POST_CART_PAGE + userID + '/cart/'+cartId+'/updateentry';
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token.data.accessToken}`,
      //   Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.dHJ1c3RlZF9jbGllbnQ.Oi29DHMG558L5Z-yCtPZEslhrQGNBfvrTTyDSMJd6r4",
       },
       data: { entryNumber: entryNumber, quantity: quantity },
     };
     const resData = await callPutPrivateAPI({}, urlPath, config);
     return resData;
 
   };

   export const deleteCartEntry = async (userID,cartId,entryNumber) => {
    const token = await getAccessToken();
     const urlPath = COMMON_API.POST_CART_PAGE + userID + '/cart/'+cartId+'/deleteentry';
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token.data.accessToken}`,
        // Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.dHJ1c3RlZF9jbGllbnQ.Oi29DHMG558L5Z-yCtPZEslhrQGNBfvrTTyDSMJd6r4",
       },
       data: { entryNumber: entryNumber },
     };
     const resData = await callDeletePrivateAPI({}, urlPath, config);
     return resData;
 
   };

    // add to Wishlist page
  export const addToWishListPage = async (productCode, productName, userID) => {
    const token = await getAccessToken();
     const urlPath = COMMON_API.WISH_LIST_PAGE + userID + '/favourites';
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token.data.accessToken}`,
       },
       data: { productCode: productCode, name: productName },
     };
     const resData = await callPostPrivateAPI({}, urlPath, config);
     return resData;
 
   };

   // get to Wishlist page
   export const getToWishListPage = async (userID) => {
    const urlPath = COMMON_API.WISH_LIST_PAGE + userID + '/favourites';
    const token = await getAccessToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.accessToken}`,
      },
      data: {},
    };
    const resData = await callGetPrivateAPI({}, urlPath, config);
    //console.log(resData);
    return resData;
  };


  // all get to Wishlist page
  export const getAllWishlistName = async (userID) => {
    const urlPath = COMMON_API.WISH_LIST_PAGE + userID + '/favourites/'+ 'list';
    const token = await getAccessToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.accessToken}`,
      },
      data: {},
    };
    const resData = await callGetPrivateAPI({}, urlPath, config);
    //console.log(resData);
    return resData;
  };

  // delete to Wishlist page
  export const deleteWishListPage = async (userID, name, code) => {
    const urlPath = COMMON_API.WISH_LIST_PAGE + userID + '/favourites';
    const token = await getAccessToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.accessToken}`,
      },
      data: {name: name, productCode: code},
    };
    const resData = await callDeletePrivateAPI({}, urlPath, config);
    //console.log(resData);
    return resData;
  };