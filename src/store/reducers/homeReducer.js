import * as types from '../actions/types';
  
const InitialState = {
    currentRegion:"",
  };
  
  export function homeReducer(state = InitialState, action) {
    switch (action.type) {
      case types.currentRegion: {
        return {
          ...state,
          currentRegion: action.payload,
        };
      }
      default:
        return state;
    }
  }
  
