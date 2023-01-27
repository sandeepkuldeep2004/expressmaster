import { callGetPrivateAPI } from ".";
import { getAccessToken } from "./common";
import { COMMON_API } from "./constants";


export const getStoresByZipCode = async (zipCode)=>{
    const urlPath = COMMON_API.GET_STORE_POSTALCODE + `/${zipCode}`;
    const token = await getAccessToken();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token.data.accessToken}`,
        },
        data: {},
    };

    const resData = await callGetPrivateAPI({}, urlPath, config);
    return resData;



}

export const getAllStores = async ()=>{
    const urlPath = COMMON_API.GET_STORE_PAGE;
    const token = await getAccessToken();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token.data.accessToken}`,
        },
        data: {},
    };

    const resData = await callGetPrivateAPI({}, urlPath, config);
    return resData;
}
