import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styles from './button.styles'; 

const CommonButton = ({ text, onPress, isLoading = false, disabled = false }) => {
  return (
    <Button
      style={styles.button} // Apply button styles
      disabled={isLoading || disabled}
      onClick={onPress}
    >
      {isLoading && <Spinner style={styles.spinner} animation="border" size="sm" />}
      <span style={styles.buttonText}>{text}</span>
    </Button>
  );
};

export default CommonButton;
