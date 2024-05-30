import React from 'react';
import PropTypes from 'prop-types';
import { FastImage } from 'react-fast-image'; // Update the import if you are using a different image library
import styles from './SearchBarFieldstyles'; // Adjust the path as needed
import Images from '../constants/Images'; // Adjust the path as needed

const SearchBarField = ({ title = '', onPress }) => {
  return (
    <div onClick={onPress} style={styles.container}>
      <div style={styles.textInputContainer}>
        <p style={styles.title} title={title}>{title}</p>
      </div>
      <div style={styles.searchIconView}>
        <FastImage
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
  onPress: PropTypes.func.isRequired,
};

export default SearchBarField;
