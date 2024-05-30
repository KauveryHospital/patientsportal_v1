import { COLORS, FONTS } from '../constants/Theme'; // Import your colors and fonts from constants
import { dimen_size_height } from '../utils/helpers';

const styles = {
  OTPContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundColor,
  },
  titleView: {
    paddingHorizontal: '30@s',
      alignItems: 'center',
      marginTop: '35@vs',
  },
  title: {
    ...FONTS.bodyRegular,
      textAlign: 'center',
      color: COLORS.textColor,
  },
  otpInput: {
    width: '10%',
    height: '10%',
  },
  timerContainer: {
    flexDirection: 1,
    position: 'relative',
    marginTop: '-200@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    ...FONTS.bodyMedium,
    color: COLORS.textColor,
    
  },
  timerText2: {
    ...FONTS.bodyMedium,
    color: COLORS.primaryColor,
  },
  resendText: {
    ...FONTS.bodyMedium,
    color: COLORS.textColor,
    textAlign: 'center',
    lineHeight: '24px',
  },
  otp_box: {
    width: 'calc((100% - (13.5 * 10)) / 4)', // Calculate the width dynamically
    height: '50px',
    borderWidth: '1px',
    backgroundColor: COLORS.primaryBackgroundColor,
    borderRadius: '4px',
    ...FONTS.otp,
    color: COLORS.textColor,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
    boxSizing: 'border-box',
    padding: '10px',
  },
  otpView: {
    height: '64px',
    width: 'calc(100% - 90px)',
    alignItems: 'center',
    margin: '0 auto',
  },
  OtpContainerView: {
    height: dimen_size_height(11.7),
      marginHorizontal: '40@s',
      marginVertical: '20@vs',
      alignItems: 'center',
  },
  errorText: {
    ...FONTS.helperText,
    color: COLORS.errorColor,
    marginTop: '5px',
    fontSize: '11px',
    textAlign: 'center',
  },
  otpVerifyButtonView: {
    height: '64px',
    margin: '20px auto',
    alignItems: 'center',
  },
  otpVerifyButton: {
    borderWidth: '0.8px',
    borderColor: COLORS.primaryColor,
    borderRadius: '28px',
    height: '40px',
    backgroundColor: COLORS.primaryColor,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    margin: '0 16px',
  },
};

export default styles;