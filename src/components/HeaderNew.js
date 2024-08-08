import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Select, MenuItem, IconButton, Container, Menu } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StethoscopeIcon from '@mui/icons-material/LocalHospital';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookIcon from '@mui/icons-material/Book';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLORS } from '../constants/Theme';
import Images from '../constants/Images.js';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { profileImageSaved, unitNameData } from '../store/actions/authActions';
import { getProfileApi } from '../utils/apiCalls';
import LoginDrawer from './LoginDrawer.js';
import { makeStyles } from '@mui/styles';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const styles = {
  root: {
    backgroundColor: '#ffe6f2',
    padding: 0,
    margin: 0,
  },
  dropdown: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    height: '25px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: '0px', // Adjust padding for smaller screens
    '@media (min-width: 600px)': {
      padding: '0 50px', // Increase padding for larger screens
    },
  },
  toolbar1: {
    display: 'flex',
    justifyContent: 'right',
    backgroundColor: '#ffe6f2',
    padding: '0 30px', // Adjust padding for smaller screens
    '@media (min-width: 600px)': {
      padding: '0 50px', // Increase padding for larger screens
    },
  },
  button: {
    color: COLORS.primaryColor,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: COLORS.primaryColor,
      color: '#972168',
    },
    '&.active': {
      fontWeight: 'bold',
      borderBottom: '2px solid #972168',
      color: COLORS.primaryColor,
    },
    marginRight: '10px', // Adjust spacing between buttons
    '@media (max-width: 600px)': {
      marginRight: '5px', // Reduce spacing on smaller screens
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'left',
    marginRight: '380px',
  },
  menuIcon: {
    marginRight: '10px',
    color: COLORS.placeholderColor,
  },
  menuText: {
    fontSize: '12px',
    fontFamily: 'Poppins',
    marginTop: '5px',
    color: COLORS.placeholderColor,
    '@media (max-width: 600px)': {
      display: 'none', // Hide text on smaller screens
    },
  },
  userButton: {
    color: COLORS.primaryColor,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#972168',
      color: '#fff',
    },
  },
  header: {
    display: 'flex',
    flex: 0,
    margin: '0px',
    width: '100%',
    height: '80px',
    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    padding: '0px',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      height: '60px',
    },
  },
  logo: {
    height: '70px',
    marginLeft: '20px',
    '@media (max-width: 600px)': {
      height: '50px',
      marginLeft: '10px',
    },
  },
  locationSection: {
    display: 'flex',
    color: COLORS.primaryColor,
    textAlign: "left",
    alignItems: 'center',
    font: "normal normal normal 18px/27px Poppins",
    letterSpacing: "0px",
    width: '24px',
    height: '35px',
    '@media (max-width: 600px)': {
      fontSize: '14px',
      width: '20px',
      height: '30px',
    },
  },
  exicon: {
    color: COLORS.primaryColor,
  },
};

const useStyles = makeStyles({
  button: {
    margin: '8px', // simple spacing
  },
  activeButton: {
    backgroundColor: '#3f51b5', // primary color
    color: '#fff', // contrast text color
  },
  menuItem: {
    display: 'flex',
    alignItems: 'left',
    marginRight: '20px',
  },
  menuIcon: {
    marginRight: '8px', // simple spacing
  },
  menuText: {
    fontFamily: 'Poppins',
  },
});

