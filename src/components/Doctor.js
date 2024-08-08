// DoctorsList.js
import React, { useEffect, useState } from 'react';
import styles from './Doctor.styles';
import Images from '../constants/Images';
import { useHistory } from 'react-router-dom';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import PersonIcon from '@mui/icons-material/Person';
import { doctorDetails } from '../utils/apiCalls';
import { useSelector } from 'react-redux';

const DoctorsList = ({ doctors, selectedUnit, dropdownOptions, unitAddress, unitid }) => {
    const [showAll, setShowAll] = useState(false);
    const history = useHistory();
    const [dataList, setDataList] = useState({});

    const displayedDoctors = showAll ? doctors : doctors.slice(0, 6);
    // const selectedUnit = selectedUnit;

    const profile_information = useSelector(
        state => state?.homeReducer?.profile_info,
      );

    // useEffect(() => {
    //     onCallApi();
    //     onDoctorDetailEvent()
    //   }, []);
    // const onDoctorDetailEvent = () =>{
    //   let profile_info = profile_information;
    //   let property_input ={
    //     "Mobile number":profile_info.mobile_number,
    //     "Age":profile_info.age,
    //     "Gender":profile_info.gender,
    //     "Relationship":profile_info.relationship,
    //     "Is Primary User":profile_info.is_primary_user
    //   }
    // //   mixpanel.track(mixpanel_event.DOCTOR_DETAILS,property_input)
    // }
    //   const onCallApi = async () => {
    
    //     const response = await doctorDetails(id);
    //     if (isResponseIsValid(response)) {
    //       console.log('TREE', JSON.stringify(response.data));
    //       const rp = response.data.data;
    //       setDataList(rp);
    //     //   setReadMoreText(rp.description);
    //     //   setLoadingData(false);
    //     } else {
    //       if (response?.data?.message) {
    //         snackBar(response?.data?.message);
    
    //       } else {
    //         snackBar(Headers.apiError);
    //       }
    //     }
    //   };

    const handleSlots = (selectedUnit, item) => {
        // history.push({
        //     pathname: '/appointmentbook',
        //     state: { selectedUnit, item },
        //   });
        const queryParams = new URLSearchParams({
            selectedUnit: selectedUnit,
            item: JSON.stringify(item),
            dropdownOptions: dropdownOptions,
            unitAddress: unitAddress,
            unitid: unitid
            // item: item,
          }).toString();
      
          history.push(`/appointmentbook?${queryParams}`);
    };
    console.log('dctrrr',unitAddress);

    return (
        <div style={styles.container}>
            <h3 style={styles.h3}>Doctors</h3>
            <span
                style={styles.seeAllButton}
                onClick={() => setShowAll(!showAll)}
            >
                {showAll ? 'See Less' : 'See All'}
            </span>
            <div style={styles.doctorsContainer}>
                {displayedDoctors.map((doctor, index) => (
                    <div key={index} style={styles.doctorCard}>
                        <div key={index} style={styles.imageContainer}>
                        {doctor.photo ? (
                            <img src={doctor.photo} alt={doctor.name} style={styles.doctorImage} />
                        ) : (
                            <PersonIcon style={styles.doctorImage} htmlColor='#B0B0B0' />
                        )}
                        </div>
                        <div style={styles.doctorInfo}>
                            <div style={styles.doctorName}>{doctor.doctorName}</div>
                            <div style={styles.doctorSpecialty}>{doctor.specialtyName}</div>
                            <div style={styles.doctorLanguages}>{doctor.languages ? (
                            <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>
                                {Array.isArray(doctor.languages) ? doctor.languages.join(', ') : doctor.languages}
                            </p>) : (
                            <p style={{ fontFamily: 'Poppins', fontSize: '12px' }}>Tamil, English</p>
                        )}</div>
                            {/* <div style={styles.availableTimeHeading}>{doctor.rbooking}</div> */}
                            </div>
                            <button onClick={() => handleSlots(selectedUnit, doctor)} style={{
                                ...styles.actionButton,
                                backgroundColor: doctor.rbooking === 'False' ? '#962067' : '#ffd700'
                            }}>
                                {doctor.rbooking === 'False' ? 'Book' : 'Request'}
                            </button>
                            
                            </div>              
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
