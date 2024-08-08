import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { COLORS } from '../constants/Theme';
import Header from './HeaderNew';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const theme = createTheme({
  spacing: 0,
  palette: {
    primary: {
      main: '#8e44ad',
    },
  },
});

const RootContainer = styled(Container)({
  padding: theme.spacing(0),
});

const BulletListItemText = styled(ListItemText)(({ theme }) => ({
    position: 'relative',
    paddingLeft: '1.5em',
    '&::before': {
      content: '"\\2022"', // Unicode character for bullet
      position: 'absolute',
      left: 0,
      color: COLORS.textColor, // Use the primary text color
      fontFamily: 'Poppins'
    //   fontWeight: 'bold',
    
    },
  }));

const SectionBox = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});
const RequisiteBox = styled(Box)({
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    marginTop: '20px',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    // backgroundColor: '#FFF7FB',
    backgroundColor: '#ffe6f2',
  });

const PriceBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: '1px solid #ddd',
  borderRadius: '8px',
  marginBottom: theme.spacing(2),
  marginTop: '20px',
  margin: '10px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});

const SelectButton = styled(Button)({
  marginTop: '20px',
  marginBottom: '30px',
  margin: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '500px',
  borderRadius: '50px',
  backgroundColor: COLORS.primaryColor,
  fontFamily: 'Poppins',
  color: '#fff',
  '&:hover': {
    backgroundColor: COLORS.primaryColor,
  },
});

const PkgDetailsPage = () => {
  const location = useLocation();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [tests, setTests] = useState([]);
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const packageDetails = {
    PackageId: queryParams.get('packageId'),
    PackageName: queryParams.get('packageName'),
    Description: queryParams.get('description'),
    PackagePrice: queryParams.get('packagePrice'),
    AgeFrom: queryParams.get('ageFrom'),
    AgeTo: queryParams.get('ageTo'),
    Gender: queryParams.get('gender'),
    Level: queryParams.get('level'),
    PreRequisite: JSON.parse(queryParams.get('preRequisite')),
    selectedUnit: queryParams.get('selectedUnit'),
    dropdownOptions: queryParams.get('dropdownOptions')
  };
  const selectedUnit = queryParams.get('selectedUnit');

  const pId = packageDetails && packageDetails? packageDetails.PackageId : '';

  useEffect(() => {
    const initializeData = async () => {
      await fetchmhctest(selectedUnit, pId);
    };
    initializeData();
  }, [selectedUnit, pId]);

  const fetchmhctest = async (city) => {
    try {
      const response = await axios.get(`http://localhost:1801/api/mhcpkgdetails/`, { params: { city, pId } });
    //   console.log(response.data);
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching MHC list:', error);
    }
  };

  const handleUnitChange = (unit) => {
    // setSelectedUnit(unit);
  };

  const bookanAppoinment = (packageId, packagePrice, selectedUnit) => {
    const queryParams = new URLSearchParams({
      packageId: packageId,
      packagePrice: packagePrice,
      selectedUnit: selectedUnit,
      dropdownOptions: packageDetails.dropdownOptions
    }).toString();

    history.push(`/mhcbooking?${queryParams}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
      <Header
          dropdownOptions={dropdownOptions}
          selectedUnit={packageDetails.selectedUnit}
          onUnitChange={handleUnitChange}
        />
        <Typography variant="h6" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', margin: '20px'}} gutterBottom>
          Select tests
        </Typography>
        <Typography variant="h5" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', margin: '20px'}} gutterBottom>
          {packageDetails.PackageName}
        </Typography>
        <Typography variant="subtitle1" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', margin: '20px'}} gutterBottom>
          Description
        </Typography>
        <Typography variant="subtitle1" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', margin: '20px'}} gutterBottom>
          {packageDetails.Description}
        </Typography>
        {/* <Typography variant="body1" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', margin: '20px'}} paragraph>
          Age From: {packageDetails.AgeFrom} | Age To: {packageDetails.AgeTo}
        </Typography>
        <Typography variant="body1" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', margin: '20px'}} paragraph>
          Gender: {packageDetails.Gender} | Level: {packageDetails.Level}
        </Typography> */}
        <SectionBox>
          <Typography variant="h6" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', marginLeft: '20px'}} gutterBottom>
            Tests Included
          </Typography>
          <List>
            {tests.map((prerequisite, index) => (
              <ListItem key={index}>
                <BulletListItemText primary={prerequisite} style={{color: COLORS.textColor, marginLeft: '20px'}}/>
              </ListItem>
            ))}
          </List>
        </SectionBox>
        <RequisiteBox>
        <Typography variant="h6" style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', marginLeft: '20px'}} gutterBottom>
            Prerequisites
          </Typography>
          <Typography variant="body2" style={{fontFamily: 'Poppins', color: COLORS.primaryColor, marginTop: '20px', margin: '20px'}} gutterBottom>
           <BulletListItemText primary={packageDetails.PreRequisite} style={{fontFamily: 'Poppins', color: COLORS.textColor, marginTop: '20px', margin: '20px'}}/>
          </Typography>
          </RequisiteBox>
        <PriceBox>
          <Typography variant="body2" style={{fontFamily: 'Poppins', color: COLORS.primaryColor, marginTop: '20px', margin: '20px'}}>
            Prices starting from <span style={{color: COLORS.textColor}}>Rs. {packageDetails.PackagePrice}</span>
          </Typography>
        </PriceBox>
        <SelectButton variant="contained" onClick={() => bookanAppoinment(packageDetails.PackageId, packageDetails.PackagePrice, selectedUnit)}>
          Select date and location
        </SelectButton>
      </RootContainer>
    </ThemeProvider>
  );
};

export default PkgDetailsPage;
