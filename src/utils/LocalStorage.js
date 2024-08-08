const setUserInformation = async (USER_KEY, value) => {
    try {
      localStorage.setItem(USER_KEY, value);
      console.log('infor set');
    } catch (error) {
      console.error('Error setting user information:', error);
    }
  };
  
  const getUserInformation = async USER_KEY => {
    try {
      console.log('infor get'); 
      return localStorage.getItem(USER_KEY);      
    } catch (error) {
      console.error('Error getting user information:', error);
      return null;
    }
  };
  
  const setIntroStatus = async (USER_KEY, value) => {
    try {
      localStorage.setItem(USER_KEY, value);
    } catch (error) {
      console.error('Error setting intro status:', error);
    }
  };
  
  const getIntroStatus = async USER_KEY => {
    try {
      return localStorage.getItem(USER_KEY);
    } catch (error) {
      console.error('Error getting intro status:', error);
      return null;
    }
  };
  
  const clearInfo = async USER_KEY => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error clearing information:', error);
    }
  };

  const getSecondaryProfileID = async USER_KEY => {
    localStorage.getItem(USER_KEY);
  };

  const setPayCheckoutSuccess = async (USER_KEY, value) => {
    localStorage.setItem(USER_KEY, value);
  };

  const setWebHookCheckout = async (USER_KEY, value) => {
    localStorage.setItem(USER_KEY, value);
  };
  
  export {
    setUserInformation,
    getUserInformation,
    setIntroStatus,
    getIntroStatus,
    clearInfo,
    getSecondaryProfileID,
    setPayCheckoutSuccess,
    setWebHookCheckout
  };
  