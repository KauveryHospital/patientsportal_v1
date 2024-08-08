// httpClient.js

import axios from 'axios';
import { BASE_URL } from './constant';
import store from '../navigation/Router';
import { getUserInformation } from './LocalStorage';
import { removeItemValue } from './helpers';
import { LogoutCall } from '../store/actions/authActions';

// Custom Event Emitter for React Web
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 360000,
});

httpClient.interceptors.request.use(
  async function (config) {
    const gettingData = await getUserInformation('User_Data');
    const tokenData = JSON.parse(gettingData);
    if (tokenData) {
      console.log('TokenData', tokenData);
      config.headers.Authorization = `Token ${tokenData?.token}`;
    }
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.log(error.response);
      if (error.response.status === 401) {
        removeItemValue('User_Data');

        // Emit custom logout event
        eventEmitter.emit("Logout_action");

        store.dispatch(LogoutCall());
      }
    } else if (error.request) {
      console.error('No response received', error.request);
    } else {
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
export { eventEmitter }; // Export event emitter for use in other parts of the app