import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const TIMEOUT = 60000;

const privateAxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: TIMEOUT,
  headers: {},
});

export const getPrivate = async (url, config) => {
  try {
    return await privateAxiosInstance.get(url, config);
  } catch (error) {
    return error.response;
  }
};

export const postPrivate = async (url, data, config) => {
  try {
    return await privateAxiosInstance.post(url, data, config);
  } catch (error) {
    return error.response;
  }
};

export const putPrivate = async (url, data, config) => {
  try {
    return await privateAxiosInstance.put(url, data, config);
  } catch (error) {
    return error.response;
  }
};

export const deletePrivate = async (url, data, config) => {
  try {
    return await privateAxiosInstance.delete(url,  config,data);
  } catch (error) {
    return error.response;
  }
};