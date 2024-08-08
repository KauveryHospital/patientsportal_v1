import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Drawer, Button, TextField, Typography, FormControlLabel, CircularProgress, Box } from '@mui/material';
import Modal from 'react-modal';
import DeviceDetector from 'device-detector-js';
import { verifyNumber } from '../utils/apiCalls';
import { loginResponse } from '../store/actions/authActions';
import TermsAndConditionsModal from './TermsConditionsModal';
import PrivacyPolicy from './PrivacyPolicy1';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import Images from '../constants/Images';
import { COLORS } from '../constants/Theme';
import { PhoneNumInputField } from './PhoneNumInputField';
import { auth_content } from '../constants/strings';
import { Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import OTPDrawer from './OtpDrawer';

const CustomCheckbox = styled(Checkbox)({
  color: COLORS.primaryColor,
  '&.Mui-checked': {
    color: COLORS.primaryColor,
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  borderRadius: '30px',
  backgroundColor: COLORS.primaryColor,
  '&:disabled': {
    backgroundColor: '#FFF7FB', // or any other color you prefer
    color: theme.palette.text.disabled,
  },
}));

const LoginDrawer = ({ open, onClose }) => {
  const [number, setNumber] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [checked, setChecked] = useState(false);
  const [checkBoxDisable, setCheckBoxDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

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

  const verifyNumberFunc = () => {
    setCheckBoxDisable(true);
    verifyNumberApiCall();
  };

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
        // history.replace('/otp');
        handleDrawerOpen();
        setTimeout(() => {
          setCheckBoxDisable(false);
        }, 500);
      } else {
        setLoader(false);
        setTimeout(() => {
          if (response?.data?.message) {
            setIsError(true);
            setErrorText(response?.data?.message);
          } else {
            snackBar('API Error');
          }
          setTimeout(() => {
            setCheckBoxDisable(false);
          }, 500);
        }, 400);
      }
    } catch (err) {
      setLoader(false);
      setCheckBoxDisable(false);
      setTimeout(() => {
        snackBar('API Error');
      }, 400);
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 300, sm: 400, md: 500 }, padding: 3 }}>
        <Box display="flex" justifyContent="center" mb={2} mt={7} sx={{ fontFamily: 'Poppins', fontSize: '32px', color: COLORS.primaryColor, fontWeight: 'bold' }}>
          {/* <img src={Images.Logo_Hq} alt="Logo" style={{ maxWidth: '80%', height: 'auto' }} /> */}
          LOGIN
        </Box>
        <Typography variant="h6" align="center" gutterBottom mt={5} sx={{ fontFamily: 'Poppins', fontSize: '16px', color: COLORS.textColor }}>
          Enter your mobile number to verify with OTP
        </Typography>
        <Box justifyContent="center" alignItems="center" ml={10} mt={5} mb={3} sx={{ width: '100%', fontFamily: 'Poppins', fontSize: '16px' }}>
          <PhoneNumInputField
            // label="Mobile Number"
            // type="tel"
            // fullWidth
            // value={number}
            // fieldTitle={auth_content.MobileNumber}
            // handleInputChange={(e) => onChangeNum(e.target.value)}
            // error={isError}
            // maxLength={10}
            // helperText={isError ? errorText : ''}
            // InputProps={{
            //   startAdornment: <span>+91</span>,
            // }}
            // margin="normal"
            value={number}
            handleInputChange={(val) => onChangeNum(val)}
            fieldTitle={auth_content.MobileNumber}
            placeholder={auth_content.PhoneNumber}
            is_error={isError}
            errorText={errorText}
            maxLength={15}
          />
        </Box>
        <FormControlLabel
          control={
            <CustomCheckbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              disabled={checkBoxDisable}
            />
          }
          label={
            <span style={{ fontFamily: 'Poppins', fontSize: '14px', color: COLORS.placeholderColor }}>
              I agree to the{' '}
              <span
                style={{ color: COLORS.primaryColor, cursor: 'pointer', fontFamily: 'Poppins', fontSize: '14px' }}
                onClick={() => setIsModalOpen(true)}
              >
                Terms and conditions
              </span>{' '}
              and{' '}
              <span
                style={{ color: COLORS.primaryColor, cursor: 'pointer', fontFamily: 'Poppins', fontSize: '14px' }}
                onClick={() => setIsModalOpen1(true)}
              >
                Privacy Policy
              </span>{' '}
              of Kauvery Kare
            </span>
          }
          style={{ marginTop: 16 }}
        />
        <Box display="flex" justifyContent="center" mt={5} sx={{}}>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={verifyNumberFunc}
            disabled={number.length !== 10 || !checked || checkBoxDisable}
          >

            {loader ? <CircularProgress size={24} /> : 'Verify'}
          </StyledButton>
        </Box>
        <TermsAndConditionsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
        <PrivacyPolicy
          isOpen={isModalOpen1}
          onRequestClose={() => setIsModalOpen1(false)}
        />
      </Box>
      <OTPDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
    </Drawer >
  );
};

export default LoginDrawer;
