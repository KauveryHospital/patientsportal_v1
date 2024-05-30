import * as types from './types';

export function loginResponse(data) {
  return {
    type: types.loginResponse,
    payload: data,
  };
}
export function otpResponse(data) {
  return {
    type: types.otpResponseData,
    payload: data,
  };
}

export function profileImage(data) {
  return {
    type: types.profileImageUrl,
    payload: data,
  };
}

export function profileImageSaved(data) {
  return {
    type: types.profileImageUrlSaved,
    payload: data,
  };
}

export function staticDataAction(data) {
  return {
    type: types.staticData,
    payload: data,
  };
}

export function otpPopupFlag(data) {
  return {
    type: types.otpPopupStatus,
    payload: data,
  };
}

export function verifyDetailsData(data) {
  return {
    type: types.verifyUserData,
    payload: data,
  };
}
export function verifyDetailsSingleData(data) {
  return {
    type: types.verifyDetailsSingle,
    payload: data,
  };
}

export function verifyDetailsDataUnselected(data) {
  return {
    type: types.verifyUserDataUnselected,
    payload: data,
  };
}

export function LogoutCall() {
  return {
    type: "USER_LOGOUT",
    payload: "",
  };
}

export function unitNameData(data){
  return {
    type :types.unitName,
    payload:data
  }
}

export function getMobNoData(data){
  return {
    type: types.mobNumber,
    payload:data
  }
}
