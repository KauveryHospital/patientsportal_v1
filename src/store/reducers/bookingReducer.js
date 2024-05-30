import * as types from '../actions/types';

const InitialState = {
    patientDetails: {
        patient_name: '',
        patient_id: '',
        notes: '',
    },
    doctorDetails: {},
    slotDetails: {},
    slotAddress: {},
    amount: '',
    consultMode: '',
    familyType: '1',
    customerCareNumber: '',
    customerCareCallNo: '',
    slotStartTime: '',
  };  
  
  export function bookingReducer(state = InitialState, action) {
    switch (action.type) {
      case types.familyReload: {
        return {
          ...state,
          familyType: action.payload
        }
      }
      case types.customerCareNumber:{
        return {
          ...state,
          customerCareNumber: action.payload
        }
      }
      case types.customerCareCallNo:{
        return {
          ...state,
          customerCareCallNo: action.payload
        }
      }
      case types.patientName: {
        return {
            ...state,
            patientDetails: {
              ...state.patientDetails,
              patient_name: action.payload,
            },
          };
      }
      case types.patientId: {
        return {
            ...state,
            patientDetails: {
              ...state.patientDetails,
              patient_id: action.payload,
            },
          };
      }
      case types.notes: {
        return {
            ...state,
            patientDetails: {
              ...state.patientDetails,
              notes: action.payload,
            },
          };
      }
      case types.doctorDetails: {
        return {
          ...state,
          doctorDetails: action.payload,
        };
      }
      case types.slotDetails: {
        return {
          ...state,
          slotDetails: action.payload,
        };
      }
      case types.slotAddress: {
        return {
          ...state,
          slotAddress: action.payload,
        };
      }
      case types.amount: {
        return {
          ...state,
          amount: action.payload,
        };
      }
      case types.slotStartTime: {
        return {
          ...state,
          slotStartTime: action.payload,
        };
      }
      default:
        return state;
    }
  }
  
