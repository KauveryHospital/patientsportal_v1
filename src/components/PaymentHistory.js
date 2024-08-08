import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';

const YourComponent = ({ records, handleOpen }) => {
    const [history, setHistory] = useState([]);
  return (
    <Box sx={{ padding: 0 }}>
        <Header />
        <Box display="flex" alignItems="center" mb={2}>
        {/* <ArrowBackIosIcon style={{ marginRight: '0.5rem', cursor: 'pointer' }} />
        <Typography variant="h6" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>My Account</Typography> */}
      <Button
        onClick={() => window.history.back()}
        sx={{ marginTop: '20px', marginBottom: 2, marginLeft: '50px', fontSize: '16px', color: COLORS.textColor, fontFamily: 'Poppins', textTransform: 'none' }}
      >
        &lt; Payment History
      </Button>
      </Box>
    <Box textAlign="center" my={4}>
      {history.length === 0 ? (
        <>
          <Typography variant="body2" fontFamily="Poppins" color={COLORS.textColor} gutterBottom>
            No payment history found
          </Typography>
          
        </>
      ) : (
        <List>
          {records.map((record, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <ListItemText
                primary={record.name}
                secondary={new Date(record.date).toLocaleString()}
                primaryTypographyProps={{ fontFamily: 'Poppins', fontWeight: 'bold' }}
                secondaryTypographyProps={{ fontFamily: 'Poppins' }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
    </Box>
  );
};

export default YourComponent;
