import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem, Select, IconButton, Button, Box, Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './home.styles.js';
import Images from '../constants/Images.js';
import VideoComponent from './VideoComponent.js';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import PersonIcon from '@mui/icons-material/Person';
import { COLORS } from '../constants/Theme.js';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import StethoscopeIcon from '@mui/icons-material/LocalHospital';
import BookIcon from '@mui/icons-material/Book';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';
import {
    addFeedback,
    getFeedbackList,
    getProfileApi,
    nearbyUnits,
    nearbyUnitsCoordinates,
    nearbyUnitsRegion,
    nearbyUnitsWithoutRegion,
    reScheduleBooking,
    specializationList,
    specializationList1,
    upcomingEvents,
    updateBooking,
} from '../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { profileImageSaved, unitNameData } from '../store/actions/authActions';
import { useDispatch } from 'react-redux';
import LoginDrawer from '../components/LoginDrawer.js';

const Home = () => {
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const history = useHistory();
    const [token, setToken] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('Chennai - Mylapore');
    const [specialties, setSpecialities] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [unitAddress, setUnitAddress] = useState('No.199, Luz Church Road, Mylapore');
    const [showMoreSpecialties, setShowMoreSpecialties] = useState(false);
    const [showMoreDoctors, setShowMoreDoctors] = useState(false);
    const [spID, setSPID] = useState(10471000000018);
    const [name, setName] = useState('');
    const [unitid, setUnitid] = useState(13097000000024);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUnitChange = (unit) => {
        // Handle unit change
    };

    const location = useLocation();
    const handleSeeMoreSpecialties = () => {
        setShowMoreSpecialties(!showMoreSpecialties);
    };

    const handleSeeMoreDoctors = () => {
        setShowMoreDoctors(!showMoreDoctors);
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

    console.log(selectedUnit);
    // Function to fetch the token
    const fetchToken = async () => {
        try {
            const tokenUrl = 'http://192.168.28.86/KAPP_INFOSHARE/token';

            const requestData = {
                grant_type: 'password',
                username: 'Kauvery',
                password: 'Kmc@123'
            };
            console.log('data :', requestData);
            const tokenResponse = await axios.post(tokenUrl, qs.stringify(requestData), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log('url', tokenResponse);
            return tokenResponse.data.access_token;
        }
        catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    // Function to fetch location data using the token
    const fetchLocations = async () => {

        try {
            // const tokenUrl = 'http://192.168.28.86/KAPP_INFOSHARE/api/Values/GetUnit';
            const tokenUrl = 'http://localhost:1801/api/unit';
            const locationResponse = await axios.get(tokenUrl, {
                headers: {
                    // 'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response from POST API:', locationResponse.data.Result);
            setDropdownOptions(locationResponse.data.Result);            
            
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchDoctors = async (city1, spID) => {
        const city = city1;
        const spid = spID;
        // console.log('cityuuuuuuuuuuuuu', city);
        // console.log('idddddddddd', spID);
        try {
            const response = await axios.get(`http://localhost:1801/api/doctors/`, { params: { city, spid } });
            // Handle the response as needed
            console.log('Response from POST API:', response.data);
            setDoctors(response.data);
        } catch (error) {
            console.error('Error sending selected unit to API:', error);
        }
    };

    const sendSelectedUnitToAPI = async (city1) => {
        const city = city1;
        // console.log('cityuuuuuuuuuuuuu', city);
        try {
            const response = await axios.get(`http://localhost:1801/api/specialities/`, { params: { city } });
            // Handle the response as needed
            console.log('Response from POST API:', response.data);
            setSpecialities(response.data);
        } catch (error) {
            console.error('Error sending selected unit to API:', error);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            // const fetchedToken = await fetchToken();
            // console.log('ksjhfoiudaogrequoIoj',fetchedToken);
            // setToken('ksdjfhwuetgsoe', fetchedToken);
            // if (fetchedToken) {
                fetchLocations();
                sendSelectedUnitToAPI(selectedUnit);
                fetchDoctors(selectedUnit, spID);
            // }
        };

        initializeData();
    }, []);

    const handleSeeMore = () => {
        setShowMore(!showMore);
    };
console.log('uuuuuu', unitid)
    const handleBookinglist = () => {
        // history.push('/specialitydoctor');
        const queryParams = new URLSearchParams({
            dropdownOptions: dropdownOptions,
            selectedUnit: selectedUnit,
            unitAddress: unitAddress,
            unitid: unitid
        }).toString();

        history.push(`/specialitydoctor?${queryParams}`);
    };

    const handleMhclist = () => {
        // history.push({
        //     pathname: '/mhclist',
        //     state: { 
        //       dropdownOptions: dropdownOptions,
        //       selectedUnit: selectedUnit
        //     }
        //   });
        const queryParams = new URLSearchParams({
            dropdownOptions: dropdownOptions,
            selectedUnit: selectedUnit
        }).toString();

        history.push(`/mhclist?${queryParams}`);
    };

    const handleChange = (event) => {
        // console.log('inside');
        const selectedUnitName = event.target.value;
        setSelectedUnit(selectedUnitName);
        const selectedOption = dropdownOptions.find(option => option.UnitName === selectedUnitName);
        console.log('adrsssssssss', selectedOption);
        if (selectedOption) {
            setUnitAddress(selectedOption.Address);
            setUnitid(selectedOption.UnitId);
        }
        sendSelectedUnitToAPI(event.target.value);
    };

    console.log('adrsssssssss', unitAddress);
    const handleProfile = () => {
        // console.log('inside');
        history.push('/profile');
    };

    const renderSpecialties = () => {
        if (showMoreSpecialties) {
            return specialties.map((specialty, index) => (
                <div key={`facility-${index}`} style={styles.card}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.specialtiesCardHover.boxShadow}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                    <div style={styles.cardImageContainer}>
                        <img src={Images.generalMedicine} alt={specialty.name} style={styles.cardImage} />
                    </div>
                    <div style={styles.cardContent}>
                        <p style={{ fontFamily: 'Poppins', fontSize: '18px' }}>{specialty.specialityName}</p>
                        <p style={{ fontFamily: 'Poppins', fontSize: '14px' }}>{specialty.specialityDescription}</p>
                    </div>

                </div>
            ));
        } else {
            return specialties.slice(0, 5).map((specialty, index) => (
                <div key={`facility-${index}`} style={styles.card}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.specialtiesCardHover.boxShadow}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                    <div style={styles.cardImageContainer}>
                        <img src={Images.generalMedicine} alt={specialty.name} style={styles.cardImage} />
                    </div>
                    <div style={styles.cardContent}>
                        <p style={{ fontFamily: 'Poppins', fontSize: '18px' }}>{specialty.specialityName}</p>
                        <p style={{ fontFamily: 'Poppins', fontSize: '14px' }}>{specialty.specialityDescription}</p>
                    </div>
                </div>
            ));
        }
    };

    const renderDoctors = () => {
        if (showMoreDoctors) {
            return doctors.map((doctor, index) => (
                <div key={`doctor-${index}`} style={styles.doctorCard}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.specialtiesCardHover.boxShadow}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                    <div style={styles.imageContainer}>
                        {doctor.photo ? (
                            <img src={doctor.photo} alt={doctor.name} style={styles.doctorImage} />
                        ) : (
                            <PersonIcon style={styles.doctorImage} htmlColor='#B0B0B0' />
                        )}
                    </div>
                    <div style={styles.doctorContent}>
                        <h2 style={{ fontFamily: 'Poppins', fontSize: '18px' }}>{doctor.doctorName}</h2>
                        <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
                            {Array.isArray(doctor.designation) ? doctor.designation.join(', ') : doctor.designation}
                        </p>
                        {doctor.languages ? (
                            <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
                                {Array.isArray(doctor.languages) ? doctor.languages.join(', ') : doctor.languages}
                            </p>) : (
                            <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>Tamil, English</p>
                        )}
                        <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>{doctor.specialtyName}</p>
                    </div>
                </div>
            ));
        } else {
            return doctors.slice(0, 5).map((doctor, index) => (
                <div key={`doctor-${index}`} style={styles.doctorCard}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = styles.specialtiesCardHover.boxShadow}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                    <div style={styles.imageContainer}>
                        {doctor.photo ? (
                            <img src={doctor.photo} alt={doctor.name} style={styles.doctorImage} />
                        ) : (
                            <PersonIcon style={styles.doctorImage} htmlColor='#B0B0B0' />
                        )}
                    </div>
                    <div style={styles.doctorContent}>
                        <h2 style={{ fontFamily: 'Poppins', fontSize: '18px' }}>{doctor.doctorName}</h2>
                        <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
                            {Array.isArray(doctor.designation) ? doctor.designation.join(', ') : doctor.designation}
                        </p>
                        {doctor.languages ? (
                            <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
                                {Array.isArray(doctor.languages) ? doctor.languages.join(', ') : doctor.languages}
                            </p>) : (
                            <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>Tamil, English</p>
                        )}
                        <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>{doctor.specialtyName}</p>
                    </div>
                </div>
            ));
        }
    };

    const activeMenuStyle = (path) => {
        return location.pathname === path ? { color: COLORS.primaryColor } : { color: COLORS.placeholderColor };
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <Container maxWidth="xl" style={styles.root}>
            {/* Header */}
            <AppBar position="static" style={styles.header}>
                <Toolbar style={styles.toolbar}>
                    <img src={Images.kauveryLogo} alt="Logo" style={styles.logo} />
                    <Box style={styles.locationSection}>
                        <LocationOnIcon />
                        <Select
                            value={selectedUnit}
                            onChange={handleChange}  // Use onChange instead of onClick
                            displayEmpty  // Keeps the empty option visible
                            inputProps={{ 'aria-label': 'Select location' }}
                            IconComponent={ArrowDropDownIcon}
                            sx={{ minWidth: '200px', maxWidth: '100%', ...styles.dropdown }}  // Adjust width as needed
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
                    <IconButton color="inherit">
                        <FontAwesomeIcon icon={faBell} style={{ color: '#962067' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Second Split */}
            <Box style={styles.secondSplit}>
                <Toolbar style={styles.toolbar1}>
                    <Box display="flex" alignItems="center">
                        {/* <Button className={`${styles.button} active`}>
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
                        <Button
                            className={styles.button}
                            style={activeMenuStyle('/home')}
                            onClick={() => history.push('/home')}
                            disabled={!name}
                        >
                            <Box style={styles.menuItem}>
                                <IconButton>
                                    <HomeIcon style={styles.menuIcon} />
                                    <Typography style={styles.menuText}>Home</Typography>
                                </IconButton>
                            </Box>
                        </Button>
                        <Button
                            className={styles.button}
                            style={activeMenuStyle('/specialitydoctor')}
                            onClick={() => history.push('/specialitydoctor')}
                            // disabled={!name}
                        >
                            <Box style={styles.menuItem}>
                                <StethoscopeIcon style={styles.menuIcon} />
                                <Typography style={styles.menuText}>Consult</Typography>
                            </Box>
                        </Button>
                        <Button
                            className={styles.button}
                            style={activeMenuStyle('/mhclist')}
                            onClick={handleMhclist}
                            // disabled={!name}
                        >
                            <Box style={styles.menuItem}>
                                <BookIcon style={styles.menuIcon} />
                                <Typography style={styles.menuText}>MHC</Typography>
                            </Box>
                        </Button>
                        <Button
                            className={styles.button}
                            style={activeMenuStyle('/records')}
                            onClick={() => history.push('/records')}
                            disabled={!name}
                        >
                            <Box style={styles.menuItem}>
                                <NoteIcon style={styles.menuIcon} />
                                <Typography style={styles.menuText}>Records</Typography>
                            </Box>
                        </Button>
                        <LoginDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
                    </Box>
                    {/* <Button className={styles.userButton}>
                        <Typography style={styles.userButton}>{name}</Typography>
                        <Box style={styles.exicon}>
                            <ExpandMoreIcon style={{ color: '#962067' }} />
                        </Box>
                    </Button> */}
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
                        <Button className={styles.userButton} onClick={handleDrawerOpen}>
                            <Typography style={styles.userButton}>Login</Typography>
                        </Button>
                    )}
                </Toolbar>
                <Box style={styles.imageSection1}>
                    <Box style={styles.instructions}>
                        <Typography variant="body1" style={styles.ins1}>Welcome to Kauvery Kare!</Typography>
                        <br />
                        <br />
                        <Typography variant="body1" style={styles.ins2}>Hey there, Kauvery cares.</Typography>
                        <br />
                        <Typography variant="body1" style={styles.ins3}>Your Healthcare, just a click away!</Typography>
                    </Box>

                    <img src={Images.family_front} alt="img" style={styles.rightimg} />
                </Box>

                <Box style={styles.searchBar}  >
                    <Button onClick={handleBookinglist} style={styles.searchButton} startIcon={<img src={Images.appointment} alt="Appointment" />}>Book an Appointment</Button>
                    <Button onClick={handleMhclist} style={styles.searchButton} startIcon={<img src={Images.healthCheckup} alt="Health checkup" />}>Book Health checkups</Button>
                </Box>


                <Box style={styles.imageSection}>
                    <Typography variant="body1" style={styles.buttext}>
                        Book for In-hospital or Video Consultation
                    </Typography>
                    <Typography variant="body1" style={styles.buttext1}>
                        Book online to avail offers
                    </Typography>
                </Box>
                <br />

                <Box style={styles.searchBar1}>
                    {/* <Box style={{display: 'flex', flexDirection: 'column'}}> */}
                    <img src={Images.qr} alt="Right" style={styles.qrimage} />

                    <Typography variant="body1" style={styles.qrtext}>
                        Download our Mobile app
                    </Typography>
                    {/* </Box> */}
                </Box>

                <Typography variant="body1" style={styles.serachtext}>
                    What service can we help you find?
                </Typography>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '-80px' }}>
                    {/* <div style={styles.search}> */}
                    <Box style={{ marginLeft: '650px', width: '50%', marginBottom: '20px' }}>
                        <input type="search" style={styles.searchfield} placeholder="Search by Specialty, Condition or Doctor Name" />
                    </Box>
                    {/* <img src={Images.searchIcon} alt="Right" style={styles.searchIcon} /> */}
                    <Button style={styles.searchmain}>Search</Button>
                    {/* </div> */}
                </Box>

            </Box>

            {/* Third Split */}
            <Box style={styles.thirdSplit}>
                <Box style={styles.instructions}>
                    <Typography variant="body1" style={styles.tt1}>Upcoming events</Typography>
                    <Typography variant="body1" style={styles.tt2}>No events!</Typography>
                    <br />
                    <Typography variant="body1" style={styles.tt3}>Please login to your account to stay updated on your upcoming events</Typography>
                    <img src={Images.eventCalander} alt="Right" style={styles.eventCalander} />
                </Box>
            </Box>

            {/* Fourth Split Features */}
            <Box style={styles.fourthSplit}>
                <div style={styles.featuresContainer}>
                    <h2 style={styles.featuresTitle}>Our Features</h2>
                    <div style={styles.featuresList}>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>
                                <img
                                    style={styles.featureImage}
                                    src={Images.hospitalVisit}
                                    alt="Book Consultation"
                                />
                            </div>
                            <h3 style={styles.featureTitle}>Book Consultation</h3>
                            <p style={styles.featureDescription}>
                                Book an online consultation or hospital visit with our in-house specialties.
                            </p>
                        </div>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>
                                <img
                                    style={styles.featureImage}
                                    src={Images.scientist}
                                    alt="Book a Master Health Check Up"
                                />
                            </div>
                            <h3 style={styles.featureTitle}>Book a Master Health Check Up</h3>
                            <p style={styles.featureDescription}>
                                Our access to the wide range of lab tests available.
                            </p>
                        </div>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>
                                <img
                                    style={styles.featureImage}
                                    src={Images.familyMember}
                                    alt="Get access to Health Records"
                                />
                            </div>
                            <h3 style={styles.featureTitle}>Get access to Health Records</h3>
                            <p style={styles.featureDescription}>
                                Book an online consultation or hospital visit with our in-house specialties.
                            </p>
                        </div>
                        <div style={styles.featureItem}>
                            <div style={styles.featureIcon}>
                                <img
                                    style={styles.featureImage}
                                    src={Images.familyMember}
                                    alt="Add Your Family Member"
                                />
                            </div>
                            <h3 style={styles.featureTitle}>Add Your Family Member</h3>
                            <p style={styles.featureDescription}>
                                Add your family members to the account and keep track.
                            </p>
                        </div>
                    </div>
                </div>
            </Box>

            <div style={styles.container}>
                {/* Left side (Specialties) */}
                <div style={styles.section}>
                    <p style={styles.title}>Specialties
                        {specialties.length > 5 && (
                            // <Button onClick={handleSeeMoreSpecialties} style={styles.see}>
                            <span
                                style={styles.see}
                                onClick={handleSeeMoreSpecialties}
                            >
                                {showMoreSpecialties ? 'See Less' : 'See All'}
                            </span>
                            // </Button>
                        )}
                    </p>
                    {renderSpecialties()}
                </div>

                {/* Right side (Doctors) */}
                <div style={styles.section}>
                    <p style={styles.title}>Doctors
                        {doctors.length > 5 && (
                            // <Button onClick={handleSeeMoreSpecialties} style={styles.see}>
                            <span
                                style={styles.see}
                                onClick={handleSeeMoreDoctors}
                            >
                                {showMoreDoctors ? 'See Less' : 'See All'}
                            </span>
                            // </Button>
                        )}
                    </p>
                    {renderDoctors()}
                </div>
            </div>
            <VideoComponent />
            {/* Footer */}
            <Box style={styles.footer}>
                <Typography variant="body2">
                    © 2024 Patient Appointment Booking. All rights reserved.
                </Typography>
            </Box>
        </Container >
    );
};

export default Home;
