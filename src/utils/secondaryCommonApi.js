import Headers from '../constants/Headers';
import httpClient from './secondaryHttpClient';

export const onApiSecondaryCall = async ({method, url, data, isFileUpload = false}) => {
  const constructHeaders = () => {
    if (isFileUpload) {
      return {
        common: {'Content-Type': 'multipart/form-data'},
      };
    } else {
      return {
        common: {'Content-Type': 'application/json'},
      };
    }
  };
  console.log(`===> Request: ${method} ${url}`);
  try {
    const response = await httpClient.request({
      url,
      method,
      data,
      headers: constructHeaders(),
    });
//    console.log(`===> Response 1111111111: ${JSON.stringify(response)}`)
    return {
   
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.log('Err catch', error);
  //  console.log(`===> Error1111111111: ${JSON.stringify(error.response)}`)
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
