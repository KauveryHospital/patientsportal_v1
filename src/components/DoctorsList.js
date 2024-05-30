import React, { useState, useEffect } from 'react';
import styles from './Dlist.styles'; 
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const DoctorsList = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);

  const history=useHistory();

  const city = 'Chennai - Mylapore';
  const spid = '15646000000000';

  // Dummy data for doctors list (replace with actual data from API)
  const dummyDoctorsList = [
    { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology', description: 'Lorem ipsum dolor sit amet.' },
    { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology', description: 'Consectetur adipiscing elit.' },
    { id: 3, name: 'Dr. Mike Johnson', speciality: 'Orthopedics', description: 'Sed do eiusmod tempor incididunt.' },
  ];

  const fetchDoctors = async () => {
    // setLoading(true);
    // setError('');
    try {
      const response = await axios.get(`http://localhost:1800/api/doctors?city=${city}&spid=${spid}`);
      console.log(response.data);
      setDoctorsList(response.data);
    } catch (error) {
      // setError('Failed to fetch doctors. Please try again.');
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (city && spid) {
      fetchDoctors();
    }
  }, [city, spid]);

  const handleInputChange = (e) => {
    setTextInputValue(e.target.value);
  };

  const handleRequestClick = (doctor) => {
    console.log(doctor);
    history.push({
      pathname: '/ddetail',
      state: { doctor }
    });
  };

  const handleSearchDoctors = () => {
    // Perform search logic here (e.g., fetch doctors list based on input)
    // For demonstration, using dummy data
    setDoctorsList(dummyDoctorsList.filter(doctor =>
      doctor.name.toLowerCase().includes(textInputValue.toLowerCase())
    ));
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for doctors..."
          style={styles.input}
          value={textInputValue}
          onChange={handleInputChange}
        />
        <button
          style={{ ...styles.button, ...(textInputValue.trim() !== '' && styles.buttonHover) }}
          onClick={handleSearchDoctors}
        >
          Search
        </button>
      </div>

      <div style={styles.doctorsList}>
        <h2>Doctors List</h2>
        <div style={styles.cardsContainer}>
          {doctorsList.map(doctor => (
            <div key={doctor.doctorId} style={styles.doctorCard}>
              <img
                src={`https://via.placeholder.com/150?text=${doctor.name}`}
                alt={doctor.doctorName}
                style={styles.doctorImage}
              />
              <div style={styles.doctorDetails}>
                <h3>{doctor.doctorName}</h3>
                <p>{doctor.specialtyName}</p>
                <p>This doctor is currently not available for consultations. Please request to make an appointment.</p>
                <button
                  onClick={() => handleRequestClick(doctor)}
                  style={styles.button}
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
