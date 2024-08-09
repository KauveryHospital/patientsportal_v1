// SpecialtiesList.js
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import styles from './Doctor.styles';
import Doctor from './Doctor';
import Images from '../constants/Images';
import Header from './HeaderNew';
import { COLORS, FONTS } from '../constants/Theme';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useLocation } from 'react-router-dom';

const SpecialtiesDoctor = () => {
  const [showAll, setShowAll] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();
  const [token, setToken] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('Chennai - Mylapore');
  const [specialties, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showMoreSpecialties, setShowMoreSpecialties] = useState(false);
  const [showMoreDoctors, setShowMoreDoctors] = useState(false);
  const [spID, setSPID] = useState(10471000000018);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  // const selectedUnit = queryParams.get('selectedUnit');
  const unitAddres = queryParams.get('unitAddress');
  const unitid = queryParams.get('unitid');
  // const item = JSON.parse(queryParams.get('item'));
  // const data = JSON.parse(queryParams.get('data'));
  // const doctorSlot = JSON.parse(queryParams.get('doctorSlot'));
  const [unitAddress, setUnitAddress] = useState(unitAddres);

  const displayedSpecialties = showAll ? specialties : specialties.slice(0, 6);
  console.log(selectedUnit);
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

  const handleUnitChange = (unit) => {
    const selectedUnitName = unit;
    setSelectedUnit(selectedUnitName);
    sendSelectedUnitToAPI(unit);
    fetchDoctors(unit, spID);
    const selectedOption = dropdownOptions.find(option => option.UnitName === selectedUnitName);
    if (selectedOption) {
      setUnitAddress(selectedOption.Address);
      // console.log('adrrrr', unitAddress);
    } else {
      setUnitAddress('');
    }
  };
console.log('uniiii', selectedUnit);

  const handleSpecialtyClick = async (specialtyId, city1) => {
    console.log('Specialty clicked:', city1);


    const city = city1;
    const spid = specialtyId;
    // console.log('cityuuuuuuuuuuuuu', city);
    // console.log('idddddddddd', spID);
    try {
      const response = await axios.get(`http://localhost:1801/api/specialtydoctors/`, { params: { city, spid } });
      // Handle the response as needed
      console.log('Response from POST API:', response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error sending selected unit to API:', error);
    }


  };

  return (
    <div style={styles.container}>
      <Header
        dropdownOptions={dropdownOptions}
        selectedUnit={selectedUnit}
        onUnitChange={handleUnitChange}
      />
      <h3 style={styles.h3}>Specialties</h3>
      <span
        style={styles.seeAllButton}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'See Less' : 'See All'}
      </span>
      <div style={styles.specialtiesContainer}>
        {displayedSpecialties.map((specialty, index) => (
          <div
            key={index}
            style={styles.specialtyItem}
            onClick={() => handleSpecialtyClick(specialty.specialityId, selectedUnit)}
          >
            <img src={Images.generalMedicine} alt={specialty.name} style={styles.specialtyIcon} />
            <div style={styles.specialtyContent}>
              <p style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: COLORS.textColor, }}>{specialty.specialityName}</p>
              <p style={{ fontFamily: 'Poppins', fontSize: '1.2vw', color: COLORS.placeholderColor, marginTop: '0', }}>{specialty.specialityDescription}</p>
            </div>
          </div>
        ))}
      </div>

      <Doctor
        doctors={doctors}
        selectedUnit={selectedUnit}
        dropdownOptions={dropdownOptions}
        unitAddress={unitAddress}
        unitid={unitid}
      />
      <Box style={styles.footer}>
        <Typography variant="body2">
          © 2024 Patient Appointment Booking. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default SpecialtiesDoctor;