const Header = ({ dropdownOptions, selectedUnit, onUnitChange, slotType }) => {
  const classes = useStyles();
  const [selectedPage, setSelectedPage] = useState('mhc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleChange = (event) => {
    onUnitChange(event.target.value);
    // const selectedUnitName = event.target.value;
    //     setSelectedUnit(selectedUnitName);
    //     const selectedOption = dropdownOptions.find(option => option.UnitName === selectedUnitName);
    //     // console.log('adrsssssssss', selectedOption);
    //     if (selectedOption) {
    //         setUnitAddress(selectedOption.Address);
    //     }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const activeMenuStyle = (path) => {
    return location.pathname === path ? { color: COLORS.primaryColor } : { color: COLORS.placeholderColor };
  };

  const handleBookinglist = () => {
    history.push('/specialitydoctor');
  };

  const handleProfile = () => {
    // console.log('inside');
    history.push('/profile');
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
};

const handleDrawerClose = () => {
  setIsDrawerOpen(false);
};

useEffect(() => {
  // nearbyUnitsWithoutCoordinates();
  // GettingLocationAccess();
  // pusherCallAPI();
  // getFeedbackListApiCall();
  onCallProfileApi();
  // upcomingEventsApiCall();
}, []);

const onCallProfileApi = async () => {
  const response = await getProfileApi();
  console.log(response);
  if (isResponseIsValid(response)) {
      dispatch(profileImageSaved(response.data.photo));
      setName(response.data.name);
  }
};

  const handleMhclist = () => {
    const queryParams = new URLSearchParams({
      dropdownOptions: dropdownOptions,
      selectedUnit: selectedUnit
    }).toString();
    history.push(`/mhclist?${queryParams}`);
  };

  const hospitalVisitClick = () => {
    // if(slotType == 'Walk In'){
    //   style={activeMenuStyle('/appointmentbook')}
    // }
  };

  return (
    <Container maxWidth="xl" style={styles.root}>
      <AppBar position="static" style={styles.header}>
        <Toolbar style={styles.toolbar}>
          <img src={Images.kauveryLogo} alt="Logo" style={styles.logo} />
          {dropdownOptions && dropdownOptions.length > 0 ? (
            <Box style={styles.locationSection}>
              <LocationOnIcon />
              <Select
                value={selectedUnit}
                onChange={handleChange} // Use onChange instead of onClick
                displayEmpty // Keeps the empty option visible
                inputProps={{ 'aria-label': 'Select location' }}
                IconComponent={ArrowDropDownIcon}
                sx={{ minWidth: '200px', maxWidth: '100%', ...styles.dropdown }} // Adjust width as needed
                variant="outlined"
              >
                <MenuItem disabled value="">
                  {selectedUnit}
                </MenuItem>
                {dropdownOptions.map(option => (
                  <MenuItem key={option.id} value={option.UnitName}>
                    {option.UnitName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          ) : null}
          <IconButton color="inherit">
            <FontAwesomeIcon icon={faBell} style={{ color: '#962067' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar style={styles.toolbar1}>
        <Box display="flex" alignItems="center">
          {/* <Button className={${styles.button} active}>
            <Box style={styles.menuItem}>
              <HomeIcon style={styles.menuIcon} />
              <Typography style={styles.menuText}>Hospital visit</Typography>
            </Box>
          </Button>
          <Button className={styles.button}>
            <Box style={styles.menuItem}>
              <NoteIcon style={styles.menuIcon} />
              <Typography style={styles.menuText}>Hospital records</Typography>
            </Box>
          </Button> */}
          
          {slotType && (
        <>
          {/* <Button
            className={`${classes.button} ${
              slotType === 'Walk In' ? 'active' : ''
            }`}
          >
            <Box className={classes.menuItem}>
              <HomeIcon className={classes.menuIcon} />
              <Typography className={classes.menuText}>Hospital visit</Typography>
            </Box>
          </Button>
          <Button
            className={`${classes.button} ${
              slotType === 'Tele Consult' ? 'active' : ''
            }`}
          >
            <Box className={classes.menuItem}>
              <NoteIcon className={classes.menuIcon} />
              <Typography className={classes.menuText}>
                Video Consultation
              </Typography>
            </Box>
          </Button> */}
           <Box style={styles.menuItem}>
          <Button startIcon={<LocalHospitalIcon />} style={slotType === 'Walk In' ? activeMenuStyle('/appointmentbook') : {color: COLORS.placeholderColor}} onClick={() => history.push('/appointmentbook')}>Hospital visit</Button>
          <Button startIcon={<VideoCallIcon />} style={slotType === 'Tele Consult' ? activeMenuStyle('/appointmentbook') : {color: COLORS.placeholderColor}} onClick={() => history.push('/appointmentbook')}>Video Consult</Button>
          </Box>
        </>
      )}

          <Button startIcon={<HomeIcon />} style={activeMenuStyle('/home')} onClick={() => history.push('/home')}>Home</Button>
          <Button startIcon={<NoteIcon />} style={activeMenuStyle('/specialitydoctor')} onClick={handleBookinglist}>Consult</Button>
          <Button startIcon={<BookIcon />} style={activeMenuStyle('/mhclist')} onClick={handleMhclist}>Mhc</Button>
          <Button startIcon={<StethoscopeIcon />} style={activeMenuStyle('/appointments')} onClick={() => history.push('/appointments')}>Records</Button>
          {/* <Button
            className={`${styles.button} ${selectedPage === 'records' ? 'active' : ''}`}
            onClick={() => handlePageChange('records')}
          > */}
          {/* <Box style={styles.menuItem}>
              <NoteIcon style={styles.menuIcon} />
              <Typography style={styles.menuText}>Records</Typography>
            </Box>
          </Button> */}
        </Box>
        {name ? (
          <div>
            <Button className={styles.userButton} onClick={handleClick}>
              <Typography style={styles.userButton}>{name}</Typography>
              <Box style={styles.exicon}>
                <ExpandMoreIcon style={{ color: '#962067' }} />
              </Box>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Sign out</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button className={styles.userButton} >
            <LoginDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
            <Typography style={styles.userButton}>Login</Typography>
          </Button>
        )}
      </Toolbar>
    </Container>
  );
};

export default Header;
