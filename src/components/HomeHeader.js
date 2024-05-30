import React, { useState, useEffect, useRef } from 'react';
import generateMenuItemStyles from './header.styles';
import Images from '../constants/Images';

const HomeHeader = ({
  title = '',
  type = 0,
  city = '',
  onCityPress,
  onGetValue,
  locationData,
  refRB,
  name,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('Home');
  const headerStyles = generateMenuItemStyles(activeMenuItem);
  const dropdownRef = useRef(null);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

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
  }, []);

  const onDropDownSelect = (item) => {
    console.log('Selected item:', item); 
    setSelectedCity(item);
    onGetValue(item);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    console.log('Toggling dropdown:', !dropdownVisible); 
    setDropdownVisible(!dropdownVisible);
  };

  // console.log('Dropdown visible:', dropdownVisible); // Debugging log
  // console.log('Location data:', locationData); // Debugging log

  return (
    <div className="header-container" style={headerStyles.headerContainer}>
      <div className="logo-view" style={headerStyles.logoView}>
        <img
          src={Images.kauveryLogo}
          alt="Logo"
          className="top-logo"
          style={headerStyles.topLogo}
        />
      </div>
      <div className="menu-container" style={headerStyles.menuContainer}>
        {['Home', 'Consult', 'MHC', 'Records', 'Profile'].map(menuItem => (
          <span
            key={menuItem}
            className="menu-item"
            style={headerStyles.menuItem}
            onClick={() => handleMenuItemClick(menuItem)}
          >
            {menuItem}
            {activeMenuItem === menuItem && <div style={headerStyles.underline}></div>}
          </span>
        ))}
      </div>
      <div className="right-content" style={headerStyles.rightContent}>
        <div className="location-view" style={headerStyles.locationView} onClick={toggleDropdown} ref={dropdownRef}>
          <img
            src={Images.OnVerifyLocation}
            alt="Location"
            className="location-icon"
            style={headerStyles.locationIcon}
          />
          <span className="location-text" style={headerStyles.locationText}>
            {selectedCity}
          </span>
          <span className="dropdown-arrow" style={headerStyles.dropdownArrow}>▼</span>
          {dropdownVisible && (
            <div className="dropdown-menu" style={headerStyles.dropdownMenu}>
              {locationData.map((item, index) => (
                <div
                  key={index}
                  style={
                    selectedCity === item
                      ? headerStyles.dropDownListCardActive
                      : headerStyles.dropDownListCard2
                  }
                  onClick={() => onDropDownSelect(item)}
                  className="drop-down-list-card"
                >
                  <span
                    style={
                      selectedCity === item
                        ? headerStyles.dropDownTitleActive
                        : headerStyles.dropDownTitle2
                    }
                    className="drop-down-title"
                    title={item}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="greeting-container" style={headerStyles.greeting}>
          <div className="name-view" style={headerStyles.nameDropDown} onClick={onCityPress}>
            <span style={headerStyles.heyText}>Hey </span>
            <span style={headerStyles.nameText}>{name}</span>
            <span style={headerStyles.dropdownArrow}>▼</span>
          </div>
          <span style={headerStyles.welcomeText}>What can we do for you today?</span>
        </div>
        <div className="notification-view" style={headerStyles.notificationView}>
          <img
            src={Images.notificationIcon}
            alt="Notification"
            className="notification-icon"
            style={headerStyles.notificationIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
