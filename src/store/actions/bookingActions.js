import * as types from './types';

export function patient_Name(data) {
  return {
    type: types.patientName,
    payload: data,
  };
}

export function patient_Id(data) {
    return {
      type: types.patientId,
      payload: data,
    };
  }

  export function patient_Notes(data) {
    return {
      type: types.notes,
      payload: data,
    };
  }

  export function doctorDetailsItem(data) {
    return {
      type: types.doctorDetails,
      payload: data,
    };
  }

  export function slotAmount(data) {
    return {
      type: types.amount,
      payload: data,
    };
  }

  export function slotDetails(data) {
    return {
      type: types.slotDetails,
      payload: data,
    };
  }

  export function slotAddress(data) {
    return {
      type: types.slotAddress,
      payload: data,
    };
  }

  export function consultMode(data) {
    return {
      type: types.consultMode,
      payload: data,
    };
  }

  export function customerCareNumberData(data) {
    return {
      type: types.customerCareNumber,
      payload: data,
    };
  }

  export function customerCareCallNo(data) {
    return {
      type: types.customerCareCallNo,
      payload: data,
    };
  }

  export function slotStartTime(data) {
    return {
      type: types.slotStartTime,
      payload: data,
    };
  }
