import React, { useReducer } from 'react';
import * as types from '../actions/types';

const initialState = {
  file_uploaded_list: [],
  my_upload_list: [],
  my_uploads_loader: true,
  selected_Document: [],
  hospitalDataList: [],
  hospitalSingleDataList: [],
  hospitalHeaderName: ""
};

// const types = {
//   BOOKING_UPLOADED_FILE_LIST: 'BOOKING_UPLOADED_FILE_LIST',
//   MY_UPLOAD_DUPLICATE_FILE_LIST: 'MY_UPLOAD_DUPLICATE_FILE_LIST',
//   EMPTY_BOOKING_UPLOADED_FILE_LIST: 'EMPTY_BOOKING_UPLOADED_FILE_LIST',
//   REMOVE_BOOKING_UPLOADED_ITEM: 'REMOVE_BOOKING_UPLOADED_ITEM',
// };

export function uploadBookingReducer(state, action) {
  switch (action.type) {
    case types.BOOKING_UPLOADED_FILE_LIST: {
      const updatedList = state.file_uploaded_list.concat(action.payload);
      const upadtedFilteredList = updatedList.filter((obj, index) => {
        return index === updatedList.findIndex(o => obj.file_id === o.file_id);
      });

      console.log('upadtedFilteredList', upadtedFilteredList);
      return {
        ...state,
        file_uploaded_list: upadtedFilteredList,
      };
    }

    case types.MY_UPLOAD_DUPLICATE_FILE_LIST: {
      const updatedList = state.file_uploaded_list.concat(action.payload);
      return {
        ...state,
        file_uploaded_list: updatedList,
      };
    }

    case types.EMPTY_BOOKING_UPLOADED_FILE_LIST: {
      return {
        ...state,
        file_uploaded_list: [],
      };
    }

    case types.REMOVE_BOOKING_UPLOADED_ITEM: {
      const indexToRemove = action.payload;
      console.log('indexToRemove', indexToRemove);
      const updatedDocList = state.file_uploaded_list.filter(
        (item, index) => index !== indexToRemove,
      );

      return {
        ...state,
        file_uploaded_list: updatedDocList,
      };
    }

    default:
      return state;
  }
}