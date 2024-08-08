import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';
import { styled } from '@mui/system';
import { PhoneNumInputField } from './PhoneNumInputField';
import { auth_content } from '../constants/strings';
import CommonButton from './CommonButton';
import DeviceDetector from 'device-detector-js';
import { loginResponse } from '../store/actions/authActions';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { verifyNumber } from '../utils/apiCalls';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
        // fontWeight: 'bold',
        color: COLORS.textColor,
        fontFamily: 'Poppins',
    },
    icon: {
        color: '#dca4be',
    },
    note: {
        // color: '#dca4be', 
        // cursor: 'pointer', 
        // marginTop: '200px',
        // alignItems: 'center'
        color: COLORS.primaryColor,
        cursor: 'pointer',
    },
    continueButton: {
        backgroundColor: COLORS.primaryColor,
        color: '#fff',
        marginTop: '20px',
        padding: '8px 0',
        borderRadius: '25px',
        textTransform: 'none',
        fontFamily: 'Poppins',
        width: '30%',
        alignText: 'center',
        marginLeft: '150px'
    },
};
const StyledTextField = styled(TextField)({
    marginTop: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0.1, 0.1)',
    '& .MuiInputBase-input': {
        fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'Poppins, sans-serif',
        color: COLORS.placeholderColor, // Black color for label
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on hover
    },
    '& .MuiInputBase-root.Mui-focused': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: COLORS.placeholderColor, // Black color for focused label
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on focus
    },
    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Remove border color on hover
    },
    '& .MuiInputBase-input::placeholder': {
        fontFamily: 'Poppins, sans-serif',
        color: COLORS.placeholderColor, // Black color for placeholder
    },
});

const AddMemberNumber = () => {
    const [number, setNumber] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isError, setIsError] = useState(false);
    const [checkBoxDisable, setCheckBoxDisable] = useState(false);
    const [loader, setLoader] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const data = JSON.parse(queryParams.get('data'));
    console.log('dataaaaa', data);

    const onChangeNum = (num) => {
        setIsError(false);
        const cleanedNum = num.replace(/\D/g, '');
        setNumber(cleanedNum);
        if (cleanedNum.length !== 10 || !/^[6789]\d{9}$/.test(cleanedNum)) {
            setIsError(true);
            setErrorText('Enter a valid mobile number');
        } else {
            setIsError(false);
        }
    };

    const handleClickNumber = () => {
        setNumber(data.mn);
        // verifyNumberApiCall();
    };

    const verifyNumberFunc = () => {
        // setCheckBoxDisable(true);
        console.log('inside');
        verifyNumberApiCall();
    };

    // const verifyNumberApiCall = async () => {
    //     history.push('/memberotp');
    // }

    const verifyNumberApiCall = async () => {
        setLoader(true);
        setCheckBoxDisable(true);

        const deviceDetector = new DeviceDetector();
        const device = deviceDetector.parse(navigator.userAgent);

        const body = {
            mn: number,
            mref: {
                getBaseOs: device.os.name,
                getDevice: device.device.type,
                getDeviceId: navigator.userAgent,
                getDeviceName: device.device.brand,
                getModel: device.device.model,
                getUniqueId: navigator.userAgent,
            },
        };

        try {
            const response = await verifyNumber(body);

            if (isResponseIsValid(response)) {
                dispatch(loginResponse(response?.data));
                setLoader(false);
                // history.push('/memberotp');
                const queryParams = new URLSearchParams({          
                    data: JSON.stringify(data)
                    // item: item,
                  }).toString();
                
                  history.push(`/memberotp?${queryParams}`);

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
                snackBar(Headers.apiError);
            }, 400);
        }
    };

    return (
        <Box sx={{ padding: 0 }}>
            <Header />
            <Box style={styles.container}>
                <Box style={styles.header}>
                    <Typography variant="h6" style={styles.title}>
                        Add family
                    </Typography>
                    {/* <IconButton>
          <CloseIcon />
        </IconButton> */}
                </Box>
                {/* <Box display="flex" alignItems="center" marginBottom="20px">
        <VerifiedIcon style={{ color: 'green', marginRight: '10px' }} />
        <Typography variant="body1" style={{ color: 'green' }}>
          OTP verified
        </Typography>
      </Box> */}
                <Typography variant="body2" fontSize='12px' color={COLORS.textColor} justifyContent='center' marginTop='10px' marginBottom='20px' fontFamily='Poppins'>
                    Please provide your information so it will be easy for us to help you.
                </Typography>
                <PhoneNumInputField
                    value={number}
                    handleInputChange={(val) => onChangeNum(val)}
                    fieldTitle={auth_content.MobileNumber}
                    placeholder={auth_content.PhoneNumber}
                    is_error={isError}
                    errorText={errorText}
                    maxLength={10}

                />
                <Typography variant="body2" component="p" fontSize='12px' color={COLORS.textColor} justifyContent='center' fontFamily='Poppins' marginTop='150px'>
                    <span style={styles.note} onClick={handleClickNumber}>Click here </span>if your family member does not have a mobile number.
                </Typography>
                <Button
                    style={styles.continueButton}
                    onClick={() => verifyNumberFunc()}
                // disabled={number.length !== 10}
                >
                    Continue
                </Button>
                {/* <Box style={styles.continueButton}>
                <CommonButton
                    text={auth_content.Verify}
                    isLoading={loader}
                    onPress={verifyNumberFunc}
                    disabled={number.length !== 10}
                    // style={styles.continueButton}
                />
                </Box> */}
            </Box>
        </Box>
    );
};

export default AddMemberNumber;
