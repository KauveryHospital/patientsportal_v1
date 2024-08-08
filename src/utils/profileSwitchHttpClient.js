// axiosClient.js
import axios from 'axios';
import { BASE_URL } from './constant';
import { getUserInformation, getSecondaryProfileID } from './LocalStorage';
import { removeItemValue } from './helpers';
import store from '../store/actions/store'; // Make sure this points to your Redux store
import { LogoutCall } from '../store/actions/authActions';

const profileSwitchHttpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 360000,
});

profileSwitchHttpClient.interceptors.request.use(
  async function (config) {
    try {
      const gettingData = await getUserInformation('User_Data');
      const gettingSecondaryID = await getSecondaryProfileID('Secondary_Profile_ID');
      console.log('gettingSecondaryID', gettingSecondaryID);
      const tokenData = JSON.parse(gettingData);
      const IDData = JSON.parse(gettingSecondaryID);
      if (tokenData) {
        console.log('TokenData', tokenData);
        config.headers.Authorization = `Token ${tokenData?.token}`;
        config.headers.profile = `${IDData}`;
        config.headers.version = 'v2';
      }
    } catch (error) {
      console.error('Error in request interceptor:', error);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

profileSwitchHttpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response) {
      console.log(error.response);
      if (error.response.status === 401) {
        await removeItemValue('User_Data');

        // Custom event for logout action
        const logoutEvent = new Event('Logout_action');
        window.dispatchEvent(logoutEvent);

        store.dispatch(LogoutCall());
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  },
);

export default profileSwitchHttpClient;
