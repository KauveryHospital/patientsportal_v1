import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import styles from './header.styles'; // Assuming you have the styles imported here

const ConsultantHeader = ({ title = '', city = '', onCityPress, locationData = [], onGetValue }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDropDownSelect = (item) => {
    onGetValue(item);
    handleClose();
  };

  return (
    <div>
      <div style={styles.HeaderView1}>
        <span style={styles.ConsultHeader}>{title}</span>
      </div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {city}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={styles.selectCityTitle}>Select City</DialogTitle>
        <DialogContent>
          {locationData.map((item, index) => (
            <DialogContentText
              key={index}
              onClick={() => onDropDownSelect(item)}
              style={{ ...styles.dropDownListCard, cursor: 'pointer' }}
            >
              {item}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button style={styles.cancelBtn} onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConsultantHeader;
