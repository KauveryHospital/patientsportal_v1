import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation
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
  const history = useHistory(); // Get the history object from useHistory hook

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    // Navigate to another page based on the menu item clicked
    switch (menuItem) {
      case 'Home':
        history.push('/home');
        break;
      case 'Consult':
        history.push('/consult');
        break;
      case 'MHC':
        history.push('/mhc');
        break;
      case 'Records':
        history.push('/records');
        break;
      case 'Profile':
        history.push('/profile');
        break;
      default:
        break;
    }
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
            onClick={() => handleMenuItemClick(menuItem)} // Handle click to navigate
          >
            {menuItem}
            {activeMenuItem === menuItem && <div style={headerStyles.underline}></div>}
          </span>
        ))}
      </div>
      <div className="right-content" style={headerStyles.rightContent}>
        {/* Rest of the header content */}
      </div>
    </div>
  );
};

export default HomeHeader;
