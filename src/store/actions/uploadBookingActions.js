import * as types from './types';



export function UploadFileBookingList(data) {
    return {
      type: types.BOOKING_UPLOADED_FILE_LIST,
      payload: data,
    };
  }

  export function UploadDuplicateBookingList(data){
    return {
      type: types.MY_UPLOAD_DUPLICATE_FILE_LIST,
      payload: data,
    };
  }


  export function removeBookingFileUploadedFile(data){
    return {
      type: types.REMOVE_BOOKING_UPLOADED_ITEM,
      payload: data,
    };
  }
  export function emptyBookingFileUploadedFile(data){
    return {
      type: types.EMPTY_BOOKING_UPLOADED_FILE_LIST,
      payload: data,
    };
  }
