import React, { useState, useReducer, useEffect } from 'react';
import { Box, TextField, Typography, Button, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { COLORS } from '../constants/Theme'; // Adjust the path as necessary
import Header from './HeaderNew';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { googlePinCode, signUp, GooglePlaceIds } from '../utils/apiCalls'; // Import your utility functions
import { getUserInformation, setUserInformation } from '../utils/LocalStorage';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { allowLetterOnly, allowNumOnly, formatString } from '../utils/helpers';
import {
  NavigationReducer,
  InitialState,
} from '../store/reducers/NavigationReducer';
import { EventEmitter } from 'events';
import {
  addFamilyMembers,
  getRelationData,
  secondarySignUp,
  signUpFamily,
} from '../utils/apiCalls';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 3px 6px #00000029',
    padding: '20px',
    maxWidth: '600px',
    margin: '20px auto',
  },
  formControl: {
    width: '100%',
    marginTop: '20px',
  },
  icon: {
    color: COLORS.primaryColor,
  },
  note: {
    fontSize: '12px',
    color: COLORS.textColor,
    marginTop: '20px',
    marginBottom: '20px',
    fontFamily: 'Poppins',
  },
  notes: {
    fontSize: '12px',
    color: COLORS.textColor,
    marginTop: '20px',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  confirmButton: {
    backgroundColor: '#972168',
    color: '#fff',
    width: '30%',
    justifyContent: 'center',
    marginLeft: '200px',
    borderRadius: '25px',
    textTransform: 'none',
    fontFamily: 'Poppins',
    '&:hover': {
      backgroundColor: '#b7528f',
      borderColor: COLORS.primaryColor
    },
  },
  errorText: {
    color: COLORS.errorColor,
    fontSize: '12px',
    marginTop: '4px',
    fontFamily: 'Poppins'
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

const StyledSelect = styled((props) => <TextField select {...props} />)({
  marginTop: '20px',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0.1, 0.1)',
  '& .MuiInputBase-root': {
    fontFamily: 'Poppins, sans-serif',
  },
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
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent', // Remove border color on hover
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
  '& .MuiSelect-icon': {
    color: COLORS.primaryColor, // Custom color for dropdown icon
  },
  '& .Mui-focused .MuiInputLabel-root': {
    color: COLORS.placeholderColor, // Black color for focused label
  },
  '& .Mui-focused .MuiInputBase-input': {
    fontFamily: 'Poppins, sans-serif',
  },
  '& .Mui-focused .MuiInputBase-root': {
    fontFamily: 'Poppins, sans-serif',
  },
  '& .MuiInputBase-input::placeholder': {
    fontFamily: 'Poppins, sans-serif',
    color: COLORS.placeholderColor, // Black color for placeholder
  },
});

const StyledRadio = styled(Radio)({
  '&.Mui-checked': {
    color: COLORS.primaryColor, // Custom color for checked radio button
  },
});

const StyledRadioGroup = styled(RadioGroup)({
  '& .MuiFormControlLabel-label': {
    fontFamily: 'Poppins, sans-serif',
  },
});

const AddMember = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const location = useLocation();

    // const queryParams = new URLSearchParams(location.search);   

  const [state, dispatch] = useReducer(NavigationReducer, InitialState);
  const [popupLoading, setPopupLoading] = useState(false);
  const [signUpState, setSignUpState] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [genderState, setGenderState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  // const [selectedDate, setSelectedDate] = useState('');
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
  const [date1, setDate1] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());
  const [relationValue, setRelationValue] = React.useState('');
  const [relationData, setRelationData] = React.useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const eventEmitter = new EventEmitter();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const respData = queryParams;

  const familyList = JSON.parse(queryParams.get('familyList'));
  const isEditable = queryParams.get('isEditable');
  const isSameUser = queryParams.get('isSameUser');
  const primary = JSON.parse(queryParams.get('primary'));
  const data = JSON.parse(queryParams.get('data'));
  const successStatus = queryParams.get('successStatus');
  const [tickStatus, setTickStatus] = useState(successStatus);
  console.log('familyyyyyy', primary);
  console.log('userrrrrrrrrrrrrr', isSameUser);

  const [genderData, setGenderData] = useState([
    { id: 1, gender: 'Male', isSelected: false },
    { id: 2, gender: 'Female', isSelected: false },
    { id: 3, gender: 'Others', isSelected: false },
  ]);

  const familyType = useSelector(
    state => state?.bookingReducer?.familyType,
  );
  console.log('tyyyy', familyType);
  const profile_information = useSelector(
    state => state?.homeReducer?.profile_info,
  );
  console.log(profile_information);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // useEffect(() => {
  //   SetNameErrorState(false);
  //   nextButtonValidation();
  // }, [patientName]);
  // useEffect(() => {
  //   setDobErrorState(false);
  //   nextButtonValidation();
  // }, [selectedDate]);
  // useEffect(() => {
  //   nextButtonValidation();
  // }, [genderValue]);
  // useEffect(() => {
  //   nextButtonValidation();
  // }, [pinCode]);
  // useEffect(() => {
  //   nextButtonValidation();
  // }, [relationValue]);
  // const nextButtonValidation = () => {
  //   if (relationValue === '') {
  //     setSignUpState(false);
  //   } else if (patientName === '') {
  //     setSignUpState(false);
  //   } else if (selectedDate === '') {
  //     setSignUpState(false);
  //   } else if (genderValue === '' || genderValue === null) {
  //     setSignUpState(false);
  //   } else if (pinCode === '' || pinCode === null) {
  //     setSignUpState(false);
  //   } else if (pinCode.length !== 6) {
  //     setSignUpState(false);
  //   } else {
  //     setSignUpState(true);
  //   }
  // };

  const validateDOB = (date) => {
    const selected = moment(date);
    const today = moment();
    const earliestDate = moment('1801-01-01');

    if (selected.isAfter(today)) {
      setDobErrorState(true);
      setDobErrorText('Date of birth cannot be in the future');
    } else if (selected.isBefore(earliestDate)) {
      setDobErrorState(true);
      setDobErrorText('Date of birth cannot be before 1801');
    } else {
      setDobErrorState(false);
      setDobErrorText('');
    }
    setSelectedDate(date);
    nextButtonValidation();
  };

  const signupApiCall = async () => {
    setLoader(true);
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
      const response = await signUpFamily(body);
      console.log(response, 'response');
      if (isResponseIsValid(response)) {
        //console.log(response?.data, 'response');
        const profile_id = response.data.profile_id;
        setPrimaryApi(profile_id);
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
            //snackBar(response?.data?.error);
          } else {
            //console.log(JSON.stringify(response),'ERROR');
            // snackBar(response?.data?.error);
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

  const handleSearchChange = async (event) => {
    setAddress(event.target.value);
    if (event.target.value === '') {
      setSearchedData([]);
    } else {
      const placeIds = await GooglePlaceIds(event.target.value);
      setSearchedData(placeIds.data.data || []); // Ensure it's an array
    }
  };

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

  const nextFunc = () => {
    // signupApiCall();
    let profile_info = profile_information;
    console.log()
    let property_input = {
      "Mobile number": profile_info.mobile_number,
      "Age": profile_info.age,
      "Gender": profile_info.gender,
      "Relationship": profile_info.relationship,
      "Is Primary User": profile_info.is_primary_user
    }
    console.log('sameeeeeeeeee', isSameUser);
    if (isSameUser) { // Add from Same Mobile No 
      console.log('insidddddddeeeeee');
      secondarySignupCall();
    } else {
      if (primary) { // 
        setPrimaryApi(primary.profile_id);
      } else {
        signupApiCall();
      }
    }
  };

  const secondarySignupCall = async () => {
    setLoader(true);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const body = {
      name: patientName,
      dob: formattedDate,
      gender: genderValue,
      address: address,
      pincode: pinCode,
    };
    try {
      const response = await secondarySignUp(body);
      console.log('USER 0 RESPONSE ----->>', response);
      if (isResponseIsValid(response)) {
        const profile_id = response.data.profile_id;
        setSamePrimaryApi(profile_id);

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
            //snackBar(response?.data?.error);
          } else {
            //console.log(JSON.stringify(response),'ERROR');
            // snackBar(response?.data?.error);
            snackBar(Headers.apiError);
          }
        }, 400);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setPrimaryApi = async (profile_id) => {
    console.log('profile_id', profile_id);
    const body = {
      profile_id: profile_id,
      relationship: relationValue,
      profile_type: 'independent',
    };
    console.log(body, 'body ---->>>>');
    const response = await addFamilyMembers(body);
    console.log('RESPONSE ADD FAMILY', response);
    console.log('RRR', response.data);
    if (isResponseIsValid(response)) {
      setLoader(false);
      // eventEmitter.emit('pusherReloadFamilyMembers');
      if (familyType === "1") {
        // history.push('/managefamily');
        const queryParams = new URLSearchParams({          
          data: JSON.stringify(data)
          // item: item,
        }).toString();    
        history.push(`/managefamily?${queryParams}`);
        // eventEmitter.emit('reloadMembersData', {
        //   isShowPopup: true,
        //   isName: patientName,
        // });
      } else if (familyType === "3") {
        history.push('/selectpatient');
      } else {
        // history.push('/managefamily');
        const queryParams = new URLSearchParams({          
          data: JSON.stringify(data)
          // item: item,
        }).toString();    
        history.push(`/managefamily?${queryParams}`);
        eventEmitter.emit('familyMembers', {
          isShowPopup: true,
          isName: patientName,
        });
      }
    }
  };

  const setSamePrimaryApi = async (profile_id) => {
    console.log('profile_id', profile_id);
    const body = {
      profile_id: profile_id,
      relationship: relationValue,
      profile_type: 'dependent',
    };
    console.log("bodybody", body);
    const response = await addFamilyMembers(body);
    console.log('RRR', response.data);
    if (isResponseIsValid(response)) {
      setLoader(false);
      // eventEmitter.emit('pusherReloadFamilyMembers');
      if (familyType === "1") {
        const queryParams = new URLSearchParams({
          data: JSON.stringify(data)
        }).toString();
  
        history.push(`/managefamily?${queryParams}`);
        // eventEmitter.emit('reloadMembersData', {
        //   isShowPopup: true,
        //   isName: patientName,
        // });
      } else if (familyType === "3") {
        history.push('/selectpatient');
        eventEmitter.emit('familyMembersSelectPatient', {
          isShowPopup: true,
          isName: patientName,
        });
      } else {
        // history.push('/managefamily');
        const queryParams = new URLSearchParams({          
          data: JSON.stringify(data)
          // item: item,
        }).toString();    
        history.push(`/managefamily?${queryParams}`);
        eventEmitter.emit('familyMembers', {
          isShowPopup: true,
          isName: patientName,
        });
      }
    }
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

  const handleGenderChange = (event) => {
    const val = event.target.value;
    setGenderValue(val);
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

  useEffect(() => {
    setTimeout(() => {
      setTickStatus(false);
    }, 3000);
    if (primary) {
      //  setTickStatus(false);
      console.log('Primary', primary);
      const myMomentObject = moment(primary.dob, 'DD-MM-YYYY');
      setDate(myMomentObject);
      setDate1(myMomentObject);
      setSelectedDate(myMomentObject);

      setPatientName(primary.name);
      // setSelectedDate(data.dob);
      const formattedGender = formatString(primary.gender);
      setGenderValue(formattedGender);
      //  setGenderValue(primary.gender);
      setPinCode(`${primary.pincode}`);
      setAddress(primary.address);
      var ar = [];
      var sd = genderData.forEach(item => {
        if (item.gender === formattedGender) {
          item.isSelected = true;
          ar.push(item);
        } else {
          ar.push(item);
        }
      });
      setGenderData(ar);
      nextButtonValidation();
    }
    onGetRelationList();
    // setTimeout(() => {
    //   if (successStatus == true) {
    //     setTickState(false);
    //   }
    // }, 5000);
  }, []);

  const onGetRelationList = async () => {
    const response = await getRelationData();
    if (isResponseIsValid(response)) {
      const relations = response.data.data.add_family_member.relationship.op1;
      console.log('Relation', relations);
      setRelationData(relations);
      setLoadingData(false);
    }
  };

  const handleRelationChange = (event) => {
    setRelationValue(event.target.value);
  };

  return (
    <Box sx={{ padding: 0 }}>
      <Header />
      <Box style={styles.container}>
        <Typography variant="h6" gutterBottom fontFamily='Poppins' color={COLORS.textColor}>
          OTP verification
        </Typography>
        <Typography variant="body1" gutterBottom fontSize='14px' fontFamily='Poppins' color={COLORS.textColor}>
          Please provide your information so it will be easy for us to help you.
        </Typography>
        <FormControl variant="outlined" style={styles.formControl}>
          {/* <InputLabel>How are you related?</InputLabel> */}
          <StyledSelect
            value={relationValue}
            onChange={handleRelationChange}
            label="How are you related?"
          >
            {relationData.map((relation, index) => (
              <MenuItem
                key={index}
                value={relation.name}
                style={{ color: COLORS.textColor, fontFamily: 'Poppins' }}
              >
                {relation.name}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledTextField
          label="Name"
          value={patientName}
          onChange={(e) => validateName(e.target.value)}
          variant="outlined"
          fullWidth margin="normal"
          required
          disabled={!!patientName}
        />
        {nameErrorState && <p style={styles.errorText}>{nameErrorText}</p>}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={selectedDate}
            onChange={(date) => validateDOB(date)}
            required
            // onChange={handleDateChange}
            renderInput={(params) => <StyledTextField {...params} fullWidth margin="normal" disabled={!!selectedDate} />}
          />
          {dobErrorState && <p style={styles.errorText}>{dobErrorText}</p>}
        </LocalizationProvider>
        <FormControl component="fieldset" style={styles.formControl}>
          <StyledRadioGroup row
            value={genderValue}
            onChange={handleGenderChange}
            
          >
            {genderData.map((gender, index) => (
              <FormControlLabel
                key={index}
                value={gender.gender}
                control={<StyledRadio />}
                label={gender.gender}
                disabled={ !!genderValue}
              />
            ))}
          </StyledRadioGroup>
        </FormControl>
        <StyledTextField
          label="Address"
          value={address}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth margin="normal"
          required
          disabled={!!address}
        />{searchedData.length > 0 && (
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
        <StyledTextField
          label="Home pincode"
          ariant="outlined"
          value={pinCode}
          fullWidth
          margin="normal"
          onChange={(e) => validatePinCode(e.target.value)}
          maxLength={6}
          required
          disabled={!!pinCode}
        />
        {pinCodeErrorState && <p style={styles.errorText}>{pinCodeErrorText}</p>}
        <Typography style={styles.note}>
          <span style={styles.notes}> Note:</span> With their approval, you can view their medical records through the app.
        </Typography>
        <Button
          style={styles.confirmButton}
          onClick={nextFunc}
        >
          Confirm</Button>
      </Box>
    </Box>
  );
};

export default AddMember;
