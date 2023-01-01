import { getPrivate, postPrivate, putPrivate, deletePrivate } from "./apiClient";
export const callGetPrivateAPI = async (fields, urlPath, additionalConfig) => {
  try {
    const finalData = {
      ...additionalConfig,
    };
    const response = await getPrivate(urlPath, finalData);

    return response;
  } catch (error) {
    return error;
  }
};

export const callPostPrivateAPI = async (fields, urlPath, config) => {
  try {
    const finalData = {
      ...config,
    };
    const response = await postPrivate(urlPath, config.data, finalData);
    if(response.data.errors){
      var error = '';
      response.data.errors.forEach(element => {
        error += element.msg+' \n'
      });
      alert(error)
    }
    return response;
  } catch (error) {
    // alert(error)
    return error;
  }
};

export const callPutPrivateAPI = async (fields, urlPath, config) => {
  try {
    const finalData = {
      ...config,
    };
    const response = await putPrivate(urlPath, config.data, finalData);
    if(response.data.errors){
      var error = '';
      response.data.errors.forEach(element => {
        error += element.msg+' \n'
      });
      alert(error)
    }
    return response;
  } catch (error) {
    // alert(error)
    return error;
  }
};

export const callDeletePrivateAPI = async (fields, urlPath, config) => {
  try {
    const finalData = {
      ...config,
    };
    const response = await deletePrivate(urlPath, config.data, finalData);
    if(response.data.errors){
      var error = '';
      response.data.errors.forEach(element => {
        error += element.msg+' \n'
      });
      alert(error)
    }
    return response;
  } catch (error) {
    // alert(error)
    return error;
  }
};