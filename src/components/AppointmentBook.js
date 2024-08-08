import React, { useState, useEffect } from 'react';
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
  TextField
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { allowNumOnly, isResponseIsValid, snackBar } from '../utils/helpers';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getProfileApi } from '../utils/apiCalls';

// Define styles using makeStyles
import { makeStyles } from '@mui/styles';
import { amount } from '../store/actions/types';

const useStyles = makeStyles((theme) => ({
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
      flexDirection: 'row',
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
  doctorInfo: {
    textAlign: 'left',
    justifyContent: 'space-between',
    padding: '5px',
    marginLeft: '10px',
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
    padding: '10px 10px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    width: '60%',
    marginLeft: '25%',
    marginTop: '20px',
    marginBottom: '20px',
    '@media (max-width:600px)': {
      flexDirection: 'column',
      width: '100%',
      marginLeft: '0',
    }
  },
  calendarIcon: {
    marginLeft: '20px',
    color: '#962067',
    cursor: 'pointer',
  },
  timeSlot: {
    padding: '20px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '3px',
    marginBottom: '0px',
    marginTop: '20px'
  },
  continueButton: {
    backgroundColor: '#962067',
    color: '#fff',
    padding: '10px 10px',
    borderRadius: '20px',
    marginTop: '20px',
    width: '30%',
    '&:hover': {
      backgroundColor: '#962067',
      // color: '#939598',
      borderColor: '#ffe6f2'
    },
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
    borderColor: '#939598',
    color: '#939598',
    width: '10px',
    height: '50px',
    margin: '0 5px',
    fontFamily: 'Poppins',
    '&:hover': {
      backgroundColor: '#ffe6f2',
      color: '#939598',
      borderColor: '#ffe6f2'
    },
  },
  dateButtonSelected: {
    borderColor: '#939598',
    backgroundColor: '#ffe6f2',
    color: '#939598',
    width: '20px',
    height: '50px',
    margin: '0 5px',
    fontFamily: 'Poppins',
    '&:hover': {
      backgroundColor: '#ffe6f2',
      color: '#939598',
      borderColor: '#ffe6f2'
    },
  },
  timeSlotContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '10px',
    maxWidth: '100%', // Adjust as needed
    height: 'auto',
    overflow: 'auto', // Add this line
  },
  timeSlotButton: {
    borderColor: '#939598',
    color: '#939598',
    margin: '5px',
    '&:hover': {
      backgroundColor: '#ffe6f2',
      color: '#939598',
      borderColor: '#ffe6f2',
    },
  },
  timeSlotButtonSelected: {
    borderColor: '#939598',
    backgroundColor: '#ffe6f2',
    color: '#939598',
    margin: '5px',
    '&:hover': {
      backgroundColor: '#ffe6f2',
      color: '#939598',
      borderColor: '#ffe6f2',
    },
  },
  arrowButton: {
    color: COLORS.primaryColor,
  },
}));

const AppointmentBook = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState(generateDateRange(new Date()));
  const history = useHistory();
  const location = useLocation();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedDate1, setFormattedDate1] = useState('');
  const [doctorSlot, setDoctorSlot] = useState([]);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const queryParams = new URLSearchParams(location.search);
    const selectedUnit = queryParams.get('selectedUnit');
    const unitAddress = queryParams.get('unitAddress');
    // const item = queryParams.get('item');
    const item = JSON.parse(queryParams.get('item'));
    console.log(item);
    
  const doctorId = item ? item.doctorId : '';
  const [slotTime, setSlotTime] = useState('');
  const [timeSlot, setTimeSlot] = useState([]);
  const [doctorFee, setDoctorFee] = useState([]);
  const [fees, setFees] = useState('');
  const [slotType, setSlotType] = useState('Walk In');

  useEffect(() => {
    const formatted = formatDate(selectedDate);
    const formatted1 = formatDate1(selectedDate);
    setFormattedDate(formatted);
    setFormattedDate1(formatted1);
  }, [selectedDate]);

  useEffect(() => {
    onCallProfileApi();
    // upcomingEventsApiCall();
}, []);

