import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, MenuItem, Select, IconButton, Button, Box, Card, CardContent, Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { faBell} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './HomeStyles.styles.js';
import Images from './constants/Images.js';

const Home = () => {
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        // Fetch dropdown options from API
        axios.get('/api/dropdown-options')
            .then(response => setDropdownOptions(response.data))
            .catch(error => console.error('Error fetching dropdown options:', error));
    }, []);

    const handleSeeMore = () => {
        setShowMore(!showMore);
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
                            variant="outlined"
                            style={styles.dropdown}
                            IconComponent={ArrowDropDownIcon}
                        >
                            {dropdownOptions.map(option => (
                                <MenuItem key={option.id} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <IconButton color="inherit">
                    <FontAwesomeIcon icon={faBell}  style={{ color: '#962067' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Second Split */}
            <Box style={styles.secondSplit}>
                <Box style={styles.instructions}>
                    <Typography variant="body1" style={styles.ins1}>Welcome to Kauvery Kare!</Typography>
                    <br></br>
                    <br></br>
                    <Typography variant="body1" style={styles.ins2}>Hey there, Kauvery cares.</Typography>
                    <br></br>
                    <Typography variant="body1" style={styles.ins3}>Your Healthcare, just a click away!</Typography>
                </Box>
                <Box style={styles.searchBar}>
                <Button style={styles.searchButton} startIcon={<img src={Images.appointment} alt="Appointment" />}>Book an Appointment</Button>  
                <Button style={styles.searchButton} startIcon={<img src={Images.healthCheckup} alt="Health checkup" />}>Book Health checkups</Button>
                </Box>
                <Box style={styles.imageSection}>
                <Typography  variant="body1" style={styles.buttext}>
                    Book for In-hospital or Video Consultation  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book online to avail offers  </Typography>   
                    <img src={Images.qr} alt="Right" style={styles.qrimage} />
                    
                </Box>
<br></br>
                        
                <Box style={styles.searchBar}> 
                <Typography  variant="body1" style={styles.serachtext}>
                What service can we help you find?</Typography>  
                    
                <Typography  variant="body1" style={styles.qrtext}>
                Download our Mobile app </Typography>  
                        
                <div style={styles.search} >
                <input type="search" style={styles.searchfield} placeholder="Search by Specialty, Condition or Doctor Name" />
                <img src={Images.searchIcon} alt="Right" style={styles.searchIcon} />
                <Button style={styles.searchmain}>Search</Button>
      </div>
      
      </Box>

            </Box>

            {/* Third Split */}
            <Box style={styles.thirdSplit}>
                
            <Box style={styles.instructions}>
                    <Typography variant="body1" style={styles.tt1}>Upcoming events</Typography>
                    <br></br>
                    <br></br>
                    <Typography variant="body1" style={styles.tt2}>No events!</Typography>
                    <br></br>
                    <Typography variant="body1" style={styles.tt3}>Please login to your account to stay updated on your upcoming events</Typography>
                    <img src={Images.eventCalander} alt="Right" style={styles.eventCalander} />
                </Box>
                           
            </Box>
{/* Fourth Split features */}
<Box style={styles.fourthSplit}>

    <Box style={styles.container}>
      <Typography variant="h4" gutterBottom>
      Our Features
      </Typography>

      <Box style={styles.gridContainer}>
        {/* Feature 1 */}
        <Box style={styles.featureBox}>
            <div style={styles.imagecont}>
          <img  style={styles.image}src={Images.hospitalVisit} alt="Feature 1" /></div>
          <Typography variant="h6" style={styles.featurename}>Book Consultation</Typography>
          <Typography variant="body1">
          Book an online consultation or hospital visit with our in house specialties.
          </Typography>
        </Box>

        {/* Feature 2 */}
        <Box style={styles.featureBox}>
            <div style={styles.imagecont}>
          <img  style={styles.image}src={Images.scientist} alt="Feature 2" /></div>
          <Typography variant="h6" style={styles.featurename}>Book a Master Health Check Up</Typography>
          <Typography variant="body1">
          Our access to the wide range of lab tests available.
          </Typography>
        </Box>
        {/* Feature 3 */}
        <Box style={styles.featureBox}>
            <div style={styles.imagecont}>
          <img  style={styles.image}src={Images.familyMember} alt="Feature 3" /></div>
          <Typography variant="h6" style={styles.featurename}>Get access to Health Records</Typography>
          <Typography variant="body1">
          Book an online consultation or hospital visit with our in house specialties.
          </Typography>
        </Box>

        {/* Feature 4 */}
        <Box style={styles.featureBox}>
            <div style={styles.imagecont}>
          <img  style={styles.image}src={Images.familyMember} alt="Feature 4" /></div>
          <Typography variant="h6" style={styles.featurename}>Add Your Family Member</Typography>
          <Typography variant="body1">
          Add your family members to the account and keep track.
          </Typography>
        </Box>
      </Box>
    </Box>
            </Box>
            <br></br>
            <br></br>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {/* Left side (Facilities) */}
      <div style={{ width: '50%', borderRadius: '20px', padding: '10px', maxHeight: 'fit-content', overflowY: 'fit-content', backgroundColor: 'white',fontFamily:'Poppins' }}>
        <h1 style={{ textAlign: 'left' }}>Featured Specialty Areas</h1>
        {[...Array(7)].map((_, index) => (
          <div key={`facility-${index}`} style={{ display: 'flex', alignItems: 'left', marginBottom: '10px', border: '1px solid #e0e0e0', height: '80px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px' }}>
            <img src={Images.dermatology} alt={`Facility ${index + 1}`} style={{ width: 'fit', height: 'fit', marginRight: '10px' }} />
            <div>
              <h2 style={{ margin: '0' }}>Facility {index + 1}</h2>
              <p style={{ margin: '0' }}>Description of Facility {index + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right side (Doctors) */}
      <div style={{ width: '50%', padding: '20px', borderRadius: '20px', maxHeight: '100%', overflowY: 'fit-content', backgroundColor: 'white' }}>
        <h1 style={{ textAlign: 'left' }}>Top Doctors</h1>
        {[...Array(4)].map((_, index) => (
          <div key={`doctor-${index}`} style={{ display: 'flex', alignItems: 'left', marginBottom: '10px', padding: '25px', border: '1px solid #e0e0e0', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <img src={`/path/to/doctor-${index + 1}.jpg`} alt={`Doctor ${index + 1}`} style={{ width: '30%', height: '140px', marginRight: '10px' }} />
            <div>
              <h2 style={{ margin: '0' }}>Doctor {index + 1}</h2>
              <p style={{ margin: '0' }}>Details of Doctor {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
            {/* Footer */}
            <Box style={styles.footer}>
                <Typography variant="body2">
                    © 2024 Patient Appointment Booking. All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
