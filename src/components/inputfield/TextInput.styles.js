// import { COLORS } from '../constants'; 

const getStyles = (isError, noteText, isSmallScreen) => ({
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: noteText ? '20px' : '0',
    width: '100%',
  },
  fieldTitleContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: '8px',
  },
  fieldTitle: {
    fontSize: '14px',
    color: '#333',
  },
  textInputContainer: {
    position: 'relative',
    width: '100%',
  },
  textInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: isSmallScreen ? '12px' : '16px',
    resize: 'vertical',
    top: '2em',
    minHeight: '100px',
  },
  textInputNotEmpty: {
    top: '0.6em',
  },
  desText: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
  },
  '@media (max-width: 600px)': {
    textInput: {
      fontSize: '12px',
      padding: '8px',
    },
  },
  '@media (min-width: 601px) and (max-width: 1024px)': {
    textInput: {
      fontSize: '14px',
      padding: '9px',
    },
  },
});

export default getStyles;
