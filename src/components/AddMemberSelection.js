import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, MenuItem, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { COLORS } from '../constants/Theme'; // Adjust the path as necessary
import Header from './HeaderNew';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { allowNumOnly, isResponseIsValid, snackBar } from '../utils/helpers';
import {
  getFamilyKhDetails,
  getKhDetails,
  getProfileApi,
  mergeKHDetails,
  verifyNumber,
} from '../utils/apiCalls';

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

const AddMemberSelection = () => {
  //   const [formData, setFormData] = useState({
  //     name: 'John Doe',
  //     dateOfBirth: new Date('2000-01-01'),
  //     gender: 'male',
  //     pincode: '123456',
  //   });
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const primary = JSON.parse(queryParams.get('primary'));
  const familyList = JSON.parse(queryParams.get('familyList'));
  const isEditable = queryParams.get('isEditable');
  const isSameUser = queryParams.get('isSameUser');
  const successStatus = queryParams.get('successStatus');
  const isSignup = queryParams.get('isSignup');
  // const primary = queryParams.get('primary');
  const [formData, setFormData] = useState(familyList);
  const [tickStatus, setTickStatus] = useState(successStatus);
  const [relationData, setRelationData] = React.useState([]);

  const [selectedDate, setSelectedDate] = useState(primary.dateOfBirth);
  const [relationValue, setRelationValue] = React.useState('');

  useEffect(() => {
    setSelectedDate(primary.dateOfBirth);
  }, [formData]);

  useEffect(() => {
    // onCallApi();
    getProfileMobileNo();
    setTimeout(() => {
      setTickStatus(false);
    }, 3000);
  }, []);

  const getProfileMobileNo = async () => {
    const response = await getProfileApi();
    console.log('response123222222222222222222222222222222',JSON.stringify(response.data))
    if (isResponseIsValid(response)) {
      const mn = response.data.mn;
      // setMobNo(mn);
      // setLoading(false);
    }
  };  

  const [mobNo, setMobNo] = useState(primary[0]?.mobile_number);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, dateOfBirth: date });
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
        {/* <FormControl variant="outlined" style={styles.formControl}>
          <StyledSelect label="How are you related?" value="">
            <MenuItem value="relationship1" color={COLORS.textColor} fontFamily='Poppins'>Relationship 1</MenuItem>
            <MenuItem value="relationship2">Relationship 2</MenuItem>
            <MenuItem value="relationship3">Relationship 3</MenuItem>
          </StyledSelect>
        </FormControl> */}
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
          variant="outlined"
          fullWidth
          margin="normal"
          value={primary.name}
          disabled
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={primary.dateOfBirth}
            onChange={handleDateChange}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                fullWidth
                margin="normal"
                disabled
              />
            )}
          />
        </LocalizationProvider>
        <FormControl component="fieldset" style={styles.formControl}>
          <StyledRadioGroup row value={primary.gender}>
            <FormControlLabel value="male" control={<StyledRadio />} label="Male" disabled />
            <FormControlLabel value="female" control={<StyledRadio />} label="Female" disabled />
            <FormControlLabel value="others" control={<StyledRadio />} label="Others" disabled />
          </StyledRadioGroup>
        </FormControl>
        <StyledTextField
          label="Home pincode"
          variant="outlined"
          fullWidth
          margin="normal"
          value={primary.pincode}
          disabled
        />
        <Typography style={styles.note}>
          <span style={styles.notes}> Note:</span> With their approval, you can view their medical records through the app.
        </Typography>
        <Button style={styles.confirmButton}>Confirm</Button>
      </Box>
    </Box>
  );
};

export default AddMemberSelection;
