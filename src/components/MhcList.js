import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, InputAdornment, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Header from './HeaderNew';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { COLORS } from '../constants/Theme';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  spacing: 0,
  palette: {
    primary: {
      main: '#8e44ad',
    },
  },
});

const RootContainer = styled(Container)({
  padding: 0,
  margin: 0,
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: '100%', // Full width
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#e0e0e0', // Set background color here
    height: '30px', 
    width: '20%',
    alignItems: 'right',
    justifyContent: 'right',
    marginBottom: '20px',
    marginTop: '20px',
    marginLeft: '900px',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: COLORS.primaryColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.primaryColor,
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px', // Adjust padding for text alignment
    '&::placeholder': {
      color: '#000000', // Placeholder color
    },
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '10px',
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  margin: '10px',
  '@media (max-width: 600px)': {
    padding: '15px',
  },
}));

const FeeTypography = styled(Typography)({
  display: 'flex',
  flexDirection: 'row',
  color: COLORS.primaryColor,
  marginTop: '10px',
});

const BookButton = styled(Button)({
  backgroundColor: COLORS.primaryColor,
  color: '#fff',
  fontFamily: 'Poppins',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: COLORS.primaryColor,
  },
});

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
}));

const ViewAllTypography = styled(Typography)({
  color: '#8e44ad',
  cursor: 'pointer',
});

const PackageCard = ({ packageDetails, selectedUnit, dropdownOptions }) => {
  const history = useHistory();

  const handleBookNowClick = (selectedUnit, packageDetails, dropdownOptions) => {
    const queryParams = new URLSearchParams({
      packageId: packageDetails.PackageId,
      packageName: packageDetails.PackageName,
      description: packageDetails.Description,
      packagePrice: packageDetails.PackagePrice,
      ageFrom: packageDetails.AgeFrom,
      ageTo: packageDetails.AgeTo,
      gender: packageDetails.Gender,
      level: packageDetails.Level,
      preRequisite: JSON.stringify(packageDetails.PreRequisite),
      selectedUnit: selectedUnit,
      dropdownOptions: JSON.stringify(dropdownOptions)
    }).toString();

    history.push(`/pkgdetails?${queryParams}`);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="div" style={{fontFamily: 'Poppins', color: COLORS.textColor}}>
          {packageDetails.PackageName}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{fontFamily: 'Poppins', color: COLORS.textColor}}>
          {packageDetails.Description}
        </Typography>
        <FeeTypography variant="body2" style={{fontFamily: 'Poppins'}}>
          Fee:         
        <Typography variant="body2" color="textSecondary" style={{fontFamily: 'Poppins', color: COLORS.textColor}}>
        Rs. {packageDetails.PackagePrice}
        </Typography>
        </FeeTypography>
        <BookButton variant="contained" onClick={() => handleBookNowClick(selectedUnit, packageDetails)}>
          Book now
        </BookButton>
      </CardContent>
    </StyledCard>
  );
};

const HealthCheckupPage = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedUnit = queryParams.get('selectedUnit');
  // const dropdownOptions = queryParams.get('dropdownOptions');

  useEffect(() => {
    const initializeData = async () => {
      await fetchmhclist(selectedUnit);
    };
    initializeData();
  }, [selectedUnit]);

  const fetchmhclist = async (city) => {
    try {
      const response = await axios.get(`http://localhost:1801/api/mhclist/`, { params: { city } });
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching MHC list:', error);
    }
  };

  const convertedArray = packages.map(pkg => ({
    AgeFrom: pkg["Age From"],
    AgeTo: pkg["Age To"],
    Description: pkg.Description,
    Gender: pkg.Gender,
    Level: pkg.Level,
    PackageId: pkg["Package Id"],
    PackageName: pkg["Package Name"],
    PackagePrice: pkg["Package Price"],
    PreRequisite: pkg["Pre Requisite"]
  }));

  const handleUnitChange = (unit) => {
    // setSelectedUnit(unit);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPackages = convertedArray.filter(pkg =>
    pkg.PackageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Header
          dropdownOptions={dropdownOptions}
          selectedUnit={selectedUnit}
          onUnitChange={handleUnitChange}
        />
        <CustomTextField
          variant="outlined"
          placeholder="Search for health checkups"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon style={{ color: COLORS.primaryColor }} />
              </InputAdornment>
            ),
          }}
        />
        <SectionHeader>
          <Typography variant="h5">Most popular</Typography>
        </SectionHeader>

        <Grid container spacing={2}>
          {filteredPackages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <PackageCard packageDetails={pkg} selectedUnit={selectedUnit} dropdownOptions={dropdownOptions}/>
            </Grid>
          ))}
        </Grid>
      </RootContainer>
    </ThemeProvider>
  );
};

export default HealthCheckupPage;
