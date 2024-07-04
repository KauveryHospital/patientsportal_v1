import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Importing Modal
import { getPrivacyApi } from '../utils/apiCalls';
import { COLORS } from '../constants/Theme';
import { isResponseIsValid } from '../utils/helpers';
import { smallHtmlText } from '../utils/fontfamily';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      width: '80%',
      maxHeight: '80vh',
      overflowY: 'auto',
      zIndex: 9999, // Ensure modal appears above main content
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999, // Ensure modal overlay appears above main content
    },
  };

const PrivacyPolicy = ({ isOpen, onRequestClose }) => {
    const [termsData, setTermsData] = React.useState('');
    const [loading, setLoading] = React.useState(true);
  

  React.useEffect(() => {
    if (isOpen) {
      fetchTerms();
    }
  }, [isOpen]);

  const fetchTerms = async () => {
    setLoading(true);
    const response = await getPrivacyApi();
    if (isResponseIsValid(response)) {
      setTermsData(response.data.data);
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <iframe
            srcDoc={smallHtmlText('Poppins-Medium', 'ttf', termsData)}
            title="Terms and Conditions"
            style={{ width: '100%', height: '400px', border: 'none' }}
          />
        </div>
      )}
    </Modal>
  );
};

export default PrivacyPolicy;
