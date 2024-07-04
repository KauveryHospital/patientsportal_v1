import { COLORS, FONTS, Fonts } from '../constants/Theme';
import { dimen_size_height } from '../utils/helpers';
import BackgroundImage from '../assets/images/bg1.jpg'; // Adjust the path as necessary

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#FFFFFFCC',
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: '120%',
    backgroundPosition: '150%',
    filter: 'blur(0px)',
    zIndex: -1,
  },
  mainContent: 
  {
     position: 'relative',
      zIndex: 1,
      width: '100%',
      maxWidth: '500px',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', 
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    
  },
  logoContainer: {
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    maxWidth: '25%',
    height: 'auto',
  },
  mainView: {
    width: '100%',
  },
  inputParentView: {
    marginBottom: '10px',
    width: '100%',
  },
  titleLarge: {
    ...FONTS.titleLarge,
    fontSize: '22px',
    color: COLORS.textColor,
    marginBottom: '20px',
    textAlign: 'center',
  },
  inputFieldView: {
    marginBottom: '20px',
    width: '100%',
  },
  TAndCView: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    // ...FONTS.bodyMedium,
    color: COLORS.placeholderColor,
    lineHeight: '1.5',
    // fontFamily: Fonts.Regular,
    textAlign: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  checkBoxLabel: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  linkText: {
    color: COLORS.primaryColor,
    cursor: 'pointer',
    marginRight: '5px',
    // ...FONTS.bodyMedium,
    lineHeight: '1.5',
    // fontFamily: Fonts.Regular,
  },
  checkBoxText: {
    // ...FONTS.bodyMedium,
    color: COLORS.placeholderColor,
    lineHeight: '1.5',
    // fontFamily: Fonts.Regular,
    marginRight: '5px',
    display: 'inline-block',
  },
  checkBoxText2: {
    // ...FONTS.bodyMedium,
    color: COLORS.primaryColor,
    lineHeight: '1.7',
    marginRight: '5px',
    display: 'inline-block',
  },
  buttonView: {
    width: '100%', // Ensure the button container takes full width
    display: 'flex',
    justifyContent: 'center', 
    marginTop: '20px', 
  },
  // Media queries for responsiveness
  '@media (max-width: 768px)': {
    mainContent: {
      maxWidth: '100%',
      margin: '10px',
      padding: '15px',
    },
    titleLarge: {
      fontSize: '18px',
      marginBottom: '15px',
    },
    inputFieldView: {
      marginBottom: '15px',
    },
    TAndCView: {
      marginBottom: '40px',
    },
    buttonView: {
      marginVertical: '10px',
    },
    button: {
      width: '100%', // Adjust button width for smaller screens
    },
  },
  '@media (max-width: 480px)': {
    titleLarge: {
      fontSize: '16px',
      marginBottom: '10px',
    },
    inputFieldView: {
      marginBottom: '10px',
    },
    TAndCView: {
      marginBottom: '30px',
    },
    buttonView: {
      marginVertical: '8px',
    },
  },
};

export default styles;
