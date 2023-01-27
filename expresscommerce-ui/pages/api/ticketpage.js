import { callPostPrivateAPI, callGetPrivateAPI, callPutPrivateAPI, callDeletePrivateAPI } from ".";
import { COMMON_API } from "./constants";
import { getAccessToken } from "./common";

export const postTicket = async (email,payload) => {
    const urlPath = COMMON_API.POST_TICKET_PAGE + email +'/supportTicket';
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


  export const getTicketPriority = async (email, ticketType) => {

    const urlPath = COMMON_API.POST_TICKET_PAGE + email + `/${ticketType}` + '/supportTicketPriority';
    const token = await getAccessToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.accessToken}`,
      },
    };
    const resData = await callGetPrivateAPI({}, urlPath, config);
    return resData;
  }; //end of method


  export const getCustomerTickets = async (email) => {

    const urlPath = COMMON_API.POST_TICKET_PAGE + email + '/fetchUserSupportTickets';
    const token = await getAccessToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.data.accessToken}`,
      },
    };
    const resData = await callGetPrivateAPI({}, urlPath, config);
    return resData;
  }; //end of method
  
  