const onCallProfileApi = async () => {
    const response = await getProfileApi();
    console.log(response);
    if (isResponseIsValid(response)) {
        // dispatch(profileImageSaved(response.data.photo));
        setData(response.data);
        setName(response.data.name);
    }
};

  useEffect(() => {
    const initializeData = async () => {
      await fetchLocations();
      await fetchSlots(selectedUnit, formattedDate1, doctorId, slotType);
      // if (slotTime) {
        await fetchDoctorFee(selectedUnit, doctorId);
      // }
    };

    if (formattedDate && formattedDate1) {
      initializeData();
    }
  }, [selectedUnit, formattedDate, doctorId, formattedDate1, slotTime, slotType]);


  // useEffect(() => {
  //   const formatted = formatDate(selectedDate);
  //   const formatted1 = formatDate1(selectedDate);
  //   setFormattedDate(formatted);
  //   setFormattedDate1(formatted1);    
  //   console.log(formattedDate1);
  // }, [selectedDate]);

  const fetchSlots = async (selectedUnit, formattedDate1, doctorId, slotType) => {
    if (!formattedDate1) {
      console.error('Formatted date is empty.');
      return;
    }

    const city = selectedUnit;
    const did = doctorId;
    const date = formattedDate1;
    const stype = slotType;

    console.log('Making API call with parameters:', { city, did, date, stype });

    try {
      const response = await axios.get('http://localhost:1801/api/doctorSlot/', { params: { city, did, date, stype } });
      console.log('Responseeeeeeee:', response.data);
      if (response.data.Message) {
        setMessage(`The doctor is not available for visit on ${formattedDate}. Please select another date.`);
        setDoctorSlot([]);
      } else {
        setMessage('');
        setDoctorSlot(response.data.Result);
        const combined = response.data.Result.flatMap(slot => slot.AvailableTimeSlot);        
        setTimeSlot(combined);
        console.log('aaaaaaaaaaaaaaaaaa', timeSlot);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  const fetchDoctorFee = async (selectedUnit, doctorId) => {
    if (!formattedDate) {
      console.error('Formatted date is empty.');
      return;
    }

    const city = selectedUnit;
    const did = doctorId;
    // const date = formattedDate1;
    // const stime = slotTime;

    console.log('Making API call with parameters:', { city, did });

    try {
      const response = await axios.get('http://localhost:1801/api/doctorFee/', { params: { city, did } });
      console.log('Response from API:', response.data);
      if (!response.data) {
        // setMessage(`We don't have the information you requested.`);
        setDoctorFee([]);
      } else {
        // setMessage('');
        setDoctorFee(response.data.Result);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
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
    // if(!name)
    if(!name){
    history.push('/signup');
    }
    else {
    const queryParams = new URLSearchParams({
      selectedUnit: selectedUnit,
      dropdownOptions: JSON.stringify(dropdownOptions),
      item: JSON.stringify(item),
      data: JSON.stringify(data),
      doctorSlot: JSON.stringify(doctorSlot),
      time: selectedSlot,
      fees: amount,
      unitAddress: unitAddress,
      date: formattedDate1
    }).toString();

    history.push(`/selectpatient?${queryParams}`);
  }
  };

  const handletimeSlot = (slot) => {
    setSelectedSlot(slot);
    const slotType = doctorSlot.length > 0 ? doctorSlot[0].SlotType : null;
    console.log('typeeee', slotType)
    const fee = doctorFee.find(f => f.ConsultType === slotType);
    setFees(fee ? fee.ConsultPrice : 'N/A');
  };

  console.log('fessssss', fees);

  const fetchLocations = async (token) => {
    try {
      const tokenUrl = 'http://localhost:1801/api/unit';
      const locationResponse = await axios.get(tokenUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDropdownOptions(locationResponse.data.Result);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };

  const formatDate1 = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  const handleUnitChange = (unit) => {
    // Handle unit change
  };

  const handleDate = async (date) => {
    setSelectedDate(date);

    // Clear the timeslots
    setTimeSlot([]);

    // Update formattedDate1 based on the new date
    const newFormattedDate1 = formatDate1(date);
    setFormattedDate1(newFormattedDate1);

    // Fetch the new slots
    await fetchSlots(selectedUnit, newFormattedDate1, doctorId, slotType);
};

  return (
    <Container className={classes.root}>
      <Header
        dropdownOptions={dropdownOptions}
        selectedUnit={selectedUnit}
        onUnitChange={handleUnitChange}
        slotType={slotType}
      />
      <Box className={classes.header}>
        <Avatar
          src="/path/to/doctor-image.jpg"
          alt="Doctor Image"
          className={classes.avatar}
        />
        <Box className={classes.doctorInfo}>
          <Typography variant="h6" style={{ fontFamily: 'Poppins' }}>{item.doctorName}</Typography>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}>{Array.isArray(item.designation) ? item.designation.join(', ') : item.designation}</Typography>
        </Box>
        <Box className={classes.timeInfo}>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}>{item.specialtyName}</Typography>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}><AccessTimeIcon /> {doctorSlot && doctorSlot.length > 0 ? doctorSlot[0].SlotTiming : ''}
          </Typography>
        </Box>
      </Box>

      <Paper className={classes.appointmentInfo}>
        <Box display="flex" alignItems="center" marginBottom="10px">
          <ArrowBackIosIcon className={classes.calendarIcon} />
          <Typography style={{ fontFamily: 'Poppins' }}>Select date & time</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" padding="15px">
          <Typography style={{ fontFamily: 'Poppins', color: '#962067' }}>{formattedDate}</Typography>
          <CalendarTodayIcon className={classes.calendarIcon} onClick={handleCalendarOpen} />
        </Box>

        <Box className={classes.dateGrid}>
          <IconButton className={classes.arrowButton} onClick={() => handleDateChange('prev')}>
            <ArrowBackIosIcon />
          </IconButton>
          <Grid container justifyContent="center" alignItems="center" spacing={1} style={{ marginBottom: '0px', marginTop: '10px' }}>
            {dateRange.map(date => (
              <Grid item key={date.toDateString()}>
                <Button
                  variant="outlined"
                  className={`${classes.dateButton} ${selectedDate.toDateString() === date.toDateString() && classes.dateButtonSelected}`}
                  // onClick={() => setSelectedDate(date)}
                  onClick={() => handleDate(date)}
                >
                  {date.toDateString().slice(0, 3)} {date.getDate()}
                </Button>
              </Grid>
            ))}
          </Grid>
          <IconButton className={classes.arrowButton} onClick={() => handleDateChange('next')}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {message ? (
          <Typography style={{ fontFamily: 'Poppins', color: '#939598', textAlign: 'center', fontSize: '14px', marginTop: '20px', marginBottom: '20px'}}>{message}</Typography>
        ) : (
          <>
            <Paper className={classes.timeSlot}>
              <Typography style={{ fontFamily: 'Poppins', color: COLORS.textColor, marginBottom: '5px' }}>{selectedUnit}</Typography>
              <Typography style={{ fontFamily: 'Poppins', color: COLORS.textColor, fontSize: '12px', marginBottom: '5px' }}>{unitAddress}</Typography>
              <Typography style={{ fontFamily: 'Poppins', color: COLORS.textColor, fontSize: '12px', marginBottom: '5px' }}>Available slots</Typography>
              <Box className={classes.timeSlotContainer}>
                {timeSlot.map(slot => (
                  <Button
                    key={slot}
                    variant="outlined"
                    className={`${classes.timeSlotButton} ${selectedSlot === slot ? classes.timeSlotButtonSelected : ''}`}
                    onClick={() => handletimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </Box>
            </Paper>

            <Box display="flex" justifyContent="space-between" alignItems="center" backgroundColor='#DCDCDC33' marginTop="20px" border='0px solid #00000029' borderRadius='1px' width='40%' boxShadow='0px 2px 4px rgba(0, 0.1, 0.1, 0.1) #00000029'>
              <Typography style={{ fontFamily: 'Poppins', marginLeft: '20px' }}>To pay: </Typography>
              <Typography style={{ fontFamily: 'Poppins', marginRight: '20px' }}>{fees}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              className={classes.continueButton}
              onClick={handleNext}
            >
              Continue
            </Button>
          </>
        )}
      </Paper>
      <Box className={classes.footer}>
        <Typography variant="body2">
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
    </Container>
  );
};

export default AppointmentBook;