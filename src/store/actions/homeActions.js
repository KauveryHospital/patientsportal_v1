import * as types from './types';

export function currentRegion(data) {
  return {
    type: types.currentRegion,
    payload: data,
  };
}
export function familyReloadData(data){
  return {
    type:types.familyReload,
    payload:data
  }
}