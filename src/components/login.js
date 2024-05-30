import React, { useState } from 'react';
import { CommonButton } from '../components/CommonButton';
import { PhoneNumInputField } from '../components/PhoneNumInputField';
import { auth_content } from '../constants/strings';
import styles from './Login.styles';
import Images from '../constants/Images';
import { useHistory } from 'react-router-dom';
import {allowNumOnly, isResponseIsValid, snackBar} from '../utils/helpers';
import {verifyNumber} from '../utils/apiCalls';
import DeviceDetector from 'device-detector-js';
import {useDispatch} from 'react-redux';
import {loginResponse} from '../store/actions/authActions';

const Login = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [checked, setChecked] = useState(false);
  const [checkBoxDisable, setCheckBoxDisable] = useState(false);
  const [loader, setLoader] = useState(false);

  const history = useHistory();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeNum = (num) => {
    setIsError(false);
    setNumber(num.replace(/\D/g, ''));
    if (num.length !== 10) {
      setIsError(true);
      setErrorText('Enter a valid mobile number');
    } else {
      setIsError(false);
    }
  };

  const verifyNumberFunc = () => {
    setCheckBoxDisable(true);
    // Implement verifyNumberApiCall for web    
    // history.push('/otp');
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
        getUniqueId: navigator.userAgent, // Using userAgent as a placeholder
      },
    };
    
    console.log('Body', body);

    try {
      const response = await verifyNumber(body);
      
      if (isResponseIsValid(response)) {
        console.log(response.data, 'response');
        dispatch(loginResponse(response?.data));
        setLoader(false);
        history.push('/otp'); // Navigating to OTPVerify page
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
            snackBar(Headers.apiError);
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
        snackBar(Headers.apiError);
      }, 400);
    }
  };

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src={Images.Logo_Hq} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.mainView}>
        <div style={styles.inputParentView}>
          <h2 style={styles.titleLarge}>
            Enter your mobile number to verify with OTP
          </h2>
          <div style={styles.inputFieldView}>
            <PhoneNumInputField
              value={number}
              handleInputChange={(val) => onChangeNum(val)}
              fieldTitle={auth_content.MobileNumber}
              placeholder={auth_content.PhoneNumber}
              is_error={isError}
              errorText={errorText}
              maxLength={10}
            />
          </div>
        </div>
      </div>
      <div style={styles.bottomView}>
        <div style={styles.TAndCView}>
          <label style={styles.checkBoxLabel}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              disabled={checkBoxDisable}
            />
            <span style={styles.checkBoxText}>I agree to the</span>
            <span style={styles.checkBoxText2}
              className="linkText"
              onClick={() => navigation.navigate('TermsAndConditionLogin')}
            >
              {'Terms and conditions'}
            </span>
            <span style={styles.checkBoxText}> and</span>
            <span style={styles.checkBoxText2}
              className="linkText"
              onClick={() => navigation.navigate('PrivacyPolicyLogin')}
            >
              {'Privacy Policy'}
            </span>
            <span style={styles.checkBoxText}>
              {'of Kauvery Kare'}
            </span>
          </label>
        </div>
        <div style={styles.buttonView}>
          <CommonButton
            text={auth_content.Verify}
            isLoading={loader}
            onPress={verifyNumberFunc}
            disabled={number.length !== 10 || !checked}
            style={styles.verifyButtonStyle}
            // onClick={() => navigateTo('/home')}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
