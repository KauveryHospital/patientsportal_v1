import * as types from '../actions/types';

const InitialState = {
    uploaded_list: [],
    my_upload_list: [],
    my_uploads_loader: true,
    selected_Document:[],
    hospitalDataList:[],
    hospitalSingleDataList:[],
    hospitalHeaderName:"",
    booking_my_upload_list:[],
    hospitalRecordBookingDataList:[],
    search_my_upload_list:[],
  }  
  
  export function recordReducer(state = InitialState, action) {
  
    switch (action.type) {
  
  
      case types.UPLOAD_RECORD_LIST: {
        const updatedList = state.uploaded_list.concat(action.payload);
        return {
          ...state,
          uploaded_list: updatedList,
        }
      }
      case types.EMPTY_UPLOAD_RECORD_LIST:{
        return {
          ...state,
          uploaded_list: [],
        }
      }
  
      case types.EMPTY_MY_UPLOAD_SECTION_RECORD_LIST:{
        return{
          ...state,
          my_upload_list:[]
        }
      }
      case types.EMPTY_UPLOAD_BOOKING_RECORD_LIST:{
        return {
          ...state,
          //uploaded_list: [],
          booking_my_upload_list:[]
        }
      }
      case types.REMOVE_UPLOADED_ITEM: {
        // Remove the selected uploaded item
        const indexToRemove = action.payload;
        // const updatedDocList = [...state.uploaded_list];
        // updatedDocList.splice(indexToRemove, 1);
        console.log('indexToRemove',indexToRemove)
        const updatedDocList = state.uploaded_list.filter(
          (item, index) => index !== indexToRemove,
        );
  
        return {
          ...state,
          uploaded_list: updatedDocList,
        };
      }
  
      case types.MY_UPLOAD_RECORD_LIST: {
        return {
          ...state,
          my_upload_list: action.payload
        }
      }
      case types.MY_UPLOAD_RECORD_EXTRA_LIST: {
        return {
          ...state,
          my_upload_list: [...state.my_upload_list, ...action.payload],
        }
      }
      case types.SELECTED_DOCUMENT: {
        return {
          ...state,
          selected_Document: action.payload
        }
      }
      case types.DELETE_MY_UPLOAD_FILE: {
        // Remove the selected  my uploaded item
        const indexToRemove = action.payload;
        const my_upload_doc_list = [...state.my_upload_list];
        my_upload_doc_list.splice(indexToRemove, 1);
  
        return {
          ...state,
          my_upload_list: my_upload_doc_list,
        };
      }
      case types.MY_UPLOAD_LOADING: {
  
        return {
          ...state,
          my_uploads_loader: action.payload
        }
      }
      case types.MY_UPLOAD_TOGGLE_MENU: {
        const { fileId } = action.payload;
        console.log('file_id', fileId)
        return {
          ...state,
          my_upload_list: state.my_upload_list.map(upload => ({
            ...upload,
            data: upload.data.map(item => ({
              ...item,
              menu: item.file_id === fileId ? !item.menu : item.menu,
            })),
          })),
        };
      }
      case types.MY_UPLOAD_RENAME: {
        const { fileId, newFileName } = action.payload;
        return {
          ...state,
          my_upload_list: state.my_upload_list.map(upload => ({
            ...upload,
            data: upload.data.map(item => ({
              ...item,
              file_name: item.file_id === fileId ? newFileName : item.file_name,
            })),
          })),
        };
      }
      case types.MY_UPLOAD_DELETE: {
        const { fileId } = action.payload;
        return {
          ...state,
          my_upload_list: state.my_upload_list? state.my_upload_list.map(upload => ({
            ...upload,
            data: upload.data.filter(item => item.file_id !== fileId),
          })) : '',
        };
      }
  
      case types.HOSPITAL_RECORD: {
        return {
          ...state,
          hospitalDataList: action.payload
        }
      }
  
      case types.HOSPITAL_RECORD_DATA: {
        return {
          ...state,
          hospitalSingleDataList: action.payload
        }
      }
      case types.HOSPITAL_RECORD_EXTRA_DATA: {
        return {
          ...state,
          hospitalSingleDataList: [...state.hospitalSingleDataList, ...action.payload],
        }
      }
      case types.HOSPITAL_RECORD_HEADER_NAME: {
        return {
          ...state,
          hospitalHeaderName: action.payload
        }
      }
  
      case types.HOSPITAL_RECORD_TOGGLE_MENU: {
        const {fileId} = action.payload;
        return {
          ...state,
          hospitalSingleDataList: state.hospitalSingleDataList.map(upload => ({
            ...upload,
            data: upload.data.map(item => ({
              ...item,
              menu: item._id.$oid === fileId ? !item.menu : item.menu,
            })),
          })),
        };
      }
  
     
  
  
      case types.MY_UPLOAD_BOOKING_RECORD_LIST: {
        const { data } = action.payload;
  console.log(action.payload,'MY_UPLOAD_BOOKING_RECORD_LIST')
        return {
          ...state,
          booking_my_upload_list: action.payload
  
          // booking_my_upload_list: action.payload.map(upload => ({
          //   ...upload,
          //   data: upload.data.map(item => ({
          //     ...item,
          //     selectable: item.booking_selected === true ? false : true,
          //   })),
          // })),
        }
      }
      case types.MY_UPLOAD_BOOKING_RECORD_EXTRA_LIST: {
        return {
          ...state,
          booking_my_upload_list: [...state.booking_my_upload_list, ...action.payload],
        }
      }
      
      case types.MY_UPLOAD_BOOKING_SELECTION: {
        const { data } = action.payload;
        // Toggle the selectable property for the selected item
        const updatedList = state.booking_my_upload_list.map((section) => {
          const updatedData = section.data.map((item) => {
            if (item === data) {
              return {
                ...item,
                selectable: !item.selectable,
              };
            }
            return item;
          });
  
          return {
            ...section,
            data: updatedData,
          };
        });
  
        return {
          ...state,
          booking_my_upload_list: updatedList,
        };
      }
      case types.MY_UPLOAD_BOOKING_SELECTED_CLEAR: {
        return {
          ...state,
          booking_my_upload_list: state.booking_my_upload_list.map(upload => ({
            ...upload,
            data: upload.data.map(item => ({
              ...item,
              selectable: false,
            })),
          })),
        };
      }
  
  
      case types.HOSPITAL_RECORD_BOOKING_DATA: {
        return {
          ...state,
          hospitalRecordBookingDataList: action.payload
        }
      }
      case types.HOSPITAL_RECORD_BOOKING_EXTRA_DATA: {
        return {
          ...state,
          hospitalRecordBookingDataList: [...state.hospitalRecordBookingDataList, ...action.payload],
        }
      }
      case types.HOSPITAL_RECORD_BOOKING_SELECTION: {
        const { data } = action.payload;
  console.log('selectedItem',data)
        // Toggle the selectable property for the selected item
        const updatedList = state.hospitalRecordBookingDataList.map((section) => {
          const updatedData = section.data.map((item) => {
            if (item === data) {
              return {
                ...item,
                selectable: !item.selectable,
              };
            }
            return item;
          });
  
          return {
            ...section,
            data: updatedData,
          };
        });
  
        return {
          ...state,
          hospitalRecordBookingDataList: updatedList,
        };
      }
  
      case types.SEARCH_MY_UPLOAD_RECORD_LIST: {
        return {
          ...state,
          search_my_upload_list: action.payload
        }
      }
  
      case types.SEARCH_MY_UPLOAD_RENAME: {
        const { fileId, newFileName } = action.payload;
        return {
          ...state,
          search_my_upload_list: state.search_my_upload_list.map(upload => ({
            ...upload,
            data: upload.data.map(item => ({
              ...item,
              file_name: item.file_id === fileId ? newFileName : item.file_name,
            })),
          })),
        };
      }
      case types.SEARCH_MY_UPLOAD_DELETE: {
        const { fileId } = action.payload;
        return {
          ...state,
          search_my_upload_list: state.search_my_upload_list.map(upload => ({
            ...upload,
            data: upload.data.filter(item => item.file_id !== fileId),
          })),
        };
      }
      case types.SEARCH_MY_UPLOAD_TOGGLE_MENU: {
        const { fileId } = action.payload;
        console.log('file_id', fileId)
        return {
          ...state,
          search_my_upload_list: state.search_my_upload_list.map(upload => ({
            ...upload,
            data: upload.data.map(item => ({
              ...item,
              menu: item.file_id === fileId ? !item.menu : item.menu,
            })),
          })),
        };
      }
      
      default:
        return state;
    }
  
  
  }
  