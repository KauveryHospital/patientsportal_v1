const styles = {
    toPayCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    amountText: {
      fontSize: '18px',
      color: '#333',
      margin: '5px 0',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      amountText: {
        fontSize: '16px',
      },
    },
    '@media (min-width: 601px) and (max-width: 1024px)': {
      amountText: {
        fontSize: '18px',
      },
    },
  };
  
  export default styles;
  