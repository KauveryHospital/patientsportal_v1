import { COLORS, FONTS } from '../constants/Theme';

const styles = {
    button: {
      borderRadius: '28px', 
      backgroundColor: COLORS.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '20px', 
      paddingVertical: '10px', 
      borderWidth: '1px',
      borderColor: COLORS.primaryColor, 
      cursor: 'pointer', 
      outline: 'none', 
      color: COLORS.whiteColor,
      // fontFamily: FONTS.buttonTitle.fontFamily, 
      fontSize: FONTS.buttonTitle.fontSize, 
    },
    buttonText: {
      color: COLORS.whiteColor,
      // fontFamily: FONTS.buttonTitle.fontFamily,
      fontSize: FONTS.buttonTitle.fontSize,
    },
    spinner: {
      marginRight: '10px', 
      color: '#ffffff', 
    },
  };
  
  export default styles;
  