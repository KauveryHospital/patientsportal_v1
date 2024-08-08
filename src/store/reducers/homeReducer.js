import * as types from '../actions/types';

export const InitialState = {
  currentRegion: '',
  currentProfile: {},
  currentProfileName: '',
  currentProfileRawData: [],
  profile_info: {},
  upcomingListPageShown: false,
  checkout_success_data: {},
  update_restart_status: false

};

export function homeReducer(state = InitialState, action) {
  switch (action.type) {
    case types.CODEPUSH_RESTART_STATUS: {
      return {
        ...state,
        update_restart_status: action.payload,
      };
    }
    case types.CHECKOUT_BOOKING_SUCCESS: {
      return {
        ...state,
        checkout_success_data: action.payload,
      };
    }
    case types.CHECKOUT_BOOKING__CLEAR_SUCCESS: {
      return {
        ...state,
        checkout_success_data: {},
      };
    }

    case types.currentRegion: {
      return {
        ...state,
        currentRegion: action.payload,
      };
    }
    case types.currentProfile: {
      return {
        ...state,
        currentProfile: action.payload,
      };
    }
    case types.currentProfileName: {
      return {
        ...state,
        currentProfileName: action.payload,
      };
    }
    case types.currentProfileRawData: {
      return {
        ...state,
        currentProfileRawData: action.payload,
      };
    }
    case types.PROFILE_INFORMATION: {
      return {
        ...state,
        profile_info: action.payload,
      };
    }
    case types.upcomingListPageShown: {
      return {
        ...state,
        upcomingListPageShown: action.payload,
      };
    }
    default:
      return state;
  }
}
