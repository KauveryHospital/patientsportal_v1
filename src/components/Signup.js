import React, { useState, useEffect, useReducer } from 'react';
import moment from 'moment';
import {
  googlePinCode,
  signUp,
  GooglePlaceIds,
} from '../utils/apiCalls'; // Import your utility functions
import { AppContext } from '../navigation/AppContext'; // Your App context
import { styles } from './signup.styles';
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
      patientName === '' ||
      selectedDate === '' ||
      genderValue === '' ||
      pinCode.length !== 6 ||
      address === ''
    ) {
      setSignUpState(false);
    } else {
      setSignUpState(true);
    }
  };

  const handleSubmit = async event => {
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
      console.log(body, 'body');
      const response = await signUp(body);
      console.log(response, 'response');
      if (isResponseIsValid(response)) {
        getUserInformation('User_Data').then(res => {
          if (res === null) {
          } else {
            var js = JSON.parse(res);
            js.is_registered = 1;
            setUserInformation('User_Data', JSON.stringify(js));
          }
        });
        setLoader(false);
        setTimeout(() => {
          dispatch({ type: 'SetProfileStatus', payload: '4' });
        }, 200);
      } else {
        setLoader(false);
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
            snackBar(Headers.apiError);
          }
        }, 400);
      }
    } catch (err) {
      console.log(err, 'ERROR');
      setLoader(false);
      setTimeout(() => {
        snackBar(Headers.apiError);
      }, 400);
    }
  };

  const handleSearchChange = async event => {
    setAddress(event.target.value);
    if (event.target.value === '') {
      setSearchedData([]);
    } else {
      const placeIds = await GooglePlaceIds(event.target.value);
      setSearchedData(placeIds.data.data || []); // Ensure it's an array
    }
  };

  const handleLocationSelection = async placeItem => {
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

  return (
    <div style={styles.signupContainer}>
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
            onChange={e => setPatientName(e.target.value)}
            placeholder="Enter patient name"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Gender</label>
          <select
            value={genderValue}
            onChange={e => setGenderValue(e.target.value)}
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
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={address}
              onChange={handleSearchChange}
              placeholder="Enter your address"
              required
              style={styles.input}
            />
          </div>
          <ul style={styles.searchResults}>
            {searchedData.length > 0 &&
              searchedData.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleLocationSelection(item)}
                  style={styles.searchResultItem}
                >
                  {item.name}, {item.address}
                </li>
              ))}
          </ul>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Home Pincode</label>
          <input
            type="text"
            value={pinCode}
            onChange={e => setPinCode(e.target.value)}
            placeholder="Enter your pincode"
            maxLength={6}
            required
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          disabled={!signUpState}
          style={styles.button(signUpState)}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Signup;
