import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './header.styles';
import Images from '../constants/Images';

export const HomeHeader = ({
  title = '',
  type = 0,
  city = '',
  onCityPress,
  onGetValue,
  locationData, 
  refRB,
}) => {
  // console.log(city, onCityPress, onGetValue);
 
  // const [locationData, setLocationData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

  // useEffect(() => {
  //   // Fetch location data from the API
  //   const fetchLocationData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:1800/api/unit'); 
  //       console.log(response.data.Result);
  //       setLocationData(response.data.Result);
  //       // Set default city if not already selected
  //       // if (!selectedCity && response.data.length > 0) {
  //       //   setSelectedCity(response.data[0]);
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching location data:', error);
  //     }
  //   };

  //   fetchLocationData();
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const onDropDownSelect = (item) => {
    // console.log(item);
    setSelectedCity(item);
    onGetValue(item);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  
  return (
    <div className="home-container" style={styles.homeContainer}>
      <div className="header-view-home" style={styles.container}>
        <div className="logo-view" style={styles.logoView}>
          <img
            src={Images.kauveryLogo}
            alt="Logo"
            className="top-logo"
            style={styles.topLogo}
          />
        </div>
        <div className="location-view" style={styles.locationView} onClick={toggleDropdown}>
          <img
            src={Images.OnVerifyLocation}
            alt="Location"
            className="location-icon"
            style={styles.locationIcon}
          />
          <span className="location-text" style={styles.locationText}>
            {selectedCity}
          </span>
          <span className="dropdown-arrow" style={styles.dropdownArrow}>▼</span>
          {dropdownVisible && (
            <div className="dropdown-menu" style={styles.dropdownMenu} ref={dropdownRef}>
              {locationData.map((item, index) => (
                <div
                  key={index}
                  style={
                    selectedCity === item.UnitName
                      ? styles.dropDownListCardActive
                      : styles.dropDownListCard2
                  }
                  onClick={() => onDropDownSelect(item.UnitName)}
                  className="drop-down-list-card"
                >
                  <span
                    style={
                      selectedCity === item.UnitName
                        ? styles.dropDownTitleActive
                        : styles.dropDownTitle2
                    }
                    className="drop-down-title"
                    title={item.UnitName}
                  >
                    {item.UnitName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="notification-view" style={styles.notificationView}>
          {/* Uncomment this if you have a notification icon */}
          {/* <img
            src={Images.notificationIcon}
            alt="Notification"
            className="notification-icon"
            style={styles.notificationIcon}
          /> */}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-container" style={styles.menuContainer}>
        <span className="menu-item" style={styles.menuItem}>Home</span>
        <span className="menu-item" style={styles.menuItem}>Consult</span>
        <span className="menu-item" style={styles.menuItem}>MHC</span>
        <span className="menu-item" style={styles.menuItem}>Records</span>
        <span className="menu-item" style={styles.menuItem}>Profile</span>
      </div>
    </div>
  );
};

export default HomeHeader;
