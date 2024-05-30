// authReducer.js
import * as types from '../actions/types';

const InitialState = {
  loginData: {},
  otpData: {},
  profileImage: "",
  profileImageSaved: "",
  unitName: "",
  mobNo: "",
  otpPopup: false,
  verifyUserDetails: [],
  verifyUserDataUnselected: [],
  verifyUserSingleData: false
};

export function authReducer(state = InitialState, action) {
  switch (action.type) {
    case types.loginResponse: {
      return {
        ...state,
        loginData: action.payload,
      };
    }
    case types.mobNumber: {
      return {
        ...state,
        mobNo: action.payload,
      }
    }
    case types.otpResponseData: {
      return {
        ...state,
        otpData: action.payload,
      };
    }
    case types.profileImageUrl: {
      return {
        ...state,
        profileImage: action.payload,
      };
    }
    case types.otpPopupStatus: {
      return {
        ...state,
        otpPopup: action.payload,
      };
    }
    case types.profileImageUrlSaved: {
      return {
        ...state,
        profileImageSaved: action.payload,
      };
    }
    case types.verifyUserData: {
      return {
        ...state,
        verifyUserDetails: action.payload,
      };
    }
    case types.verifyDetailsSingle: {
      return {
        ...state,
        verifyUserSingleData: action.payload,
      };
    }
    case types.verifyUserDataUnselected: {
      return {
        ...state,
        verifyUserDataUnselected: action.payload,
      };
    }
    case types.unitName: {
      return {
        ...state,
        unitName: action.payload,
      };
    }
    default:
      return state;
  }
}
