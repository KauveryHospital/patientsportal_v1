import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Typography, Box, Button } from '@mui/material';
import { smallHtmlText } from '../utils/fontfamily';
import { getPrivacyApi } from '../utils/apiCalls';
import { isResponseIsValid } from '../utils/helpers';
import Header from './HeaderNew';
import { COLORS } from '../constants/Theme';

const TermsAndConditionsPage = () => {
  const [termsData, setTermsData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    setLoading(true);
    const response = await getPrivacyApi();
    if (isResponseIsValid(response)) {
      setTermsData(response.data.data);
    }
    setLoading(false);
  };

  return (
    <Container style={{ margin: '0px', padding: '0px' }}>
        <Header />
        <Box display="flex" alignItems="center" mb={0}>
        {/* <ArrowBackIosIcon style={{ marginRight: '0.5rem', cursor: 'pointer' }} />
        <Typography variant="h6" sx={{ fontFamily: 'Poppins', color:COLORS.textColor }}>My Account</Typography> */}
      <Button
        onClick={() => window.history.back()}
        sx={{ marginTop: '20px', marginBottom: 2, marginLeft: '30px', fontSize: '16px', color: COLORS.textColor, fontFamily: 'Poppins', textTransform: 'none' }}
      >
        &lt; Privacy Policy
      </Button>
      </Box>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', marginLeft: '30px' }}>
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{ marginTop: '0px', backgroundColor: '#ffffff', borderRadius: '8px', maxHeight: '80vh', marginLeft: '30px', fontFamily: 'Poppins'}}
          dangerouslySetInnerHTML={{ __html: smallHtmlText('Poppins-Medium', 'ttf', termsData) }}
        />
      )}
    </Container>
  );
};

export default TermsAndConditionsPage;
