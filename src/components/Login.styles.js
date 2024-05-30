// Define your styles as a JavaScript object
import { COLORS, FONTS, Fonts } from '../constants/Theme';
import {dimen_size_height} from '../utils/helpers';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    // minHeight: '100vh',
    // backgroundColor: '#f0f0f0',
    // fontFamily: 'Arial, sans-serif',
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  logoContainer: {
    marginBottom: '40px',
    backgroundColor: COLORS.secondaryColor,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    maxWidth: '100%',
    height: 'auto',
  },
  mainView: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    flex: 0.5,
    marginBottom: '40px',
  },
  inputParentView: {
    marginBottom: '10px',
  },
  titleLarge: {
    ...FONTS.titleLarge,
    fontSize: '22px',
    // fontWeight: 'bold',
    color: COLORS.textColor,
    marginBottom: '20px',
  },
  inputFieldView: {
    marginBottom: '20px',
  },
  TAndCView: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '80px',
    ...FONTS.bodyMedium,
    color: COLORS.placeholderColor,
    lineHeight: '-10@msr',
    fontFamily:Fonts.Regular
  },
  checkBoxLabel: {
    display: 'flex',
    alignItems: 'center',
    ...FONTS.bodyMedium,
    color: COLORS.placeholderColor,
    lineHeight: '-10@msr',
    fontFamily:Fonts.Regular
  },
  linkText: {
    color: 'blue',
    cursor: 'pointer',
    marginRight: '5px',
    ...FONTS.bodyMedium,
    color: COLORS.placeholderColor,
    lineHeight: '-10@msr',
    fontFamily:Fonts.Regular
  },
  checkBoxText: {
    ...FONTS.bodyMedium,
    color: COLORS.placeholderColor,
    lineHeight: '-10@msr',
    fontFamily:Fonts.Regular,
    marginRight: '5px',
  display: 'inline-block',
  },
  checkBoxText2: {
    ...FONTS.bodyMedium,
    color: COLORS.primaryColor,
    lineHeight: '-10@msr',
    marginRight: '5px',
  display: 'inline-block',
  },
  buttonView: {
    textAlign: 'center',
    marginBottom: '0px',
    marginVertical: '12@vs',
      height: dimen_size_height(8.2),
      justifyContent: 'flex-end',
  },
};

export default styles;
