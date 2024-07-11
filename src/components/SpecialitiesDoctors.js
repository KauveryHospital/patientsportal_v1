// SpecialtiesList.js
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import styles from './Doctor.styles';
import Doctor from './Doctor';
import Images from '../constants/Images';
import Header from './HeaderNew';
import { COLORS, FONTS } from '../constants/Theme';

const specialties = [
  { name: 'Gastroenterology', description: 'For stomach problems.' },
  { name: 'Medical Oncology', description: 'Medical treatment of cancer.' },
  { name: 'Cardiology', description: 'Treatment of heart and blood vessels.' },
  { name: 'Vascular Surgery', description: 'Surgical treatment of the vascular system.' },
  { name: 'Liver Transplantation', description: 'Surgical transplant of liver.' },
  { name: 'Surgical Gastroenterology', description: 'For surgical problems of digestive system.' },
  // Add more specialties as needed
];

const SpecialtiesDoctor = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedSpecialties = showAll ? specialties : specialties.slice(0, 6);

  return (
    <div style={styles.container}>
        <Header />
        <h3 style={styles.h3}>Specialties</h3>
        <span
        style={styles.seeAllButton}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'See Less' : 'See All'}
      </span>
      <div style={styles.specialtiesContainer}>
        {displayedSpecialties.map((specialty, index) => (
          <div key={index} style={styles.specialtyItem}>
            <img src={Images.generalMedicine} alt={specialty.name} style={styles.specialtyIcon} />
            <div style={styles.specialtyContent}>
              <p style={{fontFamily: 'Poppins', fontWeight: 'bold', color: COLORS.textColor,}}>{specialty.name}</p>
              <p style={{fontFamily:'Poppins', fontSize: '1.2vw', color: COLORS.placeholderColor, marginTop: '0',}}>{specialty.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Doctor />
      <Box style={styles.footer}>
                <Typography variant="body2">
                    © 2024 Patient Appointment Booking. All rights reserved.
                </Typography>
            </Box>
    </div>
  );
};

export default SpecialtiesDoctor;
