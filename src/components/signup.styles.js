export const styles = {
    signupContainer: {
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '24px',
      textAlign: 'center',
    },
    subheading: {
      fontSize: '16px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
    },
    select: {
      padding: '10px',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: isActive => ({
      padding: '10px 20px',
      backgroundColor: isActive ? '#007BFF' : '#CCC',
      color: '#FFF',
      border: 'none',
      cursor: isActive ? 'pointer' : 'not-allowed',
      textAlign: 'center',
    }),
    inputGroup: {
      display: 'flex',
    },
    searchButton: {
      marginLeft: '10px',
      padding: '10px',
      cursor: 'pointer',
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      backgroundColor: '#FFF',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      borderRadius: '8px',
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
    },
    searchInput: {
      padding: '10px',
      marginBottom: '10px',
    },
    searchResults: {
      listStyle: 'none',
      padding: '0',
    },
    searchResultItem: {
      padding: '10px',
      cursor: 'pointer',
      borderBottom: '1px solid #CCC',
    },
  };
  