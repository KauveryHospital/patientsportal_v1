const setUserInformation = async (USER_KEY, value) => {
    try {
      localStorage.setItem(USER_KEY, value);
    } catch (error) {
      console.error('Error setting user information:', error);
    }
  };
  
  const getUserInformation = async USER_KEY => {
    try {
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
  
  export {
    setUserInformation,
    getUserInformation,
    setIntroStatus,
    getIntroStatus,
    clearInfo,
  };
  