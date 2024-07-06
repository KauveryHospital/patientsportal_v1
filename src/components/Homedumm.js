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
            <nav style={styles.nav}>
        <ul style={styles.navul}>
          <li><a href="#home" style={styles.navli}> <img src={Images.home} alt="home" />Home</a> </li>
          <li> <img src={Images.consult}/> <a href="#" style={styles.navli}  Consult /></li>
          <li> <img src={Images.MHCIcon}/> <a href="#" style={styles.navli}  MHC  /></li>
          <li><img src={Images.records}/><a href="#" style={styles.navli} Record  /></li>
          <li> <img src={Images.profile}/><a href="#" style={styles.navli}Login  /></li>
        </ul>
      </nav>
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
            {/* Fourth Split */}
            <Box >
                <Box style={styles.cardGrid}>
                    {[...Array(showMore ? 8 : 4)].map((_, index) => (
                        <Card key={index} style={styles.gridCard}>
                            <CardContent>
                                <Typography variant="h5">Grid Card {index + 1}</Typography>
                                <Typography variant="body2">Grid Card content</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                <Button onClick={handleSeeMore} style={styles.seeMoreButton}>
                    {showMore ? 'See Less' : 'See More'}
                </Button>
            </Box>

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
