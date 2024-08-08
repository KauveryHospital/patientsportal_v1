import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid, Button, Box } from '@mui/material';
import Header from './HeaderNew';
import { useTheme } from '@mui/material/styles';
import { COLORS } from '../constants/Theme';
import { useHistory, useLocation } from 'react-router-dom';
import {isResponseIsValid, snackBar} from '../utils/helpers';
import {
  accessProfileApi,
  deactivateSharedAPI,
  getProfileApi,
  sharedProfileApi,
} from '../utils/apiCalls';
import { currentProfileName, familyReloadData, profileInformation } from '../store/actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';

const ManageFamily = () => {
  const theme = useTheme();
  const history=useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState('1');
  const [allAccounts, setAllAccounts] = useState([]);
  const [sharedList, setSharedList] = useState([]);
  const [profileCreatedPopup, setProfileCreatedPopup] = useState(false);
  const [deactivateItem, setDeactivateItem] = useState({});
  const [deactivatePress, setDeactivatePress] = useState(false);
  const [deactivateSuccess, setDeactivateSuccess] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(queryParams.get('data'));
  console.log('dataaaaa', data);

  const removeMember = (account) => {
    const queryParams = new URLSearchParams({          
      data: JSON.stringify(account)
      // item: item,
    }).toString();
console.log('paramssssssssss', queryParams);
    history.push(`/removeprofile?${queryParams}`);
    // history.push('./removeprofile');
};

useEffect(() => {
  onCallApi();
},[]);

const handleAddMember = () => {
  dispatch(familyReloadData("1"));
  const queryParams = new URLSearchParams({          
    data: JSON.stringify(data)
    // item: item,
  }).toString();

  history.push(`/addmembernumber?${queryParams}`);
  // history.push('./addmembernumber');
};

const onCallApi = async () => {
  setLoading(true);
  const response = await accessProfileApi();
  if (isResponseIsValid(response)) {
    console.log('Response32112', response.data);
    setSharedList(response.data.data);
    onCallApi1();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
};

const onCallApi1 = async () => {
  setLoading(true);
  const response = await sharedProfileApi();
  if (isResponseIsValid(response)) {
    console.log('jshduis', response.data.data);
    setAllAccounts(response.data.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
};

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
      {allAccounts.map((account, index) => (
                <Grid item xs={12} md={10} key={index}>
                    <Card style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }} onClick={() => removeMember(account)}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '30px' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginRight: '30px' }}>
                                <Typography variant="h7" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>{account.name}</Typography>
                                <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>{account.gender}</Typography>
                            </CardContent>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginRight: '30px' }}>
                                <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>UHID: {account.uhid}</Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        alignSelf: 'flex-end',
                                        textTransform: 'none',
                                        fontFamily: 'Poppins',
                                        backgroundColor: '#ffe6f2',
                                        color: COLORS.primaryColor,
                                        borderColor: '#ffe6f2',
                                        '&:hover': {
                                            backgroundColor: '#ffe6f2',
                                            borderColor: '#ffe6f2' // Custom hover color for contained button
                                        }
                                    }} // Align button to the right and remove uppercase
                                >
                                    {account.relationship}
                                </Button>
                            </CardContent>
                            <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: COLORS.textColor }}>Ph: {account.mn}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
      </Grid>

      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={()=>handleAddMember()}
          // color="secondary"
          sx={{ textTransform: 'none', fontFamily: 'Poppins', backgroundColor: COLORS.primaryColor,
            '&:hover': {
              backgroundColor: COLORS.primaryColor, // Custom hover color for contained button
            }
           }} // Remove uppercase
        >
          + Add family member
        </Button>
      </Box>
    </Box>
  );
};

export default ManageFamily;
