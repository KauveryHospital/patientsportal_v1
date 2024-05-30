export const InitialState = {
    isLoading: true,
    userToken: '',
    isProfile: "0",
  };
  export const NavigationReducer = (state = InitialState, action) => {
    switch (action.type) {
      case 'Splash':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
      case 'INTRO':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
      case 'Authentication':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
  
      case 'SetProfileStatus':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
  
      case 'DASHBOARD':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
          isProfile:action.isProfile
        };
  
      case 'SIGNUP':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
  
      case 'VERIFY_DETAILS':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
  
      case 'VERIFY_DETAILS_PREFILL':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
  
      case 'FEATURE_GUIDE':
        return {
          ...state,
          userToken: action.payload,
          isLoading: false,
        };
  
      case 'SIGN_OUT':
        return {
          ...state,
          userToken: '',
        };
  
      default:
        return state;
    }
  };
  