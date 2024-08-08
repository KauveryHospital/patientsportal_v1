import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Button,
  Avatar,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem, 
  FormControl
} from '@mui/material';
import {
  bookingInitialize,
  createBooking,
  createBookingPayAtHospital,
  createWebHooks,
} from '../utils/apiCalls';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';
import { useHistory, useLocation } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { familyMembersList, requestNow } from '../utils/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { patientDetails, patient_Id, patient_Name, patient_Notes } from '../store/actions/bookingActions';
import { UploadDuplicateBookingList, UploadFileBookingList, emptyBookingFileUploadedFile, removeBookingFileUploadedFile } from '../store/actions/uploadBookingActions';
import { KauvaryFileUpload } from '../utils/KauveryFileUpload';
import { EventEmitter } from 'events';
import { getSecondaryProfileID, getUserInformation } from '../utils/LocalStorage';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { Base64 } from 'js-base64';
import { currentProfileRawData, familyReloadData } from '../store/actions/homeActions';
import { emptyBookingUploadRecord, emptyUploadRecord, myUploadSelectedClear, myUploadBookingSelectedList, onMyUploadBookingSelection } from '../store/actions/recordActions';

const useStyles = {
  root: {
    padding: 0,
    margin: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '20px',
    padding: '10px',
    flexDirection: 'row',
    '@media (max-width:600px)': {
      flexDirection: 'column',
    }
  },
  avatar: {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
    padding: '20px',
    '@media (max-width:600px)': {
      marginBottom: '0',
      marginRight: '20px',
    }
  },
  selectPatient: {
    fontFamily: 'Poppins',
    height: '60px'
  },
  doctorInfo: {
    textAlign: 'left',
    justifyContent: 'space-between',
    padding: '10px',
    marginLeft: '20px',
    '@media (max-width:600px)': {
      textAlign: 'left',
    }
  },
  timeInfo: {
    textAlign: 'left',
    justifyContent: 'space-between',
    padding: '10px',
    marginLeft: '20px',
    '@media (max-width:600px)': {
      textAlign: 'left',
    }
  },
  appointmentInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    width: '50%',
    marginLeft: '25%',
    marginBottom: '20px',
    '@media (max-width:600px)': {
      flexDirection: 'column',
      width: '100%',
      marginLeft: '0',
    }
  },
  calendarIcon: {
    marginLeft: '10px',
    color: '#962067',
    cursor: 'pointer',
  },
  timeSlot: {
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  continueButton: {
    backgroundColor: '#962067',
    color: '#fff',
    padding: '10px 10px',
    borderRadius: '20px',
    marginTop: '20px',
    width: '100%',
    fontFamily: 'Poppins',
    fontSize: '12px',
    marginBottom: '10px'
  },
  checkoutButton: {
    backgroundColor: '#962067',
    color: '#fff',
    padding: '10px 10px',
    borderRadius: '20px',
    marginTop: '20px',
    width: '50%',
    marginLeft: '25%',
  },
  footer: {
    display: 'flex',
    width: '100%',
    height: '80px',
    backgroundColor: '#962067',
    borderRadius: '10px 10px 0px 0px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8px',
  },
  dateGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButton: {
    borderColor: '#ccc',
    color: '#000',
    width: '80px',
    height: '40px',
    margin: '0 5px',
  },
  dateButtonSelected: {
    borderColor: '#962067',
    color: '#962067',
  },
  arrowButton: {
    color: COLORS.primaryColor,
  },
  uploadBox: {
    border: '1px dashed #962067',
    padding: '16px',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  uploadIcon: {
    color: '#962067',
    marginBottom: '8px',
  },
  field: {
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
    alignItems: 'center',
    marginTop: '0px',
  },
  payButton: {
    marginLeft: '10px',
    borderColor: COLORS.primaryColor,
    color: COLORS.primaryColor
  },
  addPatientLink: {
    color: COLORS.primaryColor
  },
  uploadte: {
    color: COLORS.primaryColor
  }
};

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

const eventEmitter = new EventEmitter();

const SelectPatient = () => {
  const classes = useStyles;
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedSlot, setSelectedSlot] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isCheckoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState(generateDateRange(new Date()));
  // const [dropdownOptions, setDropdownOptions] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [relationData, setRelationData] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [userToken, setUserToken] = useState('');
  const [nameErrorState, SetNameErrorState] = useState(false);
  const [notesErrorState, SetNotesErrorState] = useState(false);
  const [name, setName] = useState('');
  const [nameErrorText, SetNameErrorText] = useState('');
  const [signUpState, setSignUpState] = useState(false);
  const [relationValue, setRelationValue] = useState('');
  const [notes, setNotes] = useState('');
  const [slotid, setSlotid] = useState(1687304);
  const [bookingErrorContent, setBookingErrorContent] = useState('');
  const [uhidList, setUhidList] = useState([]);
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [patientid, setPatientid] = useState('ef19c9b9-273a-4138-bc5f-14c8fe9fec99');
  const patientDetails = useSelector(
    // Patient details
    state => state?.bookingReducer?.patientDetails,
  );

  const profile_information = useSelector(
    state => state?.homeReducer?.profile_info,
  );

  const currentUser = useSelector(
    state => state?.homeReducer?.currentProfileName,
  );

  const uploadedFileList = useSelector(
    state => state?.uploadBookingReducer?.file_uploaded_list,
  );

  const currentProfileData = useSelector(
    state => state?.homeReducer?.currentProfileRawData,
  );

  const queryParams = new URLSearchParams(location.search);
    const selectedUnit = queryParams.get('selectedUnit');
    const fees = queryParams.get('fees');
    const unitid = queryParams.get('unitid');
    const time = queryParams.get('time');
    const item = JSON.parse(queryParams.get('item'));
    const data = JSON.parse(queryParams.get('data'));
    const doctorSlot = JSON.parse(queryParams.get('doctorSlot'));
    const dropdownOptions = JSON.parse(queryParams.get('dropdownOptions'));
    const unitAddress = queryParams.get('unitAddress');
    const date = queryParams.get('date');
    // const item = queryParams.get('item');

    console.log('dataaa', data);
    console.log('itemmmm', item);
    console.log('slotsssss', doctorSlot);

    useEffect(() => {
      const familyMembersSelectPatientListener = eventEmitter.addListener('familyMembersSelectPatient', (event) => {
        familyMembersApiCall();
        console.log(event, "Event");
        // if (event.isShowPopup) {
        //   setProfileCreatedPopup(event.isShowPopup);
        // }
        if (event.isName) {
          setName(event.isName);
        }
      });
  
      const sectionListReloadListener = eventEmitter.addListener('SectionListReload', (event) => {
        setTimeout(() => {
          setReloadKey(reloadKey + 1);
        }, 1000);
      });
  
      getUserInformation('User_Data').then(res => {
        let response = JSON.parse(res);
        setUserToken(response.token);
      });
  
      familyMembersApiCall();
  
      return () => {
        // familyMembersSelectPatientListener.remove();
        // sectionListReloadListener.remove();
      };
    }, [reloadKey]);

    const handleRelationChange = (event) => {
      setRelationValue(event.target.value);
    };
  
    const familyMembersApiCall = async () => {
      
      try {
        const response = await familyMembersList();
        if (isResponseIsValid(response)) {
          console.log(JSON.stringify(response.data.data));
          setRelationData(response.data.data);
          dispatch(currentProfileRawData(response.data.data));
          setTimeout(() => {
            
          }, 400);
        } else {
          setTimeout(() => {
            snackBar(JSON.stringify(response.data));
            
          }, 400);
        }
      } catch (err) {
        setTimeout(() => {
          snackBar(JSON.stringify(err));
          
        }, 400);
      }
    };
  
    useEffect(() => {
      // setNameErrorState(false);
      dispatch(myUploadBookingSelectedList([]));
      dispatch(emptyBookingFileUploadedFile(''));
    }, [patientName]);
  
    useEffect(() => {
      // mhcFileUploadValidation();
      nextButtonValidation();
    }, [uploadedFileList, patientName]);
  
    const nextButtonValidation = () => {
      // const errorItems = uploadedFileList.filter(item => item.size_error === true);
      // const isButtonEnabled = errorItems.length > 0;
      // if (patientName !== '' && !isButtonEnabled) {
      //   setSignUpState(true);
      // } else {
      //   setSignUpState(false);
      // }
    };

  function generateDateRange(startDate) {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  const handleDateChange = (direction) => {
    const newStartDate = new Date(dateRange[0]);
    newStartDate.setDate(newStartDate.getDate() + (direction === 'next' ? 1 : -1));
    setDateRange(generateDateRange(newStartDate));
  };

  const handleCalendarOpen = () => {
    setOpen(true);
  };

  const handleCalendarClose = () => {
    setOpen(false);
  };

  const handleCalendarDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setDateRange(generateDateRange(newDate));
    setOpen(false);
  };

  const handleNext = () => {
    setIsCheckout(true);
    setDialogOpen(true);
  };

  const handleCheckout = () => {
    // setCheckoutDialogOpen(true);
    // const queryParams = new URLSearchParams({
    //   selectedUnit: selectedUnit,
    //   dropdownOptions: dropdownOptions,
    //   item: JSON.stringify(item),
    //   data: JSON.stringify(data),
    //   doctorSlot: JSON.stringify(doctorSlot),
    //   time: time,
    //   fees: fees,
    //   pname: name,
    //   notes: notes,
    //   unitAddress: unitAddress
    // }).toString();

    // history.push(`/checkout?${queryParams}`);
    
      onBookingCheckoutEvent()
      // radioButtonRef.current.open();
      onCheckoutApiCall('', false);      
  };

  const onCheckoutApiCall = async (hms_id, is_new_user) => {
    const body = {
      // unit_id: unitid,
      // slot_id: slotid,
      // doctor_id: item?.doctorId,
      // patient_id: patientid,
      // notes: notes,
      // booking_type: doctorSlot[0].SlotType,
      // consult_date: `${date}T10:00`,
      // consult_time: `${date}T10:00`,
      // amount: `${fees}`,
      // patient_name: name,
      // ref_time: 10,
      // hms_id: hms_id,
      // is_new_user: is_new_user,
      // files: uploadedFileList
      amount: "800",
    booking_type: "Offline",
    consult_date: "2024-08-08T10:00:00",
    consult_time: "2024-08-08T18:15:00",
    doctor_id: "6523d949ef63b24abdf53b79",
    hms_id: "",
    is_new_user: false,
    notes: "",
    patient_id: "ef19c9b9-273a-4138-bc5f-14c8fe9fec99",
    patient_name: "Anand",
    ref_time: "10:00",
    slot_id: "1687304",
    unit_id: "13097000000024",
    files: ''
    // [
        // {
        //     file_id: "96750e7e-4428-4b69-b0aa-3dcaffc08061",
        //     file_name: "BIO-DATA",
        //     file_url: "https://kauverykaredev.s3.amazonaws.com/user_files/user_files/2023-11-03T095535_BIO-DATA.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA46KNISGSXYVR7MU7%2F20231103%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T095536Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=1578f27531744046d6d6ea1c963805cf26167feae07b54a8d5939cb7ec3208e3"
        // },
        // {
        //     file_id: "96750e7e-4428-4b69-b0aa-3dcaffc08061",
        //   file_name: "BIO-DATA",
        //     file_url: "https://kauverykaredev.s3.amazonaws.com/user_files/user_files/2023-11-03T095535_BIO-DATA.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA46KNISGSXYVR7MU7%2F20231103%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20231103T095536Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=1578f27531744046d6d6ea1c963805cf26167feae07b54a8d5939cb7ec3208e3"
        // }
    // ]
    };
    // console.log('bodyyyyyy', body);
    try {
      console.log(body, 'CHECKOUT BODY');
      const response = await createBooking(body);
      console.log(response, 'CHECKOUT response');
      if (isResponseIsValid(response)) {
        console.log(response, 'response');
        if (response?.data?.kh_user_data) {
          console.log('kh_user_data response', response.data.kh_user_data);
          setUhidList(response.data.kh_user_data);
          setTimeout(() => {}, 500);
        } else {
          setTimeout(() => {
            onCallInitialize(response?.data?._id, hms_id);
          }, 500);
        }
      } else {
        console.log(response?.data?.message, 'BOOKING ERROR');
        if (response?.data?.message) {
          setBookingErrorContent(response?.data?.message);
          setTimeout(() => {
            console.log('errorr');
          }, 400);
        } else {
          setTimeout(() => {
            snackBar('An error occurred while processing your booking.');
          }, 500);
        }
      }
    } catch (err) {
      setTimeout(() => {
        snackBar(JSON.stringify(err));
      }, 400);
    }
  };

  const onCallInitialize = async (id, hms_id) => {
    try {
      const response = await bookingInitialize(id);
      if (isResponseIsValid(response)) {
        console.log('RESP', response.data);
        const mid = Base64.decode(response.data.emid);
        console.log('MID ----->>>>', mid);
        const call_back_url = response.data.call_back_url;
        const order_id = response.data.order_id;
        const tranxToken = response.data.token;
        const am = `${fees}`;
        setTimeout(() => {}, 500);
      } else {
        console.log(response?.data?.message, 'BOOKING INITIALIZE ERROR');
        if (response?.data?.message) {
          setTimeout(() => {
            snackBar(response?.data?.message);
          }, 200);
        } else {
          setTimeout(() => {
            snackBar('An error occurred while initializing the booking.');
          }, 500);
        }
      }
    } catch (err) {
      setTimeout(() => {
        snackBar(JSON.stringify(err));
      }, 400);
    }
  };

  const onPayTmCall = (orderId, mid, tranxToken, amount, callbackUrl, hms_id) => {
    // Placeholder for payment gateway logic
    console.log('Payment initiated');
    const payload = {
      paytm_response: 'Payment response', // Replace with actual response
      hms_id: hms_id,
    };
    webHooksCall(payload);
    console.log(payload, 'WEBHOOK PAYLOAD');
  };

  const webHooksCall = async (body) => {
    setCheckoutLoader(true);
    try {
      const response = await createWebHooks(body);
      if (isResponseIsValid(response)) {
        console.log('Reep', response.data);
        setCheckoutLoader(false);
        setTimeout(() => {
          const success_payload = {
            isShowPopup: true,
            item: response.data,
            doctor_id: item?._id.$oid,
            type: 'booking',
          };
          if (response.data.status === 'approved') {
            console.log('Payment done');
          }
          console.log('success_payload', success_payload);
          history.push('/home');
        }, 200);
      } else {
        setCheckoutLoader(false);
        const pay_load = {
          isShowPopup: true,
          item: 'pending',
          type: 'booking',
        };
        setTimeout(() => {
          history.push('/home');
        }, 200);
      }
    } catch (err) {
      setTimeout(() => {
        setCheckoutLoader(false);
        snackBar(JSON.stringify(err));
      }, 400);
    }
  };

  const onBookingCheckoutEvent = () => {
    let profile_info = profile_information;
    let property_input = {
      "Mobile number": profile_info.mobile_number,
      "Age": profile_info.age,
      "Gender": profile_info.gender,
      "Relationship": profile_info.relationship,
      "Is Primary User": profile_info.is_primary_user
    }
    // mixpanel.track(mixpanel_event.CHECKOUT, property_input)
  }

  const handlePayatHospital = () => {
    setCheckoutDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseCheckoutDialog = () => {
    setCheckoutDialogOpen(false);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };  

  const handleMenuItemClick = (event) => {
    setName(event.target.value);
  };  

  return (
    <Container style={classes.root}>
      <Header 
      dropdownOptions={dropdownOptions}
      selectedUnit={selectedUnit}
      />
      <Box style={classes.header}>
        <Avatar
          src="/path/to/doctor-image.jpg"
          alt="Doctor Image"
          style={classes.avatar}
        />
        <Box style={classes.doctorInfo}>
          <Typography variant="h6" style={{ fontFamily: 'Poppins' }}>{item.doctorName}</Typography>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}>{item.designation}</Typography>
        </Box>
        <Box style={classes.timeInfo}>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}>{item.specialtyName}</Typography>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}><AccessTimeIcon /> {doctorSlot && doctorSlot.length > 0 ? doctorSlot[0].SlotTiming : ''}</Typography>
        </Box>
      </Box>

      <Paper style={classes.appointmentInfo}>
        <Box display="flex" alignItems="center" marginBottom="10px">
          <ArrowBackIosIcon className={classes.calendarIcon} onClick={() => handleDateChange('prev')} />
          <Typography style={{ fontFamily: 'Poppins' }}>Select patient</Typography>
          <ArrowForwardIosIcon className={classes.calendarIcon} onClick={() => handleDateChange('next')} />
        </Box>
        {/* <TextField
          fullWidth
          select
          label="Select patient"
          variant="outlined"
          style={classes.selectPatient}
        >
          <MenuItem value="Patient 1" fontFamily='Poppins'>Patient 1</MenuItem>
          <MenuItem value="Patient 2" fontFamily='Poppins'>Patient 2</MenuItem>
        </TextField> */}
        <FormControl variant="outlined" >
                                <StyledSelect
                                    value={relationValue}
                                    onChange={handleRelationChange}
                                    label="Select Patient"
                                >
                                    {relationData.map((relation, index) => (
                                        <MenuItem
                                            key={index}
                                            value={name}
                                            onClick={handleMenuItemClick}
                                            style={{ color: COLORS.textColor, fontFamily: 'Poppins' }}
                                        >
                                            {relation.name}
                                        </MenuItem>
                                    ))}
                                </StyledSelect>
                            </FormControl>

        <Typography variant="body2" fontFamily='Poppins'>
          Note: Prescription will be provided in the name of the patient selected. If you don’t find the patient in the list,
          <a href="/add-patient" color='#962067' style={classes.addPatientLink}> Add patient</a>
        </Typography>

        <TextField
        fullWidth
        label="Notes to doctor"
        multiline
        rows={4}
        variant="outlined"
        className={classes.notesField}
        value={notes}
        onChange={handleNotesChange}
      />

        <Typography variant="body2" align="left" fontFamily='Poppins' gutterBottom>
          Maximum 500 characters.
        </Typography>

        <Paper style={classes.uploadBox} elevation={0}>
          <Typography variant="body2" gutterBottom >
            Upload files
          </Typography>
          <Button component="label" fontSize='18px' fontFamily='Poppins' style={classes.uploadtext}>
            Choose your file to upload here
            <input type="file" hidden />
          </Button>
          <Typography variant="body2" color="textSecondary" fontSize='10px' fontFamily='Poppins'>
            Support format (Max 1 MB): PNG, JPG, JPEG, HEIC, PDF
          </Typography>
        </Paper>

        {!isCheckout ? (
          <Button
            fullWidth
            variant="contained"
            style={classes.continueButton}
            onClick={handleNext}
          >
            {item.rbooking =='true' ? 'Request' : 'Continue'}
          </Button>
        ) : (
          <Box style={classes.buttonContainer}>
            <Typography variant="body2" fontFamily='Poppins'>To pay</Typography>
            <Typography variant="h6" fontFamily='Poppins'>Rs. 1000</Typography>          
            <Button variant="contained" style={classes.continueButton} onClick={handleCheckout}>Check out</Button>
            <Button variant="outlined" style={classes.payButton} onClick={handlePayatHospital}>Pay at hospital</Button>
          </Box>
        )}
      </Paper>
      <Box style={classes.footer}>
        <Typography variant="body2" fontFamily='Poppins'>
          © 2024 Patient Appointment Booking. All rights reserved.
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleCalendarClose}>
        <DialogTitle>Select Date</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            fullWidth
            onChange={handleCalendarDateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCalendarClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Continue</DialogTitle>
        <DialogContent>
          <Typography variant="body2" fontFamily='Poppins'>
            Please review the patient details before proceeding.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleCloseDialog();
              // Perform any necessary actions on continue
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isCheckoutDialogOpen} onClose={handleCloseCheckoutDialog}>
        <DialogTitle>
          <IconButton>
            <CheckCircleIcon color="success" />
          </IconButton>
          Booked!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" fontFamily='Poppins'>
            Your in-person consultation with {item.doctorName} on 08th Jul 2024, 10:54 AM is confirmed!
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: 16 }} fontFamily='Poppins'>
            Note: The appointment time is subject to last-minute change due to any unavoidable emergencies to be attended by the doctors.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckoutDialog} color="primary" fontFamily='Poppins' variant="contained">Okay</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SelectPatient;
