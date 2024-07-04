import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'; // Import Link from React Router
import { COLORS } from '../constants/Theme';
import Headers from '../constants/Headers';
import styles from './Otp.styles'; 
import CommonButton from '../components/CommonButton';
import CommonLoader from '../components/CommonLoader';
import { auth_content } from '../constants/strings';
import { allowNumOnly, isResponseIsValid, snackBar } from '../utils/helpers';
import { resendOTP, verifyOTP } from '../utils/apiCalls';
import { otpPopupFlag, otpResponse } from '../store/actions/authActions';
import { setUserInformation } from '../utils/LocalStorage';
import Images from '../constants/Images';

const Otp = () => {
  const LoginData = useSelector(state => state?.authReducer?.loginData);
  const dispatch = useDispatch();
  const history = useHistory();
  const otpInputs = useRef([]);

  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [otp_id, setOtp_id] = useState(LoginData?._id);
  const [resendTimer, setResendTimer] = useState(90); // Initial timer set to 90 seconds
  const [resendText, setResendText] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loader, setLoader] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [attempts, setAttempts] = useState(0); // State to track OTP resend attempts

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    // Auto-focus on the first OTP input box when component mounts
    otpInputs.current[0].focus();
  }, []);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setResendTimer(getResendTimerDuration()); 
    const timer = setInterval(() => {
      setResendTimer(prevTimer => {
        if (prevTimer <= 1) {
          setIsActive(false);
          clearInterval(timer);
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [attempts]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const handleResendOTP = useCallback(() => {
    if (!isActive && attempts < 3) { 
      resendOtpFunc();
      startTimer();
      setAttempts(prevAttempts => prevAttempts + 1); 
    }
  }, [isActive, startTimer, attempts]);

  const codeChangeFunc = (e, index) => {
    const value = allowNumOnly(e.target.value);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsError(false);
    // Auto focus on the next input box
    if (index < otp.length - 1 && value.length === 1) {
      const nextInput = otpInputs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        const prevInput = otpInputs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const verifyOtp = () => {
    verifyOTPApiCall();
  };

  const verifyOTPApiCall = async () => {
    setLoader(true);
    const otpString = otp.join(''); 
    const body = {
      _id: otp_id,
      otp: otpString, 
      entry_id: LoginData?.entry_id,
    };
    try {
      const response = await verifyOTP(body);
      if (isResponseIsValid(response)) {
        setUserInformation('User_Data', JSON.stringify(response?.data));
        setLoader(false);
        dispatch(otpResponse(response?.data));
        setSuccessMessage('OTP verified successfully!');
        setTimeout(() => {
          if (response.data.proceed_with === 'sign-up') {
            dispatch(otpPopupFlag(true));
            // history.push('/signup');
          } else {
            history.replace('/home');
          }
        }, 2000);
      } else {
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
      } else {
        setResendTimer(getResendTimerDuration()); // Reset timer based on attempts
      }
    }
  };

  const getResendTimerDuration = () => {
    if (attempts === 0) {
      return 90;
    } else if (attempts === 1) {
      return 60;
    } else {
      return 30;
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.OTPContainer}>
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
      <div style={styles.backgroundBlur}></div>
      <div style={styles.mainContent}>
        <div style={styles.logoContainer}>
          <img src={Images.Logo_Hq} alt="Logo" style={styles.logo} />
        </div>
        <div style={styles.titleView}>
          <h2 style={styles.title}>
            Please enter the OTP that has been sent to {LoginData?.mn}.
          </h2>
          <Link style={styles.editnum} to="/">Edit Mobile Number</Link> {/* Back button to Login page */}
        </div>
        <div style={styles.OtpContainerView}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={e => codeChangeFunc(e, index)}
              onKeyDown={e => handleKeyDown(e, index)} // Handle backspace key
              onFocus={e => e.target.select()}
              id={`otpInput_${index}`}
              autoComplete="one-time-code"
              style={styles.otpInput}
              ref={ref => (otpInputs.current[index] = ref)} // Set refs for OTP inputs
            />
          ))}
        </div>
        {isError && <p style={styles.errorText}>Note: {errorText}</p>}
        {resendText ? (
          <div style={styles.timerContainer}>
            <p style={styles.resendText}>{resendText}</p>
          </div>
        ) : (
          <>
            {resendTimer > 0 ? (
              <div style={styles.timerContainer}>
                <p style={styles.timerText}>You can resend OTP after </p>
                <p style={styles.timerText2}>{`${formatTime(resendTimer)} sec`}</p>
              </div>
            ) : (
              <div style={styles.timerContainer}>
                <p style={styles.timerText}>Didn't receive OTP? </p>
                <button onClick={handleResendOTP} style={styles.resendButton}>
                  Resend OTP
                </button>
              </div>
            )}
          </>
        )}
        <div style={styles.otpVerifyButtonView}>
          <CommonButton
            text={auth_content.VerifyOTP}
            isLoading={false}
            customStyles={styles.otpVerifyButton}
            onPress={verifyOtp}
            disabled={otp.some(value => value === '')}
          />
        </div>
        <CommonLoader loading={loader} />
        {attempts > 0 && attempts < 3 && (
                    <p style={styles.attemptsText}>
                    You have {3 - attempts} {3 - attempts === 1 ? 'attempt' : 'attempts'} remaining.
                  </p>
                )}
              </div>
            </div>
          );
        };
        
        export default Otp;
        
