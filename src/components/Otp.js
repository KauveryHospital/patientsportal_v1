import React, { useState, useEffect, useMemo, useRef, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OTPInput from 'react-otp-input'; // Replace OTPInputView with a web alternative
import { COLORS } from '../constants/Theme';
import Headers from '../constants/Headers';
import styles from './Otp.styles'; // Assuming styles.js exists for styling
import { CommonButton, SmsPermissionModal } from '../components/CommonButton';
import CommonLoader from '../components/CommonLoader';
import { auth_content } from '../constants/strings';
import { allowNumOnly, isResponseIsValid, snackBar } from '../utils/helpers';
import { resendOTP, verifyOTP } from '../utils/apiCalls';
import { otpPopupFlag, otpResponse } from '../store/actions/authActions';
import { getUserInformation, setUserInformation } from '../utils/LocalStorage';
import { AppContext } from '../navigation/AppContext';
import ContentLoader from '../components/loader/ContentLoader';
import './Otp.styles'; // Importing the CSS styles

const Otp = () => {
  const LoginData = useSelector(state => state?.authReducer?.loginData);
  // const { SignupUser, UserVerifyDetails } = useContext(AppContext);
  const dispatch = useDispatch();
  const history=useHistory();
  
  const [greenOtp, setGreenOtp] = useState('');
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [otp_id, setOtp_id] = useState(LoginData?._id);
  const [entry_id, setEntry_id] = useState(LoginData?.entry_id);
  const [modalOtp, setModalOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(120); // 120 seconds = 2 minutes
  const [resendText, setResendText] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pusherLoader, setPusherLoader] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const bottomSheetRef = useRef();

  useEffect(() => {
    setGreenOtp(LoginData.otp);
    startTimer();
  }, []);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setResendTimer(120); // Reset the timer to 120 seconds (2 minutes)
    const timer = setInterval(() => {
      setResendTimer(prevTimer => {
        if (prevTimer <= 1) {
          setIsActive(false); // Reset isActive to false when the timer ends
          clearInterval(timer);
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleResendOTP = useCallback(() => {
    if (!isActive) {
      resendOtpFunc();
      startTimer();
    }
  }, [isActive, startTimer]);

  // const codeChangeFunc = otp => {
  //   setOtp(allowNumOnly(otp));
  //   setIsError(false);
  // };

  const codeChangeFunc = (e, index) => {
    const value = allowNumOnly(e.target.value);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsError(false);
  };


  const verifyOtp = () => {
    verifyOTPApiCall();
  };

  const verifyOTPApiCall = async () => {
    setLoader(true);
    const otpString = otp.join(''); // Convert the array to a string
    const body = {
        _id: otp_id,
        otp: otpString, // Use the string version of the OTP
        entry_id: LoginData?.entry_id,
    };
    try {
        const response = await verifyOTP(body);
        if (isResponseIsValid(response)) {
            setUserInformation('User_Data', JSON.stringify(response?.data));
            setLoader(false);
            dispatch(otpResponse(response?.data));
            setTimeout(() => {
                if (response.data.proceed_with === 'sign-up') {
                    dispatch(otpPopupFlag(true));
                    history.push('/signup');
                } else {
                    // tabLoad("0");
                    history.push('/home');
                }
            }, 200);
        } else {
            setPusherLoader(false);
            setLoader(false);
            setTimeout(() => {
                if (response?.data?.message) {
                    setIsError(true);
                    setErrorText(response?.data?.message);
                } else {
                    snackBar(Headers.apiError);
                }
            }, 400);
        }
    } catch (err) {
        setLoader(false);
        setTimeout(() => {
            snackBar(JSON.stringify(err));
        }, 400);
    }
};


  const resendOtpFunc = async () => {
    setIsError(false);
    setOtp(new Array(4).fill(''));
    const body = {
      _id: LoginData?._id,
    };
    const response = await resendOTP(body);
    if (isResponseIsValid(response)) {
      const active = response.data.static.active;
      setOtp_id(response.data._id);
      if (active === 1) {
        setResendText(response.data.static.content);
        setGreenOtp(response.data.otp);
      } else {
        setResendTimer(120);
        setGreenOtp(response.data.otp);
      }
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.OTPContainer}>
      <div className={styles.titleView}>
        <p className={styles.title}>
          Please enter the OTP that has been sent to {LoginData?.mn}.
        </p>
      </div>
      <div className={styles.OtpContainerView}>
        {/* <OTPInput
          value={otp}
          onChange={codeChangeFunc}
          numInputs={4}
          isInputNum={true}
          shouldAutoFocus
          containerStyle={styles.otpView}
          inputStyle={Object.assign({}, styles.otp_box, {
            borderColor: isError
              ? COLORS.errorColor
              : otp.length === 4
              ? COLORS.textColor
              : COLORS.borderColor,
            color: isError ? COLORS.errorColor : COLORS.textColor,
          })}
        /> */}
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="4"
            value={data}
            onChange={(e) => codeChangeFunc(e, index)}
          onFocus={(e) => e.target.select()}
            style={styles.otpInput}
          />
        ))}
        {isError && <p className={styles.errorText}>Note: {errorText}</p>}
      </div>

      {resendText ? (
        <div className={styles.timerContainer}>
          <p className={styles.resendText}>{resendText}</p>
        </div>
      ) : (
        <>
          {resendTimer > 0 ? (
            <div className={styles.timerContainer}>
              <p className={styles.timerText}>You can resend OTP after </p>
              <p className={styles.timerText2}>{`${formatTime(resendTimer)} sec`}</p>
            </div>
          ) : (
            <div className={styles.timerContainer}>
              <p className={styles.timerText}>Didn't receive OTP? </p>
              <button onClick={handleResendOTP} className={styles.resendButton}>
                Resend OTP
              </button>
            </div>
          )}
        </>
      )}

      <div className={styles.otpVerifyButtonView}>
        <CommonButton
          text={auth_content.VerifyOTP}
          isLoading={false}
          customStyles={styles.otpVerifyButton}
          onPress={verifyOtp}
          disabled={otp.length !== 4}
        />
      </div>
      <CommonLoader loading={loader} />
      <ContentLoader title={'Please wait!'} content={`While we are fetching your details`} loading={pusherLoader} />
    </div>
  );
};

export default Otp;
