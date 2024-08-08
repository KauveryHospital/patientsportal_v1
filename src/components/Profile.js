import React, {useContext, useEffect, useState} from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, Card, Modal, Button, CardContent, Avatar, Grid, List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import { AccountCircle, FamilyRestroom, ConfirmationNumber, Payment, SupportAgent, Business, PrivacyTip, Gavel, ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';
import { useHistory } from 'react-router-dom';
import {getProfileApi, logoutApi} from '../utils/apiCalls';
import {isResponseIsValid} from '../utils/helpers';
import {callNumber, removeItemValue, snackBar} from '../utils/helpers';
// import {CommonLoader, CommonModal} from '../../components';
// import {AppContext} from '../../navigation/AppContext';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutCall, profileImageSaved} from '../store/actions/authActions';
import Pusher from 'pusher-js';
import {AppContext} from '../navigation/AppContext';

const UserProfilePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    // const {Auth} = useContext(AppContext);

  const [skipPopup, setSkipPopup] = useState(false);
  const [whatsAppPopup, setWhatsAppPopup] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  // const ref = React.useRef(null);

  const pusher = new Pusher('', {
    cluster: '',
    // other options
  });

  const customerCareNumber = useSelector(
    // Patient details
    state => state?.bookingReducer?.customerCareNumber,
  );

  const customerCareCallNo = useSelector(
    // Customer Care call number for dialing
    state => state?.bookingReducer?.customerCareCallNo,
  );


  console.log(customerCareNumber,customerCareCallNo, 'customerCareCallNo');

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('React useFocusEffect');
  //     return () => {};
  //   }, []),
  // );
  useEffect(() => {
    // DeviceEventEmitter.addListener('reloadProfile', event => {
    //   onCallProfileApi();

    // });
    onCallProfileApi();
    // return () => {
    //   DeviceEventEmitter.removeAllListeners('reloadProfile');
    // };
  }, []);

  const onCallProfileApi = async () => {
    const response = await getProfileApi();
    console.log('Whastapp link', response.data);
    if (isResponseIsValid(response)) {
      setData(response.data);
            setLoading(false);
    }
  };
  // const onPhoneCall = phone => {
  //   callNumber(phone);
  // };

  const onWhatsAppCall = whatsapp => {
    setWhatsAppLink(whatsapp);
    setTimeout(() => {
      setWhatsAppPopup(true);
    }, 200);
    // Linking.openURL(whatsapp);
  };
  // const onEmailCall = email => {
  //   Linking.openURL(`mailto:${email}?subject=&body=`);
  // };
  const onPressPaymentHistory = () => {
    history.push('PaymentHistory');
  };
  const onPressYes = () => {
    setSkipPopup(false);
    setTimeout(() => {
      onLogoutApiCall();
      // removeItemValue('User_Data');
      // dispatch(LogoutCall());
      // Auth();
    }, 500);
  };

  const onLogoutApiCall = async () => {
    setLoader(true);
    try {
      const response = await logoutApi();
      console.log(response, 'response');
      if (isResponseIsValid(response)) {
        setLoader(false);
      const pusherUnsubscribe = await pusher.unsubscribe({channelName: 'Kauvery'}).then(
          (res) => {
            console.log('unsubscribed',res);
          }
        ).catch((err) => {
          console.log(err);
        })
        setTimeout(() => {
          removeItemValue('User_Data');
          dispatch(LogoutCall());
          // Auth();
        }, 200);
      } else {
        setLoader(false);
        setTimeout(() => {
          if (response?.data?.message) {
            // snackBar(JSON.stringify(response?.data?.message));
          } else {
            snackBar(Headers.apiError);
          }
        }, 400);
      }
    } catch (err) {
      setLoader(false);
      setTimeout(() => {
        snackBar(JSON.stringify(err));
      }, 400);
    }
  };


  // const onPressYesWhatsapp = () => {
  //   setWhatsAppPopup(false);
  //   setTimeout(() => {
  //     Linking.openURL(whatsAppLink);
  //   }, 500);
   
  // }

    const handleAccount = () => {        
        // history.push('./myaccount');
        const queryParams = new URLSearchParams({          
          data: JSON.stringify(data)
          // item: item,
        }).toString();
    
        history.push(`/myaccount?${queryParams}`);
    };

    const handleFamily = () => {
        // history.push('./managefamily');
        const queryParams = new URLSearchParams({          
          data: JSON.stringify(data)
          // item: item,
        }).toString();
    
        history.push(`/managefamily?${queryParams}`);
    };

    const handleTickets = () => {
        history.push('./tickets');
    };
    const handleSignout = () => {
        setOpen(true);
    };
    const handleNo = () => {
      setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    onLogoutApiCall();    
};

    return (
        <div>
          <Header />
    
          {/* Main Content */}
          <Container style={{ marginTop: '24px' }}>
            <Grid container spacing={3}>
              {/* User Info and Buttons in a Single Card */}
              <Grid item xs={12}>
                <Card style={{ backgroundColor: '#ffe6f2' }}>
                  <CardContent>
                    <Grid container spacing={3} alignItems="center">
                      {/* User Info */}
                      <Grid item xs={14} sm={3} lg={1.5} md={1}>
                        <Avatar style={{ width: '64px', height: '64px', marginRight: '8px' }}>S</Avatar>
                      </Grid>
                      <Grid >
                        <Typography variant="h6" style={{color: COLORS.textColor, fontFamily:'Poppins'}}>{data.name}</Typography>
                        <Typography variant="body2" style={{color: COLORS.placeholderColor, fontFamily:'Poppins'}}>{data.gender}</Typography>
                      </Grid>
                    </Grid>
    
                    {/* Buttons */}
                    <Grid container spacing={4} style={{ marginTop: '16px' }}>
                      <Grid item xs={12} md={2}>
                        <Card
                          style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                          onClick={() => handleAccount()}
                        >
                          <CardContent style={{ textAlign: 'center' }}>
                            <IconButton>
                              <AccountCircle style={{ color: '#58595B' }}/>
                            </IconButton>
                            <Typography style={{color: COLORS.textColor, fontFamily:'Poppins'}}>My account</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Card
                          style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                          onClick={() => handleFamily()}
                        >
                          <CardContent style={{ textAlign: 'center' }}>
                            <IconButton>
                              <FamilyRestroom style={{ color: '#58595B' }}/>
                            </IconButton>
                            <Typography style={{color: COLORS.textColor, fontFamily:'Poppins'}}>Manage family</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Card
                          style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                          onClick={() => handleTickets()}
                        >
                          <CardContent style={{ textAlign: 'center' }}>
                            <IconButton>
                              <ConfirmationNumber style={{ color: '#58595B' }}/>
                            </IconButton>
                            <Typography style={{color: COLORS.textColor, fontFamily:'Poppins'}}>Tickets</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
    
              {/* List Sections */}
              <Grid item xs={12}>
                <List>
                  <Card style={{marginBottom: '10px', border: 'none'}}>
                    <Typography variant="h7" style={{color: COLORS.textColor, fontFamily:'Poppins', marginLeft: '20px'}}>Payment</Typography>
                    <Link to="/paymenthistory" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem>
                      <ListItemIcon>
                        <Payment />
                      </ListItemIcon>
                      <ListItemText primary="Payment history" style={{color: COLORS.placeholderColor, fontFamily:'Poppins'}}/>
                    </ListItem>
                    </Link>
                  </Card>
                  <Divider />
                  <Card style={{marginBottom: '10px', border: 'none'}}>
                    <Typography variant="h7" style={{color: COLORS.textColor, fontFamily:'Poppins', marginLeft: '20px'}}>Support</Typography>
                    <Link to="/customersupport" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem>
                      <ListItemIcon>
                        <SupportAgent />
                      </ListItemIcon>
                      <ListItemText primary="Customer support" style={{color: COLORS.placeholderColor, fontFamily:'Poppins'}}/>
                    </ListItem>
                    </Link>
                  </Card>
                  <Divider />
                  <Card style={{marginBottom: '10px', border: 'none'}}>
                    <Typography variant="h7" style={{color: COLORS.textColor, fontFamily:'Poppins', marginLeft: '20px'}}>About</Typography>
                    <Link to="/aboutkauvery" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem>
                      <ListItemIcon>
                        <Business />
                      </ListItemIcon>
                      <ListItemText primary="About Kauvery" style={{color: COLORS.placeholderColor, fontFamily:'Poppins'}}/>
                    </ListItem>
                    </Link>
                  </Card>
                  <Divider />
                  <Card style={{marginBottom: '10px', border: 'none'}}>
                    <Typography variant="h7" style={{color: COLORS.textColor, fontFamily:'Poppins', marginLeft: '20px'}}>Terms and Policy</Typography>
                    <Link to="/privacypolicy" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem >
                      <ListItemIcon>
                        <PrivacyTip />
                      </ListItemIcon>
                      <ListItemText primary="Privacy policy" style={{color: COLORS.placeholderColor, fontFamily:'Poppins'}}/>
                    </ListItem>
                    </Link>
                    <Link to="/termsandconditions" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem>
                      <ListItemIcon>
                        <Gavel />
                      </ListItemIcon>
                      <ListItemText primary="Terms and conditions" style={{color: COLORS.placeholderColor, fontFamily:'Poppins'}}/>
                    </ListItem>
                    </Link>
                  </Card>
                  <Divider />
                  <Card style={{marginBottom: '10px', border: 'none'}}>
                    <ListItem onClick={() => handleSignout()}>
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText primary="Sign out" style={{color: COLORS.placeholderColor, fontFamily:'Poppins'}}/>
                    </ListItem>
                  </Card>
                </List>
              </Grid>
            </Grid>
          </Container>
           <Modal open={open} onClose={handleNo}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 0,
                    // display: 'flex',
                    // flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
                        
                        {/* <IconButton onClick={handleCloseDelete} sx={{ alignSelf: 'center', mt: 0, mb: 0, ml: 23, mt: 2, backgroundColor: 'red', justifyContent:'center' }}>
                            <CloseIcon />
                        </IconButton> */}
                        
                    </Box>
                    {/* <Typography variant="h6" sx={{ mt: 2, ml: 2, mt: 2, textAlign: 'center' }} fontFamily='Poppins' color={COLORS.textColor} gutterBottom></Typography> */}
                    {/* <Typography variant="body2" color={COLORS.textColor} fontSize='14px' fontFamily='Poppins'>Delete</Typography> */}
                    <Typography variant="body2" color={COLORS.textColor} fontSize='12px' sx={{ mt: 2, ml: 2, mt: 2, textAlign: 'center' }} fontFamily='Poppins'>Are you sure you want to sign out?</Typography>
                    {/* <StyledTextField
                        label="File Name"
                        value={rename_file}
                        // onChange={(e) => validateName(e.target.value)}
                        onChange={(e) => setRenameFile(e.target.value)}
                        variant="outlined"
                        fullWidth margin="normal"
                        required
                    /> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button variant="outlined"
                            sx={{
                                marginTop: '10px',
                                mb: 2,
                                ml: 2,
                                mr: 2,
                                borderRadius: '20px',
                                backgroundColor: COLORS.whiteColor,
                                borderColor: '#962067', // Assuming you want the border to match the primary color
                                color: COLORS.blackColor, // Text color
                                // fontSize: '16px', // Change to desired font size
                                fontFamily: 'Poppins', // Change to desired font weight
                                textTransform: 'none',
                                // boxShadow: '0px 2px 4px #962067',                                
                                '&:hover': {
                                    backgroundColor: '#962067',
                                    // color: '#939598',
                                    // borderColor: '#ffe6f2'
                                },
                            }}
                            onClick={handleNo}
                        >
                            No
                        </Button>
                        <Button variant="contained"
                            sx={{
                                marginTop: '10px',
                                mb: 2,
                                // ml: 2,
                                mr: 3,
                                borderRadius: '20px',
                                backgroundColor: '#962067',
                                borderColor: '#962067', // Assuming you want the border to match the primary color
                                color: COLORS.whiteColor, // Text color
                                // fontSize: '16px', // Change to desired font size
                                fontFamily: 'Poppins', // Change to desired font weight
                                textTransform: 'none',
                                boxShadow: '0px 2px 4px #962067',
                                '&:hover': {
                                    backgroundColor: '#962067',
                                    // color: '#939598',
                                    borderColor: '#ffe6f2'
                                },
                            }}
                            onClick={() => handleYes()}
                        >
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
      );
    };
    
    export default UserProfilePage;
