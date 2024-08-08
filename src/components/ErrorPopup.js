import React from 'react';
import { Modal, Box, Button, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommonButton from './CommonButton';
import { COLORS, FONTS } from '../constants/Theme';

const useStyles = makeStyles((theme) => ({
  container: {  
    width: 'calc(100vw - 35px)',
    backgroundColor: COLORS.whiteColor,
    borderRadius: 10,
    padding: theme.spacing(2),
  },
  UserDetailsSubViewText: {
    ...FONTS.paragraph,
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    color: COLORS.placeholderColor,
    marginBottom: theme.spacing(0.5),
  },
  BottomView: {
    height: 60,
    marginBottom: theme.spacing(3),
  },
  content: {
    padding: theme.spacing(2),
  },
  buttonStyle: {
    height: 60,
    width: 'calc(100vw - 75px)',
    borderRadius: 28,
    backgroundColor: COLORS.primaryColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing(2),
  },
  buttonTextStyle: {
    fontSize: 16,
    fontFamily: FONTS.SemiBold,
  },
}));

const ErrorPopup = ({
  isModalVisible,
  content,
  buttonPress,
  closeModal,
  buttonText = 'Okay',
}) => {
  const classes = useStyles();

  return (
    <Modal open={isModalVisible} onClose={closeModal} aria-labelledby="error-popup">
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Typography className={classes.UserDetailsSubViewText}>
            {content}
          </Typography>
        </Box>
        <Box className={classes.BottomView}>
          <CommonButton
            text={buttonText}
            customStyles={classes.buttonStyle}
            isLoading={false}
            onPress={buttonPress}
            disabled={false}
            customTextStyles={classes.buttonTextStyle}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorPopup;
