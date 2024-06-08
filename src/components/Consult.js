import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ConsultantHeader from '../components/ConsultantHeader';
import SegmentControl from '../components/SegmentControl/SegmentControl';
import SpecialtiesCard from '../components/SpecialitiesCard';
import DoctorCard from '../components/DoctorCard';
import CommonLoader from '../components/CommonLoader';
import Images from '../constants/Images';
import Headers from '../constants/Headers';
import { useHistory } from 'react-router-dom';
import styles from './consult.styles';
import { 
  doctorsListInConsultation, 
  nearbyUnits, 
  nearbyUnitsRegion, 
  specializationListWithUnitID 
} from '../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { useLocation } from 'react-router-dom';

const Consult = ({ navigation }) => {
  const flatListRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const { specialities } = location.state || {}; // Destructure the specialities from location.state

  console.log('Specialities received:', specialities);

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [locationLoader, setLocationLoader] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const [tabData, setTabData] = useState([]);
  const [unitID, setUnitID] = useState('');
  const [SpecialtiesData, setSpecialtiesData] = useState([]);
  const [DoctorsDetails, setDoctorsDetails] = useState([
    {
      id: '1',
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      location: 'New York, NY',
      rating: 4.5,
      image: 'path/to/doctor1.jpg',
      availability: 'Mon - Fri, 9am - 5pm',
    },
    {
      id: '2',
      name: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      location: 'Los Angeles, CA',
      rating: 4.7,
      image: 'path/to/doctor2.jpg',
      availability: 'Tue - Sat, 10am - 6pm',
    },
    {
      id: '3',
      name: 'Dr. Michael Johnson',
      specialty: 'Neurologist',
      location: 'Chicago, IL',
      rating: 4.9,
      image: 'path/to/doctor3.jpg',
      availability: 'Mon - Thu, 8am - 4pm',
    },
    {
      id: '4',
      name: 'Dr. Emily Davis',
      specialty: 'Pediatrician',
      location: 'Houston, TX',
      rating: 4.8,
      image: 'path/to/doctor4.jpg',
      availability: 'Wed - Sun, 9am - 5pm',
    },
    {
      id: '5',
      name: 'Dr. William Brown',
      specialty: 'Orthopedic Surgeon',
      location: 'Phoenix, AZ',
      rating: 4.6,
      image: 'path/to/doctor5.jpg',
      availability: 'Mon - Fri, 10am - 6pm',
    }
  ]);

  const SpecialtiesImages = [Images.generalMedicine, Images.urology, Images.ent, Images.dermatology];

  const [doctorListCount, setDoctorListCount] = useState(0);
  const [specialityCount, setSpecialityCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [initialLoader, setInitialLoader] = useState(false);
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentRegionSelected1 = 'Trichy - Cantonment';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:1800/api/specialities?city=${currentRegionSelected1}`);
  //       console.log(response.data);
  //       setSpecialtiesData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //       // Handle error
  //     }
  //   };

  //   fetchData();
  // }, [currentRegionSelected1]);

  const scrollToBeginning = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  const onSelect = (item, index) => {
    const updatedTabData = tabData.map((it, ind) => ({
      ...it,
      is_focused: ind === index,
    }));
    setTabData(updatedTabData);
    setUnitID(item._id.$oid);
    combinedApiCall(item._id.$oid, false);
  };

  const nearbyUnitsWithRegion = async (currentCoordinates = 0, CurrentRegion, initialLoading) => {
    if (initialLoading) {
      setInitialLoader(true);
      setLoader(false);
    }
    try {
      const response = await nearbyUnitsRegion(CurrentRegion);
      if (isResponseIsValid(response)) {
        const currentRegion = response.data.current_region || response.data.regions[0];
        setCity(currentRegion);
        setLocations(response.data.regions);
        const unit = response.data.data.find(it => it.is_focused);
        setTabData(response.data.data);
        if (unit) {
          setUnitID(unit._id.$oid);
          combinedApiCall(unit._id.$oid, true);
        }
      } else {
        setLoader(false);
        snackBar(response?.data?.message || Headers.apiError);
      }
    } catch (err) {
      setLoader(false);
      snackBar(Headers.apiError);
    }
  };

  const nearbyUnitsWithoutCoordinates = async (currentCoordinates = 0, CurrentRegion, initialLoading) => {
    if (initialLoading) {
      setInitialLoader(true);
      setLoader(false);
    }
    try {
      const response = await nearbyUnits(currentCoordinates, CurrentRegion);
      if (isResponseIsValid(response)) {
        const currentRegion = response.data.current_region || response.data.regions[0];
        setCity(currentRegion);
        setLocations(response.data.regions);
        const unit = response.data.data.find(it => it.is_focused);
        setTabData(response.data.data);
        if (unit) {
          setUnitID(unit._id.$oid);
          combinedApiCall(unit._id.$oid, true);
        }
      } else {
        setLoader(false);
        snackBar(response?.data?.message || Headers.apiError);
      }
    } catch (err) {
      setLoader(false);
      snackBar(Headers.apiError);
    }
  };

  const combinedApiCall = async (unitID, initialLoading) => {
    setLoader(true);
    try {
      const [specialtiesRes, doctorsRes] = await Promise.all([
        specializationListWithUnitID(unitID),
        doctorsListInConsultation(unitID),
      ]);

      if (isResponseIsValid(specialtiesRes) && isResponseIsValid(doctorsRes)) {
        setSpecialtiesData(specialtiesRes.data.specialties);
        setDoctorsDetails(doctorsRes.data.doctors);
        setDoctorListCount(doctorsRes.data.doctor_count);
        setSpecialityCount(specialtiesRes.data.specialty_count);
      } else {
        if (!isResponseIsValid(specialtiesRes)) {
          snackBar(specialtiesRes.data.message || Headers.apiError);
        }
        if (!isResponseIsValid(doctorsRes)) {
          snackBar(doctorsRes.data.message || Headers.apiError);
        }
      }
    } catch (err) {
      console.error(err);
      snackBar(Headers.apiError);
    } finally {
      setLoader(false);
      setInitialLoader(false);
    }
  };

  return (
    <div style={styles.mainContainer}>
      <ConsultantHeader navigation={navigation} />
      <div style={styles.homeContainer}>
        <SegmentControl
          isActive1={isActive1}
          setIsActive1={setIsActive1}
          isActive2={isActive2}
          setIsActive2={setIsActive2}
        />
        {initialLoader ? (
          <div style={styles.footerComponent}>
            <CommonLoader />
          </div>
        ) : (
          <>
            {isActive1 ? (
              <div style={styles.flatlistParentView}>
                {loader ? (
                  <div style={styles.footerComponent}>
                    <CommonLoader />
                  </div>
                ) : (
                  <div>
                    {specialities.length > 0 ? (
                      specialities.map((item, index) => (
                        <SpecialtiesCard
                          key={index}
                          title={item.department}
                          specialtiesImage={SpecialtiesImages[index % SpecialtiesImages.length]}
                          description={item.description}
                          specialityCardPress={() => {
                            // Handle specialty card press
                            history.push('/dlist');
                          }}
                        />
                      ))
                    ) : (
                      <div style={styles.footerComponent}>
                        <p>No Specialties Found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.DoctorFlatlistParentView}>
                {loader ? (
                  <div style={styles.footerComponent}>
                    <CommonLoader />
                  </div>
                ) : (
                  <div>
                    {DoctorsDetails.length > 0 ? (
                      DoctorsDetails.map((item) => (
                        <DoctorCard
                          key={item.id}
                          rawData={item}
                          specialtiesImage={SpecialtiesImages}
                          description={item.specialty}
                          onPress={() => {
                            // Handle specialty card press
                          }}
                        />
                      ))
                    ) : (
                      <div style={styles.footerComponent}>
                        <p>No Doctors Found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Consult;
