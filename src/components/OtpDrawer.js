import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'; // Import Link from React Router
import { COLORS } from '../constants/Theme';
import { Link as RouterLink } from 'react-router-dom';
import Headers from '../constants/Headers';
import { styled } from '@mui/system';
// import styles from './Otp.styles'; 
import CommonButton from '../components/CommonButton';
import CommonLoader from '../components/CommonLoader';
import { auth_content } from '../constants/strings';
import { allowNumOnly, isResponseIsValid, snackBar } from '../utils/helpers';
import { resendOTP, verifyOTP } from '../utils/apiCalls';
import { otpPopupFlag, otpResponse } from '../store/actions/authActions';
import { setUserInformation } from '../utils/LocalStorage';
import Images from '../constants/Images';
import { Drawer, Box, Typography, Button, colors } from '@mui/material';
import SignupDrawer from './SignupDrawer';

const styles = {
    container: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '500px',
        margin: '20px auto',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    title: {
        color: COLORS.textColor,
        fontFamily: 'Poppins',
    },
    timerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
    },
    resendContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        flexDirection: 'column',
    },
    timerText: {
        color: COLORS.textColor,
        fontFamily: 'Poppins',
        fontSize: '12px',
        marginTop: '40px'
    },
    successMessage: {
        color: 'green',
        fontFamily: 'Poppins',
        fontSize: '12px',
        marginTop: '20px',
        marginBottom: '-20px',
        textAlign: 'center'
    },
    timerText2: {
        color: COLORS.textColor,
        fontFamily: 'Poppins',
        fontSize: '12px',
        marginTop: '40px',
        color: COLORS.primaryColor
    },
    attemptsText: {
        color: COLORS.textColor,
        fontFamily: 'Poppins',
        fontSize: '12px',
        marginTop: '40px',
        color: COLORS.textColor,
        justifyContent: 'center',
        textAlign: 'center'
    },
    errorText: {
        //  ...FONTS.bodyMedium,
        color: COLORS.errorColor,
        fontSize: '10px',
        fontFamily: 'Poppins',
        textAlign: 'center',
        marginTop: '8px',
      },
    note: {
        color: COLORS.primaryColor,
    },
    continueButton: {
        display: 'flex',
        backgroundColor: COLORS.primaryColor,
        color: '#fff',
        marginTop: '20px',
        padding: '8px 0',
        borderRadius: '25px',
        textTransform: 'none',
        fontFamily: 'Poppins',
        width: '30%',
        textAlign: 'center',
        marginLeft: '140px'
    },
    resendButton: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.primaryColor,
        color: '#fff',
        marginTop: '20px',
        padding: '8px 0',
        borderRadius: '25px',
        textTransform: 'none',
        fontFamily: 'Poppins',
        width: '30%',
        textAlign: 'center',
        // marginLeft: '150px'
    },
};

const StyledOtpInput = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    '& input': {
        width: '40px',
        height: '40px',
        margin: '0 10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid transparent',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
    },
    '& input:focus': {
        borderColor: 'transparent',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
});

const StyledLink = styled(RouterLink)(({ theme }) => ({
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: COLORS.textColor,
    textDecoration: 'none',
    '&:hover': {
    //   color: theme.palette.primary.main,
      textDecoration: 'underline',
      color: COLORS.primaryColor
    },
  }));

const OTPDrawer = ({ open, onClose }) => {
    const LoginData = useSelector(state => state?.authReducer?.loginData);
    const dispatch = useDispatch();
    const history = useHistory();
    const otpInputs = useRef([]);

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otp_id, setOtp_id] = useState(LoginData?._id);
    const [resendTimer, setResendTimer] = useState(90); // Initial timer set to 90 seconds
    const [resendText, setResendText] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [loader, setLoader] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [attempts, setAttempts] = useState(0); // State to track OTP resend attempts
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        startTimer();
    }, []);

    useEffect(() => {
        return () => {
            stopTimer();
        };
    }, []);

    //   useEffect(() => {
    //     // Auto-focus on the first OTP input box when component mounts
    //     if(otpInputs){
    //     otpInputs.current[0].focus();
    //     }
    //   }, []);

    useEffect(() => {
        if (otpInputs.current && otpInputs.current[0]) {
            otpInputs.current[0].focus();
        }
    }, [otpInputs.current]);

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
console.log('otpppppp', otp);
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
        console.log('strrrr', otpString);
        const body = {
            _id: otp_id,
            otp: otpString,
            entry_id: LoginData?.entry_id,
        };
        console.log('bodyyyyyy', body);
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
                        handleDrawerOpen();
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
        setOtp(new Array(6).fill(''));
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

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
      };
    
      const handleDrawerClose = () => {
        setIsDrawerOpen(false);
      };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: { xs: 300, sm: 400, md: 500 }, padding: 0 }}>

                {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
                <Box display="flex" justifyContent="center" mb={2} mt={7} sx={{ fontFamily: 'Poppins', fontSize: '32px', color: COLORS.primaryColor, fontWeight: 'bold' }}>
                    {/* <img src={Images.Logo_Hq} alt="Logo" style={{ maxWidth: '80%', height: 'auto' }} /> */}
                    OTP Verification
                </Box>
                <Box variant="h6" align="center" gutterBottom mt={5} sx={{ fontFamily: 'Poppins', fontSize: '16px', color: COLORS.textColor }}>
                    Please enter the OTP that has been sent to {LoginData?.mn}.
                </Box>
                <Typography variant="h6" align="center" gutterBottom mt={5} sx={{ fontFamily: 'Poppins', fontSize: '16px', color: COLORS.textColor }}>
                <StyledLink to="/">Edit Mobile Number</StyledLink>
                </Typography>
                <StyledOtpInput>
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={e => codeChangeFunc(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            onFocus={e => e.target.select()}
                            id={`otpInput_${index}`}
                            autoComplete="one-time-code"
                            style={styles.otpInput}
                            ref={ref => (otpInputs.current[index] = ref)}
                        />
                    ))}
                </StyledOtpInput>
                {isError && <p style={styles.errorText}>Note: {errorText}</p>}
                {resendText ? (
                    <div style={styles.timerContainer}>
                        <p style={styles.resendText}>{resendText}</p>
                    </div>
                ) : (
                    <>
                        {resendTimer > 0 ? (
                            <div style={styles.timerContainer}>
                                <span style={styles.timerText}>You can resend OTP after&nbsp;</span>
                                <span style={styles.timerText2}>{`${formatTime(resendTimer)} sec`}</span>
                            </div>
                        ) : (
                            <div style={styles.resendContainer}>
                                <div>
                                    <p style={styles.timerText}>Didn't receive OTP? </p>
                                </div>
                                <Button
                                    style={styles.resendButton}
                                    onClick={handleResendOTP}
                                    // disabled={otp.length !== 4}
                                    >
                                    Resend OTP
                                </Button>
                                {/* <button onClick={handleResendOTP} style={styles.resendButton}>
                                    Resend OTP
                                </button> */}
                            </div>
                        )}
                    </>
                )}
                <Button
                    style={styles.continueButton}
                    onClick={verifyOtp}
                    disabled={otp.length !== 6}>
                    Continue
                </Button>
                {attempts > 0 && attempts < 3 && (
                    <p style={styles.attemptsText}>
                        You have {3 - attempts} {3 - attempts === 1 ? 'attempt' : 'attempts'} remaining.
                    </p>
                )}
            </Box>
            <SignupDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
        </Drawer>        
    );
};

export default OTPDrawer;