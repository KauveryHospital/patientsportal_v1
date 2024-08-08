import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from './HeaderNew';
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants/Theme';
import { useTheme } from '@mui/material/styles';

const MyAccount = () => {
  const theme = useTheme();
  const history=useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(queryParams.get('data'));
  console.log('dataaaaa', data);

  return (
    <Container style={{ padding: 0, margin: 0, backgroundColor: '#fff', borderRadius: '8px' }}>
      <Header />
      <Box display="flex" alignItems="center" mb={2}>
        {/* <ArrowBackIosIcon style={{ marginRight: '0.5rem', cursor: 'pointer' }} />
        <Typography variant="h6" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>My Account</Typography> */}
      <Button
        onClick={() => window.history.back()}
        sx={{ marginTop: '20px', marginBottom: 2, marginLeft: '50px', fontSize: '16px', color: COLORS.textColor, fontFamily: 'Poppins', textTransform: 'none' }}
      >
        &lt; My Account
      </Button>
      </Box>
      
      <Card sx={{ backgroundColor: theme.palette.background.default, boxShadow: 'none', marginLeft: '50px' }}>
        <CardContent>
          <Box>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>{data.name}</Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom sx={{ fontFamily: 'Poppins', color:COLORS.placeholderColor }}>{data.gender}</Typography>
          {/* <Chip label="Sister" style={{ marginBottom: '1rem', backgroundColor: '#ffe6f2' }} /> */}
          </Box>
          <Grid container spacing={3} sx={{ mb: 2, mt: 2}}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>UHID:</Typography>
              <Typography variant="body1">-</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>ABHA ID:</Typography>
              <Typography variant="body1">-</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>DOB:</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>1999-01-07</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>Pincode:</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>{data.pincode}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>Mobile number:</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>{data.mn}</Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>WhatsApp number:</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>{data.whtap_no}</Typography>
            </Grid>
          </Grid>
          
          <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          // color="secondary"
          sx={{ textTransform: 'none', fontFamily: 'Poppins', borderColor: COLORS.primaryColor, color: COLORS.primaryColor, backgroundColor: '#FFFFFF', borderRadius: '5px' }} // Remove uppercase
        >
          Remove Profile
        </Button>
      </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MyAccount;
