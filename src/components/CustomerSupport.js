import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, Chip, ListItem, ListItemIcon } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from './HeaderNew';
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants/Theme';
import { useTheme } from '@mui/material/styles';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const CustomerSupport = () => {
    const theme = useTheme();

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
                    &lt; Customer Support
                </Button>
            </Box>

            <Card sx={{ backgroundColor: theme.palette.background.default, boxShadow: 'none', marginLeft: '50px' }}>
                <CardContent>
                    <Box>
                        <ListItem>
                            <ListItemIcon>
                                <SettingsPhoneIcon />
                            </ListItemIcon>
                            <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Reach out to us at 044 - 40006000</Typography>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon>
                        <WhatsAppIcon />
                      </ListItemIcon>
                            <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Connect Through WhatsApp</Typography>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                            <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Email us at info@kauveryhospital.com</Typography>
                        </ListItem>
                        {/* <Typography variant="body1" color="textSecondary" gutterBottom sx={{ fontFamily: 'Poppins', color:COLORS.placeholderColor }}>{data.gender}</Typography>
          {/* <Chip label="Sister" style={{ marginBottom: '1rem', backgroundColor: '#ffe6f2' }} /> */}
                    </Box>
                    {/* <Grid container spacing={3} sx={{ mb: 2, mt: 2}}>
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
      </Box> */}
                </CardContent>
            </Card>
        </Container>
    );
};

export default CustomerSupport;
