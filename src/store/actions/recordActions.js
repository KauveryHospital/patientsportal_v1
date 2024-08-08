import * as types from './types';

export function recordList(data) {
  return {
    type: types.UPLOAD_RECORD_LIST,
    payload: data,
  };
}

export function removeUploadedFile(data) {
  return {
    type: types.REMOVE_UPLOADED_ITEM,
    payload: data,
  };
}
export function emptyUploadRecord(data) {
  return {
    type: types.EMPTY_UPLOAD_RECORD_LIST,
    payload: data,
  };
}

export function emptyBookingUploadRecord(data) {
  return {
    type: types.EMPTY_UPLOAD_BOOKING_RECORD_LIST,
    payload: data,
  };
}
export function emptyMyUploadSectionRecord(data) {
  return {
    type: types.EMPTY_MY_UPLOAD_SECTION_RECORD_LIST,
    payload: data,
  };
}

export function myUploadSectionList(data) {
  return {
    type: types.MY_UPLOAD_RECORD_LIST,
    payload: data,
  };
}


export function myUploadSectionExtraList(data) {
  return {
    type: types.MY_UPLOAD_RECORD_EXTRA_LIST,
    payload: data,
  };
}
export function myUploadSelectedClear() {
  return {
    type: types.MY_UPLOAD_BOOKING_SELECTED_CLEAR
  };
}
export function selectedDocument(data) {
  return {
    type: types.SELECTED_DOCUMENT,
    payload: data,
  };
}
export function myUploadLoading(data) {
  return {
    type: types.MY_UPLOAD_LOADING,
    payload: data,
  };
}


export function ToggleMenu(fileId) {
  return {
    type: types.MY_UPLOAD_TOGGLE_MENU,
    payload: { fileId },
  };
}

export const renameFile = (fileId, newFileName) => {
  return {
    type: types.MY_UPLOAD_RENAME,
    payload: { fileId, newFileName },
  };
};
export const deleteFile = (fileId) => {
  return {
    type: types.MY_UPLOAD_DELETE,
    payload: { fileId },
  };
};

export function hospitalDataList(data) {
  return {
    type: types.HOSPITAL_RECORD,
    payload: data,
  };
}

export function hospitalReportDataList(data) {
  return {
    type: types.HOSPITAL_RECORD_DATA,
    payload: data,
  };
}

export function hospitalReportExtraDataList(data) {
  return {
    type: types.HOSPITAL_RECORD_EXTRA_DATA,
    payload: data,
  };
}

export function hospitalRecordHeaderName(data) {
  return {
    type: types.HOSPITAL_RECORD_HEADER_NAME,
    payload: data,
  };
}

export function HospitalRecordToggleMenu(fileId) {
  return {
    type: types.HOSPITAL_RECORD_TOGGLE_MENU,
    payload: { fileId },
  };
}



export function myUploadBookingSelectedList(data) {
  return {
    type: types.MY_UPLOAD_BOOKING_RECORD_LIST,
    payload: data,
  };
}

export function myUploadBookingSelectedExtraList(data) {
  return {
    type: types.MY_UPLOAD_BOOKING_RECORD_EXTRA_LIST,
    payload: data,
  };
}



export function onMyUploadBookingSelection(data) {
  return {
    type: types.MY_UPLOAD_BOOKING_SELECTION,
    payload: { data },
  };
}


export function hospitalReportBookingDataList(data) {
  return {
    type: types.HOSPITAL_RECORD_BOOKING_DATA,
    payload: data,
  };
}

export function hospitalReportBookingExtraDataList(data) {
  return {
    type: types.HOSPITAL_RECORD_BOOKING_EXTRA_DATA,
    payload: data,
  };
}

export function onHospitalRecordBookingSelection(data) {
  return {
    type: types.HOSPITAL_RECORD_BOOKING_SELECTION,
    payload: { data },
  };
}



// Search For My Upload
export function searchMyUploadList(data) {
  return {
    type: types.SEARCH_MY_UPLOAD_RECORD_LIST,
    payload: data,
  };
}
export const searchRenameFile = (fileId, newFileName) => {
  return {
    type: types.SEARCH_MY_UPLOAD_RENAME,
    payload: { fileId, newFileName },
  };
};
export const searchDeleteFile = (fileId) => {
  return {
    type: types.SEARCH_MY_UPLOAD_DELETE,
    payload: { fileId },
  };
};

export function SearchMyUploadToggleMenu(fileId) {
  return {
    type: types.SEARCH_MY_UPLOAD_TOGGLE_MENU,
    payload: { fileId },
  };
}
