// api.js
import Headers from '../constants/Headers'; 
import httpClient from './httpClient';

export const onApiCall = async ({ method, url, data, isFileUpload = false }) => {
  const constructHeaders = () => {
    if (isFileUpload) {
      return {
        'Content-Type': 'multipart/form-data',
      };
    } else {
      return {
        'Content-Type': 'application/json',
      };
    }
  };

  console.log(`===> Request: ${method} ${url}`);
  console.log(data);
  try {
    const response = await httpClient.request({
      url,
      method,
      data,
      headers: constructHeaders(),
    });

    return {
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.error(`Kauvery API error: ${JSON.stringify(error.response)}`);
    if (error.response) {
      return {
        data: error.response.data.error,
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        data: Headers.apiError,
      };
    } else {
      return {
        data: Headers.apiError,
      };
    }
  }
};
