import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, TextField, Box, Select, MenuItem, IconButton, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import StethoscopeIcon from '@mui/icons-material/LocalHospital';
import BookIcon from '@mui/icons-material/Book';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { COLORS } from './constants/Theme';
import Images from './constants/Images';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './searchbar';
import { useDropzone } from 'react-dropzone';
import {
  FormControl,
  InputLabel,
} from '@mui/material';

const styles = {
  root: {
    backgroundColor: '#EFEFEF',
    padding: 0,
    margin: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: '0 20px',
    '@media (min-width: 600px)': {
      padding: '0 50px',
    },
  },
  toolbar1: {
    display: 'flex',
    justifyContent: 'right',
    backgroundColor: '#FFF7FB',
    padding: '0 30px',
    '@media (min-width: 600px)': {
      padding: '0 50px',
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
    marginRight: '10px',
    '@media (max-width: 600px)': {
      marginRight: '5px',
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'right',
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
      display: 'none',
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
  centeredButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10%', 
    backgroundColor: '#FFFFFF',
  },
  centeredText: {
    marginBottom: '10px',
    color: COLORS.primaryColor,
    fontFamily: 'Poppins',
    fontSize: '18px',
  },
  dropzone: {
    border: '2px dashed #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '72%',
    height: '100px',
    margin:'28px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
  dropzoneText: {
    color: '#999',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '0',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '500px',
    height:'75%',
    position: 'relative',
  },
  modalHeader: {
    backgroundColor: '#FFF7FB', // Different color for the top section
    padding: '10px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  actionButton: {
    width: '400px',
    borderRadius: '30px',
    backgroundColor: 'white',
    border: '2px solid #972168',
    color: COLORS.primaryColor,
    '&:hover': {
      backgroundColor: '#FFF7FB',
    },
  },
  icon: {
    marginRight: '8px',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  dropdown: {
    width: '80%',
    margin:'30px',
  },
  fileName: {
    width: '80%',
    marginLeft:'30px',
  },
};

const records = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionChange = (event) => {
    
  };

  const handleFileUpload = (event) => {
    
  };
  const handleDrop = (acceptedFiles) => {
    // Handle dropped files
    console.log('Dropped files:', acceptedFiles);
    // You can perform the file upload or other actions here
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

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
      <SearchBar />
      <Box style={styles.centeredButton}>
        <Typography style={styles.centeredText}>You view your uploaded documents here</Typography>
        <Button
          variant="contained"
          style={styles.actionButton}
          onClick={handleOpenModal}
          startIcon={<AddIcon style={styles.icon} />}
        >
          Click here to add your health record
        </Button>
      </Box>
      {isModalOpen && (
        <Box style={styles.modalOverlay} onClick={handleCloseModal}>
          <Box style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <Box style={styles.modalHeader}>
              <Typography variant="h6">Popup Title</Typography>
              <IconButton
                color="secondary"
                style={styles.closeButton}
                onClick={handleCloseModal}
              >
                X
              </IconButton>
            </Box>

            <Typography variant="h6">Upload and keep track of all your medical documents</Typography>

            {/* Dropdown */}
            <FormControl style={styles.dropdown}>
              <InputLabel>Select Option</InputLabel>
              <Select
                value={1+41}
                onChange={handleOptionChange}
                fullWidth
              >
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
            </FormControl>

            {/* File Name Textbox */}
            <TextField
              style={styles.fileName}
              label="File Name"
              variant="outlined"
              fullWidth
            />

            {/* Upload File */}
            {/* Drag-and-Drop Area */}
            <Box {...getRootProps()} style={styles.dropzone}>
              <input {...getInputProps()} />
              <img src={Images.uploadPhoto} alt="Drop files here" style={styles.dropzoneImage} />
              <Typography style={styles.dropzoneText}>
                Drag & drop your files here, or click to select files
              </Typography>
            </Box>
            <label htmlFor="upload-file">
              <Button variant="contained" component="span" style={styles.actionButton}>
                Upload File
              </Button>
            </label>

          </Box>
        </Box>
      )}
    </Container>
  );
};

export default records;