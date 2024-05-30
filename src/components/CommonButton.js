import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Using Spinner for flexibility

const useStyles = (props) => ({
  button: {
    margin: 10, 
    textTransform: 'none',
    height: 45, 
    width: props.width ? props.width - 35 : 'auto', 
    borderRadius: 28,
    backgroundColor: props.primaryColor || 'primary', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    ...(props.disabled ? { opacity: 0.3 } : {}), 
    ...props.customStyles, 
  },
  buttonText: {
    fontSize: 16, 
    color: props.textColor || 'white', 
    ...props.customTextStyles, 
  },
  spinner: {
    marginRight: 10, 
    color: props.textColor || 'white', 
  },
});

export const CommonButton = ({
  text,
  onPress,
  isLoading = false,
  disabled = false,
  variant = 'primary', // Allow customization of Bootstrap variant
  size = 'md', // Allow customization of Bootstrap size
  width, // Allow dynamic width
  primaryColor,
  textColor,
  customStyles = {},
  customTextStyles = {},
}) => {
  const classes = useStyles({
    width,
    primaryColor,
    textColor,
    disabled,
    customStyles,
    customTextStyles,
  });

  return (
    <Button
      variant={variant}
      size={size}
      className={classes.button}
      disabled={isLoading || disabled}
      onClick={onPress}
    >
      {isLoading && <Spinner animation="border" size={24} className={classes.spinner} />}
      <span className={classes.buttonText}>{text}</span>
    </Button>
  );
};
