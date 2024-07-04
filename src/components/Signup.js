import React, { useState, useEffect, useReducer } from 'react';
import moment from 'moment';
import { googlePinCode, signUp, GooglePlaceIds } from '../utils/apiCalls'; // Import your utility functions
import { styles, COLORS } from './signup.styles';
import { getUserInformation, setUserInformation } from '../utils/LocalStorage';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import {
  NavigationReducer,
  InitialState,
} from '../store/reducers/NavigationReducer';

const Signup = ({ route, navigation }) => {
  const [state, dispatch] = useReducer(NavigationReducer, InitialState);
  const [popupLoading, setPopupLoading] = useState(false);
  const [signUpState, setSignUpState] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [genderState, setGenderState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [nameErrorState, setNameErrorState] = useState(false);
  const [dobErrorState, setDobErrorState] = useState(false);
  const [pinCodeErrorState, setPinCodeErrorState] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');
  const [dobErrorText, setDobErrorText] = useState('');
  const [pinCodeErrorText, setPinCodeErrorText] = useState('');
  const [loader, setLoader] = useState(false);
  const [locationSearchResult, setLocationSearchResult] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    nextButtonValidation();
  }, [patientName, selectedDate, genderValue, pinCode, address]);

  const nextButtonValidation = () => {
    if (
      patientName !== '' &&
      selectedDate !== '' &&
      genderValue !== '' &&
      pinCode.length === 6 &&
      address !== '' &&
      !nameErrorState &&
      !dobErrorState &&
      !pinCodeErrorState
    ) {
      setSignUpState(true);
    } else {
      setSignUpState(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const body = {
      name: patientName,
      dob: formattedDate,
      gender: genderValue,
      address: address,
      pincode: pinCode,
    };

    try {
      setLoader(true);
      const response = await signUp(body);
      setLoader(false);
      if (isResponseIsValid(response)) {
        getUserInformation('User_Data').then((res) => {
          if (res === null) {
            return;
          } else {
            var js = JSON.parse(res);
            js.is_registered = 1;
            setUserInformation('User_Data', JSON.stringify(js));
          }
        });
        setTimeout(() => {
          dispatch({ type: 'SetProfileStatus', payload: '4' });
        }, 200);
      } else {
        console.log(response?.data, 'Response DATA');
        setTimeout(() => {
          if (response?.data) {
            if (response?.data?.dob) {
              setDobErrorState(true);
              setDobErrorText(response?.data?.dob);
            }
            if (response?.data?.pincode) {
              setPinCodeErrorState(true);
              setPinCodeErrorText(response?.data?.pincode);
            }
            snackBar(response?.data?.error);
          } else {
            snackBar('API Error');
          }
        }, 400);
      }
    } catch (err) {
      console.log(err, 'ERROR');
      setLoader(false);
      setTimeout(() => {
        snackBar('API Error');
      }, 400);
    }
  };

  const handleSearchChange = async (event) => {
    setAddress(event.target.value);
    if (event.target.value === '') {
      setSearchedData([]);
    } else {
      const placeIds = await GooglePlaceIds(event.target.value);
      setSearchedData(placeIds.data.data || []); // Ensure it's an array
    }
  };

  const handleLocationSelection = async (placeItem) => {
    try {
      const pinCodeDetails = await googlePinCode(placeItem);
      if (pinCodeDetails.data) {
        setPinCode(pinCodeDetails.data.pincode);
        setAddress(pinCodeDetails.data.address);
        setSearchedData([]); // Clear search results after selection
      }
    } catch (error) {
      console.error(error);
      // Handle error if fetching pincode details fails
    }
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]{3,}$/;
    if (!nameRegex.test(name)) {
      setNameErrorState(true);
      setNameErrorText('Name should contain only letters and at least 3 characters');
    } else {
      setNameErrorState(false);
      setNameErrorText('');
    }
    setPatientName(name);
    nextButtonValidation();
  };

  const validateDOB = (date) => {
    const selected = moment(date);
    const today = moment();
    const earliestDate = moment('1800-01-01');

    if (selected.isAfter(today)) {
      setDobErrorState(true);
      setDobErrorText('Date of birth cannot be in the future');
    } else if (selected.isBefore(earliestDate)) {
      setDobErrorState(true);
      setDobErrorText('Date of birth cannot be before 1800');
    } else {
      setDobErrorState(false);
      setDobErrorText('');
    }
    setSelectedDate(date);
    nextButtonValidation();
  };

  const validatePinCode = (pincode) => {
    const pinCodeRegex = /^\d{6}$/;
    if (!pinCodeRegex.test(pincode)) {
      setPinCodeErrorState(true);
      setPinCodeErrorText('Pincode should be exactly 6 numeric characters');
    } else {
      setPinCodeErrorState(false);
      setPinCodeErrorText('');
    }
    setPinCode(pincode);
    nextButtonValidation();
  };

  return (
    <div style={styles.signupContainer}>
      <div style={styles.backgroundBlur}></div>
      {popupLoading && <div style={styles.loader}>Loading...</div>}
      <h1 style={styles.heading}>Vanakkam! Welcome to Kauvery</h1>
      <p style={styles.subheading}>
        Please provide your information so it will be easy for us to help you.
      </p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => validateName(e.target.value)}
            placeholder="Enter patient name"
            required
            style={styles.input}
          />
          {nameErrorState && <p style={styles.errorText}>{nameErrorText}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => validateDOB(e.target.value)}
            required
            style={styles.input}
          />
          {dobErrorState && <p style={styles.errorText}>{dobErrorText}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Gender</label>
          <select
            value={genderValue}
            onChange={(e) => setGenderValue(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address</label>
          <input
            type="text"
            value={address}
            onChange={handleSearchChange}
            placeholder="Enter your address"
            required
            style={styles.input}
          />
          {searchedData.length > 0 && (
            <ul style={styles.searchResults}>
              {searchedData.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleLocationSelection(item)}
                  style={styles.searchResultItem}
                >
                  {item.name}, {item.address}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Home Pincode</label>
          <input
            type="text"
            value={pinCode}
            onChange={(e) => validatePinCode(e.target.value)}
            placeholder="Enter your pincode"
            maxLength={6}
            required
            style={styles.input}
          />
          {pinCodeErrorState && <p style={styles.errorText}>{pinCodeErrorText}</p>}
        </div>
        {signUpState && (
          <button
            type="submit"
            style={styles.button(signUpState)}
          >
            Next
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
