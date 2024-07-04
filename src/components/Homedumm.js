import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, MenuItem, Select, IconButton, TextField, Button, Box, Card, CardContent, Container } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import styles from './HomeStyles.styles';
import Images from '../constants/Images';

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
                    <IconButton edge="end" color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Second Split */}
            <Box style={styles.secondSplit}>
                <Box style={styles.instructions}>
                    <Typography variant="body1" style={styles.ins1}>Welcome to Patient Portal!</Typography>
                    <Typography variant="body1" style={styles.ins2}>Hey there, Kauvery cares.</Typography>
                    <Typography variant="body1" style={styles.ins3}>Your Healthcare, just a click away!</Typography>
                </Box>
                <Box style={styles.searchBar}>
                    <Select
                        variant="outlined"
                        placeholder="Location"
                        style={styles.locationDropdown}
                        IconComponent={ArrowDropDownIcon}
                    >
                        {dropdownOptions.map(option => (
                            <MenuItem key={option.id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        InputProps={{
                            style: {
                                backgroundColor: '#FFFFFF',
                                borderColor: '#962067',
                            }
                        }}
                        style={styles.searchInput}
                    />
                    <Button style={styles.searchButton}>Search Doctor</Button>
                </Box>
                <Box style={styles.imageSection}>
                    <Box style={styles.menuIcons}>
                        {[...Array(5)].map((_, index) => (
                            <IconButton key={index}><ArrowDropDownIcon /></IconButton>
                        ))}
                    </Box>
                    <img src="/path/to/image.jpg" alt="Right Image" style={styles.image} />
                </Box>
            </Box>

            {/* Third Split */}
            <Box style={styles.thirdSplit}>
                {/* Zig-zag content */}
                <Box style={styles.zigZag}>
                    {[...Array(4)].map((_, index) => (
                        <Box key={index} style={styles.zigZagRow}>
                            <img src="/path/to/zigzag-image.jpg" alt={`Zigzag ${index}`} style={styles.zigZagImage} />
                            <Typography variant="body1">Instruction for zigzag {index + 1}</Typography>
                        </Box>
                    ))}
                </Box>
                {/* Scanners */}
                <Box style={styles.scanners}>
                    <img src="/path/to/appstore-scanner.png" alt="App Store" style={styles.scanner} />
                    <img src="/path/to/playstore-scanner.png" alt="Play Store" style={styles.scanner} />
                </Box>
                {/* Right Side */}
                <Box style={styles.rightContent}>
                    <Box style={styles.cards}>
                        {[...Array(2)].map((_, index) => (
                            <Card key={index} style={styles.card}>
                                <CardContent>
                                    <Typography variant="h5">Card {index + 1}</Typography>
                                    <Typography variant="body2">Card {index + 1} content</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    <Box style={styles.videos}>
                        {[...Array(2)].map((_, index) => (
                            <iframe
                                key={index}
                                title={`video${index + 1}`}
                                src={`https://www.youtube.com/embed/${index + 1}`}
                                style={styles.video}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Fourth Split */}
            <Box style={styles.fourthSplit}>
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
