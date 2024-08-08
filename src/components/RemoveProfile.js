import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Button, Box } from '@mui/material';
import Header from './HeaderNew';
import { useTheme } from '@mui/material/styles';
import { COLORS } from '../constants/Theme';
import { useLocation } from 'react-router-dom';

const ManageFamily = () => {
  const theme = useTheme();
  const location=useLocation();

  const queryParams = new URLSearchParams(location.search);
    // const item = queryParams.get('item');
    const data = JSON.parse(queryParams.get('data'));
    console.log('itemmmmm', data);

  return (
    <Box sx={{ padding: 0 }}>
      <Header />
      <Button
        onClick={() => window.history.back()}
        sx={{ marginTop: '20px', marginBottom: 2, marginLeft: '50px', color: COLORS.textColor, fontFamily: 'Poppins', textTransform: 'none' }}
      >
        &lt; Manage family profile
      </Button>
      <Card sx={{ backgroundColor: theme.palette.background.default, boxShadow: 'none', marginLeft: '50px' }}>
        <CardHeader
          avatar={<Avatar sx={{ fontFamily: 'Poppins' }}>A</Avatar>}
          title={<Typography sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>{data.name}</Typography>}
          subheader={<Typography sx={{ fontFamily: 'Poppins', color:COLORS.placeholderColor }}>{data.gender}</Typography>}
          sx={{ backgroundColor: '#FFFFFF', fontFamily: 'Poppins' }}
        />
        <CardContent sx={{ backgroundColor: theme.palette.background.default, boxShadow: 'none' }}>
          <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>
            Here you can find the list of profiles linked with your account.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4} style={{ marginTop: '2px' }} justifyContent='center'>
        <Grid xs={12} md={10}>
          <Card style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '30px' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginRight: '30px' }}>
                <Typography variant="h7" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Bharathi</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Female</Typography>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginRight: '30px' }}>
                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: COLORS.textColor}}>UHID: -</Typography>
                <Button
                  variant="outlined"
                  // color="primary"
                  size="small"
                  sx={{ alignSelf: 'flex-end', textTransform: 'none', fontFamily: 'Poppins', backgroundColor: '#ffe6f2', color: COLORS.primaryColor, borderColor: '#ffe6f2'}} // Align button to the right and remove uppercase
                >
                  Sister
                </Button>
              </CardContent>
              <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Ph: 9489937306</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          // color="secondary"
          sx={{ textTransform: 'none', fontFamily: 'Poppins', borderColor: COLORS.primaryColor, color: COLORS.primaryColor, backgroundColor: '#FFFFFF', borderRadius: '5px' }} // Remove uppercase
        >
          Remove Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ManageFamily;
