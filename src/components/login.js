import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal'; // Importing Modal
import CommonButton from '../components/CommonButton';
import { PhoneNumInputField } from '../components/PhoneNumInputField';
import { auth_content } from '../constants/strings';
import Images from '../constants/Images';
import { verifyNumber } from '../utils/apiCalls';
import DeviceDetector from 'device-detector-js';
import { loginResponse } from '../store/actions/authActions';
import TermsAndConditionsModal from './TermsConditionsModal';
import PrivacyPolicy from './PrivacyPolicy1';
import styles from './Login.styles';
import { isResponseIsValid, snackBar } from '../utils/helpers';

const Login = ({ navigation }) => {
  const [number, setNumber] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [checked, setChecked] = useState(false);
  const [checkBoxDisable, setCheckBoxDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

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
        history.replace('/otp');
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

  return (
    <div style={styles.container}>
      <div style={styles.backgroundBlur}></div>
      <div style={styles.mainContent}>
        {/* <div style={styles.logoContainer}>
          <img src={Images.Logo_Hq} alt="Logo" style={styles.logo} />
        </div> */}
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
          <div style={styles.TAndCView}>
            <label style={styles.checkBoxLabel}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                disabled={checkBoxDisable}
              />
              <span style={styles.checkBoxText}>I agree to the</span>
              <span
                style={styles.checkBoxText2}
                className="linkText"
                onClick={() => setIsModalOpen(true)}
              >
                {'Terms and conditions'}
              </span>
              <span style={styles.checkBoxText}> and</span>
              <span
                style={styles.checkBoxText2}
                className="linkText"
                onClick={() => setIsModalOpen1(true)}
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
            />
          </div>
        </div>
      </div>
      <TermsAndConditionsModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <PrivacyPolicy
        isOpen={isModalOpen1}
        onRequestClose={() => setIsModalOpen1(false)}
      />
    </div>
  );
};

export default Login;
