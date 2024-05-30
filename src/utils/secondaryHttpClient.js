import axios from 'axios';
import {BASE_URL} from './constant';
import {store} from '../navigation/Router';
import {getUserInformation} from './LocalStorage';
const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 360000,
});
httpClient.interceptors.request.use(
  async function (config) {
    const gettingData = await getUserInformation('secondaryUser_Data');
    const tokenData = JSON.parse(gettingData);
    if (tokenData) {
      console.log('TokenData', tokenData)
      config.headers.Authorization = `Token ${tokenData?.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.log(error.response);
      if (error.response.status === 401) {
        store.dispatch({type: 'LOGIN', payload: '5'});
      }
    } else if (error.request) {
    } else {
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  },
);

export default httpClient;
