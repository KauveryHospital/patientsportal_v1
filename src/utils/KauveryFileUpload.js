import axios from 'axios';

import { BASE_URL } from "./constant";
import { isResponseIsValid } from "./helpers";

export const KauvaryFileUpload = (token, input, profile_id) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        version: 'v2',
        profile: profile_id,
      },
      timeout: 1000000,
    };

    axios.post(`${BASE_URL}base/0/document/upload/`, input, config)
      .then((response) => {
        console.log('Kauvery File Upload response', JSON.stringify(response.data));
        if (isResponseIsValid(response)) {
          resolve(response.data); // Resolve the promise for success
        } else {
          reject(response.data); // Reject the promise for failure
        }
      })
      .catch((error) => {
        console.log('Kauvery Upload error', error);
        reject(error); // Reject the promise for error
      });
  });
};

