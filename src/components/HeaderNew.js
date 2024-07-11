import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Select, MenuItem, IconButton, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import StethoscopeIcon from '@mui/icons-material/LocalHospital';
import BookIcon from '@mui/icons-material/Book';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLORS } from '../constants/Theme';
import Images from '../constants/Images.js';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const styles = {
  root: {
    backgroundColor: '#EFEFEF',
    padding: 0,
    margin: 0,
  },
  // header: {
  //   display: 'flex',
  //   flex: 0,
  //   width: '100%',
  //   height: '80px',
  //   backgroundColor: '#FFFFFF',
  //   boxShadow: '0px 3px 3px #00000029',
  //   alignItems: 'center',
  //   padding: '0px',
  //   justifyContent: 'space-between',
  // },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: '0 20px', // Adjust padding for smaller screens
    '@media (min-width: 600px)': {
      padding: '0 50px', // Increase padding for larger screens
    },
  },
  toolbar1: {
    display: 'flex',
    justifyContent: 'right',
    backgroundColor: '#FFF7FB',
    padding: '0 30px', // Adjust padding for smaller screens
    '@media (min-width: 600px)': {
      padding: '0 50px', // Increase padding for larger screens
    },
  },
  button: {
    color: COLORS.primaryColor,
    '&:hover': {
      backgroundColor: '#FFF7FB',
    },
    '&.active': {
      fontWeight: 'bold',
      borderBottom: '2px solid #972168',
    },
    marginRight: '10px', // Adjust spacing between buttons
    '@media (max-width: 600px)': {
      marginRight: '5px', // Reduce spacing on smaller screens
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'right',
    // marginRight: '0px'
  },
  menuIcon: {
     marginRight: '10px',
    color: COLORS.placeholderColor,
  },
  menuText: {
    // fontWeight: 600,
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
    },
  },
  header: {
    display: 'flex',
    flex: 0,
    width: '100%',
    height: '80px',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: '0px',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      height: '60px',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  exicon: {
    color: COLORS.primaryColor,
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
};

const Header = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  return (
    <Container maxWidth="xl" style={styles.root}>
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
            <FontAwesomeIcon icon={faBell} style={{ color: '#962067' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
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
          <Button className={styles.button}>
            <Box style={styles.menuItem}>
              <HomeIcon style={styles.menuIcon} />
              <Typography style={styles.menuText}>Home</Typography>
            </Box>
          </Button>
          <Button className={styles.button}>
            <Box style={styles.menuItem}>
              <StethoscopeIcon style={styles.menuIcon} />
              <Typography style={styles.menuText}>Consult</Typography>
            </Box>
          </Button>
          <Button className={styles.button}>
            <Box style={styles.menuItem}>
              <BookIcon style={styles.menuIcon} />
              <Typography style={styles.menuText}>MHC</Typography>
            </Box>
          </Button>
          <Button className={styles.button}>
            <Box style={styles.menuItem}>
              <NoteIcon style={styles.menuIcon} />
              <Typography style={styles.menuText}>Records</Typography>
            </Box>
          </Button>
        </Box>
        <Button className={styles.userButton}>
          <Typography style={styles.userButton}>John</Typography>
          <Box style={styles.exicon}>
          <ExpandMoreIcon />
          </Box>
        </Button>
      </Toolbar>
    </Container>
  );
};

export default Header;
