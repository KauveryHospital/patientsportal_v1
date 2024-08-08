import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBarFieldstyles'; // Adjust the path as needed
import Images from '../constants/Images'; // Adjust the path as needed

const SearchBarField = ({ title = '', value, onChange, onPress }) => {
  return (
    <div style={styles.container}>
      <div style={styles.textInputContainer}>
        <input
          type="text"
          placeholder={title}
          value={value}
          onChange={onChange}
          style={styles.input}
          onClick={onPress} // Updated to 'styles.input'
        />
      </div>
      <div style={styles.searchIconView} onClick={onPress}>
        <img
          src={Images.searchIcon}
          alt="search-icon"
          style={styles.searchIcon}
        />
      </div>
    </div>
  );
};

SearchBarField.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func,
};

export default SearchBarField;
