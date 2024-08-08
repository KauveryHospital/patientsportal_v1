import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';
import { styled } from '@mui/system';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import CommonButton from '../components/CommonButton';
import CommonLoader from '../components/CommonLoader';
import { auth_content } from '../constants/strings';
import {
    getFamilyProfileApi,
    getKhDetails,
    getPrimaryData,
    // resendOTP,
    // verifyOTP,
} from '../utils/apiCalls';
import { allowNumOnly, isResponseIsValid, snackBar } from '../utils/helpers';
import { resendOTP, verifyOTP } from '../utils/apiCalls';
import { otpPopupFlag, otpResponse } from '../store/actions/authActions';
import { getUserInformation, setUserInformation } from '../utils/LocalStorage';
import Images from '../constants/Images';

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
        justifyContent: 'center'
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
        marginLeft: '160px'
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
        boxShadow: '2px 4px 4px rgba(0.1, 0.1, 0.1, 0.1)',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
    },
    '& input:focus': {
        borderColor: 'transparent',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
});

const OtpVerification = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const history = useHistory();
    const dispatch = useDispatch();
    const otpInputs = useRef([]);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const data = JSON.parse(queryParams.get('data'));
    console.log('dataaaaa', data);

    // const [otp, setOtp] = useState(new Array(4).fill(''));
    const LoginData = useSelector(state => state?.authReducer?.loginData);
    const [otp_id, setOtp_id] = useState(LoginData?._id);
    const [resendTimer, setResendTimer] = useState(90); // Initial timer set to 90 seconds
    const [resendText, setResendText] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [loader, setLoader] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [attempts, setAttempts] = useState(0);

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
            console.log(body, 'body');
            const response = await verifyOTP(body);
            console.log(response, 'response');
            if (isResponseIsValid(response)) {
                console.log(response?.data, 'response');
                getUserInformation('User_Data')
                    .then(res => {
                        setLoader(false);

                        let json = JSON.parse(res);
                        if (json.token === response.data.token) {
                            console.log('Token', json.token);
                            console.log('SAME TOKEN');
                            // getKhDetailsData();
                            // navigation.navigate('AddFamilySignup', {
                            //   successStatus: true,
                            //   isSignup: true,
                            //   isSameUser: false,
                            //   isEditable:false

                            // });
                            // navigation.navigate('AddFamilySignup', {
                            //     successStatus: true,
                            //     isSignup: true,
                            //     isSameUser: true,
                            //     isEditable: false

                            // });
                            const queryParams = new URLSearchParams({
                                successStatus: true,
                                isSignup: true,
                                isSameUser: true,
                                isEditable: false,
                                data: JSON.stringify(data)
                                // item: item,
                            }).toString();

                            history.replace(`/addmember?${queryParams}`);
                        } else {
                            console.log('DIFFERENT TOKEN');
                            setUserInformation(
                                'secondaryUser_Data',
                                JSON.stringify(response?.data),
                            );
                            if (response.data.proceed_with == 'sign-up') {
                                // navigation.navigate('AddFamilySignup', {
                                //     successStatus: true,
                                //     isSignup: true,
                                //     isSameUser: false,
                                //     isEditable: false

                                // });
                                const queryParams = new URLSearchParams({
                                    successStatus: true,
                                    isSignup: true,
                                    isSameUser: false,
                                    isEditable: false,
                                    data: JSON.stringify(data)
                                    // item: item,
                                }).toString();
                                history.replace(`/addmember?${queryParams}`);
                            } else {
                                // login (App user)
                                getProfileMobileNo();
                            }
                        }
                    })
                    .catch(err => { });
            } else {
                setLoader(false);
                setTimeout(() => {
                    if (response?.data?.message) {
                        setIsError(true);
                        setErrorText(response?.data?.message);
                        //snackBar(JSON.stringify(response?.data?.message));
                    } else {
                        // snackBar(JSON.stringify(response?.data));
                        snackBar(Headers.apiError);
                    }
                }, 400);
            }
        } catch (err) {
            setLoader(false);
            setTimeout(() => {
                snackBar(JSON.stringify(err));
                // snackBar(Headers.apiError);
            }, 400);
        }
    };

    const getProfileMobileNo = async () => {
        const response = await getFamilyProfileApi();
        if (isResponseIsValid(response)) {
            const mn = response.data.mn;
            getProfileList('mn');
        }
    };

    const getProfileList = async number => {
        const response = await getPrimaryData(number);
        console.log('ressssssssss', response.data);
        if (isResponseIsValid(response)) {
            console.log('Ressp', response.data);
            const relatives = response.data.relatives;
            if (relatives.length >= 1) {
                var arr = [];
                var arr1 = [];
                relatives.forEach((item, index) => {
                    item.type = 'Secondary account';
                    item.isSelected = false;
                    if (item.is_associated === false) {
                        arr.push(item);
                    }
                });
                var primary = response.data.primary;
                primary.type = 'Primary account';
                primary.isSelected = false;
                if (primary.is_associated === false) {
                    arr.splice(0, 0, primary);
                }
                if (arr.length !== 0) {
                    //   navigation.navigate('AddFamilySelection', {
                    //     familyList: arr,
                    //     isEditable:true,
                    //     isSameUser: false,
                    //     successStatus: true,
                    //   });
                    const queryParams = new URLSearchParams({
                        familyList: JSON.stringify(arr),
                        isEditable:true,
                        isSameUser: false,
                        successStatus: true,
                    }).toString();
                    history.push(`/memberselection?${queryParams}`);
                } else {
                    //   history.push('/managefamily');
                    const queryParams = new URLSearchParams({          
                        data: JSON.stringify(data)
                        // item: item,
                      }).toString();    
                      history.push(`/managefamily?${queryParams}`);
                    snackBar("Accounts already associated");    

                }

            } else {
                const primary = response.data.primary;
                if (primary.is_associated === true) {
                    //   navigation.navigate('MainScreens');
                    //   history.push('/managefamily');
                    snackBar("Accounts already associated");
                    const queryParams = new URLSearchParams({          
                        data: JSON.stringify(data)
                        // item: item,
                      }).toString();    
                      history.push(`/managefamily?${queryParams}`);
                } else {
                    console.log("Sri ram testing")
                    //   navigation.navigate('AddFamilySignup', {
                    //     primary: primary,
                    //     successStatus: true,
                    //     isSignup: false,
                    //     isSameUser: false,
                    //     isEditable:true,
                    //   });
                    const queryParams = new URLSearchParams({
                        primary: JSON.stringify(primary),
                        successStatus: true,
                        isSignup: false,
                        isSameUser: false,
                        isEditable: true,
                        data: JSON.stringify(data)
                        // item: item,
                    }).toString();
                    history.replace(`/addmember?${queryParams}`);
                }

            }
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

    return (
        <Box sx={{ padding: 0 }}>
            <Header />
            <Box style={styles.container}>
                <Box style={styles.header}>
                    <Typography variant="h6" style={styles.title}>
                        OTP Verification
                    </Typography>
                </Box>
                <Typography variant="body2" fontSize='12px' color={COLORS.textColor} justifyContent='center' marginTop='10px' marginBottom='20px' fontFamily='Poppins'>
                    Please enter the OTP sent to your mobile number.
                </Typography>
                <StyledOtpInput>
                    {/* <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={4}
                        isInputNum
                        shouldAutoFocus
                    /> */}
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
        </Box>
    );
};

export default OtpVerification;
