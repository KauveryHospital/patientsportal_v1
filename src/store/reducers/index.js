// import * as types from '../actions/types';
import {combineReducers} from 'redux';
import {IntroSliderReducer} from './IntroSliderReducer';
import {StaticReducer} from './StaticReducer';
import { authReducer } from './authReducer';
import { homeReducer } from './homeReducer';
import { bookingReducer } from './bookingReducer';
const appReducer = combineReducers({
  IntroSliderReducer,
  StaticReducer,
  authReducer,
  homeReducer,
  bookingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
