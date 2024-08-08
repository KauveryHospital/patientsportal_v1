// api.js
import Headers from '../constants/Headers'; // Adjust the path according to your project structure
import httpClient from './httpClient';
import profileSwitchHttpClient from './profileSwitchHttpClient';

export const onApiCall = async ({ method, url, data, isFileUpload = false, profileSwitch = false}) => {
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
  try {
    if(profileSwitch !== true){
      const response = await httpClient.request({
        url,
        method,
        data,
        headers: constructHeaders(),
      });
         // console.log(`===> Response 1111111111: ${JSON.stringify(response)}`)
      return {
        data: response?.data,
        status: response?.status,
      };
    }else{
      console.log('profileSwitchtrue')
      const response = await profileSwitchHttpClient.request({
        url,
        method,
        data,
        headers: constructHeaders(),
      });
         // console.log(`===> Response 1111111111: ${JSON.stringify(response)}`)
      return {
        data: response?.data,
        status: response?.status,
      };
    }
    
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