import React, { useState } from 'react';
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
  TextField, MenuItem,
  colors
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { InsertDriveFile } from '@mui/icons-material';

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
    height: '60px',
    width: '200px',
    marginTop: '20px',
    justifyContent: 'left',
    alignItems: 'left',
    marginRight: '350px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    border: '0px solid #e0e0e0',
    borderRadius: '5px',
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
    marginTop: '20px',
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
    border: '0.2px dashed #707070',
    padding: '16px',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '20px',
    marginRight: '250px'
  },
  uploadIcon: {
    color: '#962067',
    marginBottom: '8px',
  },
  notesField: {
    marginBottom: '10px',
    marginTop: '20px',
    border: '0px solid #e0e0e0',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
    alignItems: 'center',
    marginTop: '20px',
    border: '0px solid #00000029',
    borderRadius: '1px',
    width: '100%',
    boxShadow: '0px 2px 4px rgba(0, 0.1, 0.1, 0.1) #00000029',
    backgroundColor: '#DCDCDC33',
    color: COLORS.textColor
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
    color: COLORS.textColor,
    fontFamily: 'Poppins',
    fontSize: '12px'
  },
  iconButton: {
    justifyContent: 'center',
    color: '#962067',
  }
};

const PatientDetails = () => {
  const classes = useStyles;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isCheckoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState(generateDateRange(new Date()));
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedUnit = queryParams.get('selectedUnit');
  const packagePrice = queryParams.get('packagePrice');
  // const dropdownOptions = queryParams.get('dropdownOptions');

  // const handleCheckout = () => {
  //   setDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  // };

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

  const handleUnitChange = (date) => {
    // setSelectedDate(date);
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
    setCheckoutDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseCheckoutDialog = () => {
    setCheckoutDialogOpen(false);
  };

  return (
    <Container style={classes.root}>
      <Header 
      dropdownOptions={dropdownOptions}
      selectedUnit={selectedUnit}
      />
      {/* <Box style={classes.header}>
        <Avatar
          src="/path/to/doctor-image.jpg"
          alt="Doctor Image"
          style={classes.avatar}
        />
        <Box style={classes.doctorInfo}>
          <Typography variant="h6" style={{ fontFamily: 'Poppins' }}>Dr. N. Sridhar</Typography>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}>M.B.B.S., M.D.(Anesthesiology), F.R.C.A (Anaesthetists) U.K., F.F.I.C.M.</Typography>
        </Box>
        <Box style={classes.timeInfo}>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}>Critical Care</Typography>
          <Typography variant="body2" style={{ fontFamily: 'Poppins' }}><AccessTimeIcon /> 09:00 AM - 01:00 PM</Typography>
        </Box>
      </Box> */}

      <Paper style={classes.appointmentInfo}>
        <Box display="flex" alignItems="center" marginBottom="10px">
          <ArrowBackIosIcon className={classes.calendarIcon} onClick={() => handleDateChange('prev')} />
          <Typography style={{ fontFamily: 'Poppins' }} color={COLORS.textColor}>Additional Details</Typography>
          <ArrowForwardIosIcon className={classes.calendarIcon} onClick={() => handleDateChange('next')} />
        </Box>
        <Typography variant="body2" fontFamily='Poppins' marginRight='250px' marginTop='5px' color={COLORS.textColor}>
          Provide additional details for consultation
          {/* <a href="/add-patient" color='#962067' style={classes.addPatientLink}> Add patient</a> */}
        </Typography>
        <TextField
          fullWidth
          select
          label="Select patient"
          variant="outlined"
          style={classes.selectPatient}
        >
          <MenuItem value="Patient 1" fontFamily='Poppins'>Patient 1</MenuItem>
          <MenuItem value="Patient 2" fontFamily='Poppins'>Patient 2</MenuItem>
        </TextField>     

        <TextField
          fullWidth
          label="Notes to doctor"
          multiline
          rows={4}
          variant="outlined"
          style={classes.notesField}
        />
        <Typography variant="body2" fontSize='12px' align="left" fontFamily='Poppins' marginRight='400px' marginBottom='20px' color={COLORS.placeholderColor} gutterBottom>
          Maximum 500 characters.
        </Typography>
        <Typography variant="body2" gutterBottom fontFamily='Poppins' marginRight='450px' marginBottom='20px' color={COLORS.textColor}>
            Upload files
          </Typography>
        <Paper style={classes.uploadBox} elevation={0}>
        <IconButton component="span" className={classes.iconButton}>
          <InsertDriveFile fontSize="large" />
        </IconButton>
          <Button component="label" fontSize='18px' fontFamily='Poppins' style={classes.uploadte}>
            Choose your file to upload here
            <input type="file" hidden />
          </Button>          
        </Paper>
        <Typography variant="body2" color={COLORS.placeholderColor} fontSize='10px' marginRight='280px' fontFamily='Poppins'>
            Support format (Max 1 MB): PNG, JPG, JPEG, HEIC, PDF
          </Typography>
          <Box style={classes.buttonContainer}>
          <Typography style={{ fontFamily: 'Poppins', marginLeft: '20px'}}>To pay: </Typography>
          <Typography style={{ fontFamily: 'Poppins', marginRight: '20px'}}>{packagePrice}</Typography>                    
          </Box>
        
          <Button
            fullWidth
            variant="contained"
            style={classes.continueButton}
            onClick={handleNext}
          >
            Continue
          </Button>
        
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
            Your in-person consultation with Dr. Sridhar on 08th Jul 2024, 10:54 AM is confirmed!
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

export default PatientDetails;
