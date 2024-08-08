import * as types from './types';

export function currentRegion(data) {
  return {
    type: types.currentRegion,
    payload: data,
  };
}
export function familyReloadData(data) {
  return {
    type: types.familyReload,
    payload: data,
  };
}

export function currentProfileRawData(data) {
  return {
    type: types.currentProfileRawData,
    payload: data,
  };
}


export function currentProfile(data) {
  return {
    type: types.currentProfile,
    payload: data,
  };
}

export function currentProfileName(data) {
  return {
    type: types.currentProfileName,
    payload: data,
  };
}
export function profileInformation(data){
  return {
    type: types.PROFILE_INFORMATION,
    payload: data,
  };
}

export function upcomingListPageShown(data) {
  return {
    type: types.upcomingListPageShown,
    payload: data,
  };
}

export function checkoutSuccess(data){
  return {
    type: types.CHECKOUT_BOOKING_SUCCESS,
    payload: data,
  };
}

export function clearCheckoutSuccess(){
  return{
    type:types.CHECKOUT_BOOKING__CLEAR_SUCCESS
  }
}

export function clearCheckoutMHCSuccess(){
  return{
    type:types.CHECKOUT_MHC_CLEAR_SUCCESS
  }
}

export function codepushRestartPopUp(data){
  return{
    type:types.CODEPUSH_RESTART_STATUS,
    payload: data,
  }
}
