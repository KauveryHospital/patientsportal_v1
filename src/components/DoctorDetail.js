import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Ddetail.styles';
import RequestForm from './SelectPatient';

const DoctorDetail = () => {
  const location = useLocation();
//   const doctor = location.state?.doctor;
const [isModalOpen, setIsModalOpen] = useState(false);

const handleRequestNowClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here (e.g., API call)
    setIsModalOpen(false);
  };

const doctor=[{description: null, designation: ['MBBS', 'MD', 'DM'], doctorId: "35613000004836", doctorName: "Dr. Vijay  Shekar P", expertin: null, languages: null,rbooking: "False",specialtyName: "Cardiology"}];

 console.log('ksejgbfudh',doctor);

  return (
    <div style={styles.container}>
      <div style={styles.doctorDetailCard}>
        <img
          src={`https://via.placeholder.com/150?text=${doctor.doctorName}`}
          alt={doctor.doctorName}
          style={styles.doctorImage}
        />
        <div style={styles.doctorDetails}>
          <h3>{doctor.doctorName}</h3>
          <p>Designation: {doctor.designation}</p>
          <p>Specialty: {doctor.specialtyName}</p>
        </div>
      </div>
      <div style={styles.mapContainer}>
        <h4>Hospital Location:</h4>
        <a href={`https://www.google.com/maps?q=${doctor.hospitalLocation}`} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      </div>
      <div style={styles.bookingInfo}>
        <p>For booking, a ticket will be created. Please click on the "Request Now" button to proceed.</p>
        <button onClick={handleRequestNowClick} style={styles.button}>
          Request Now
        </button>
        <RequestForm
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />
      </div>
    </div>
  );
};

export default DoctorDetail;
