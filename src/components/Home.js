import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BookingCard } from '../components/BookingCard';
import CommonLoader from '../components/CommonLoader';
import { EventCard } from '../components/EventCard';
import { HomeHeader } from '../components/HomeHeader';
import SpecialtiesCard from '../components/SpecialitiesCard';
import styles from './home.styles';
import Images from '../constants/Images';
import {
    profileImageSaved,
    unitNameData,
    currentRegion
} from '../store/actions/homeActions';
import {
    addFeedback,
    getFeedbackList,
    getProfileApi,
    nearbyUnits,
    nearbyUnitsCoordinates,
    nearbyUnitsRegion,
    nearbyUnitsWithoutRegion,
    reScheduleBooking,
    specializationList,
    specializationList1,
    upcomingEvents,
    updateBooking,
} from '../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import { AppContext } from '../../navigation/AppContext';
// import ErrorPopup from '../../components/modal/ErrorPopup';

const Home = ({ navigation }) => {
    //   const dispatch = useDispatch();
    const ref = useRef(null);
    const history = useHistory();

      // const currentRegionSelected1 = useSelector(
      //   state => state?.homeReducer?.currentRegion,
      // );
      const currentRegionSelected1 = 'Trichy - Cantonment';

    const [newUser, setNewUser] = useState(true);
    const [currentRegionSelected, setCurrentRegionSelected] = useState(currentRegionSelected1);
    const [name, setName] = useState('');
    const [specialtiesList, setSpecialtiesList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [locationDenied, setLocationDenied] = useState(false);
    const [isRescheduled, setIsRescheduled] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [unitID, setUnitID] = useState('');
    const [doctor_id, setDoctor_id] = useState('');
    const [specialityCount, setSpecialityCount] = useState(0);
    const [locations, setLocations] = useState([]);
    const [city, setCity] = useState('');
    const [unitId, setUnitId] = useState('');

    console.log('jhsgdaufusy',currentRegionSelected);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:1800/api/specialities?city=${currentRegionSelected}`);
          console.log(response.data);
          setSpecialtiesList(response.data);
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };
  
      fetchData();
    }, [currentRegionSelected]);
  
    useEffect(() => {
      // Fetch location data from the API
      const fetchLocationData = async () => {
        try {
          const response = await axios.get('http://localhost:1800/api/unit'); 
          console.log(response.data.Result);
          setLocations(response.data.Result);
          // Set default city if not already selected
          // if (!selectedCity && response.data.length > 0) {
          //   setSelectedCity(response.data[0]);
          // }
        } catch (error) {
          console.error('Error fetching location data:', error);
        }
      };
  
      fetchLocationData();
    }, []);

    const [eventData, setEventData] = useState([]);
    const [image, setImage] = useState([Images.appointment]);

    const onCityPress = () => {
        // Handle city press
    };

    const specialtiesListApiCall = async (
        unitId,
        currentPage,
        pageSize,
        region,                
      ) => {
        setLoader(true);
        console.log(
          unitId,
          currentPage,
          pageSize,
          region,
          'UNIT SWITCH SPECIAL REQUEST'
        );
        try {
          const response = await specializationList1(
            unitId,
            currentPage,
            pageSize,
            region
          );
          console.log(response, 'response');
          if (isResponseIsValid(response)) {
            console.log(response.data.data, 'response');
            setSpecialityCount(response.data.total_count);
            setSpecialtiesList(response.data.data);
            let unit = response.data.data.find((it) => it.is_focused === true);
            console.log('DDD123', JSON.stringify(response.data));
            // dispatch(customerCareNumberData(unit.customer_care))
      
            setTimeout(() => {
              setLoader(false);
            }, 200);
          } else {
            setLoader(false);
            setTimeout(() => {
              if (response?.data) {
                snackBar(response?.data);
              } else {
                snackBar(Headers.apiError);
              }
            }, 400);
          }
        } catch (err) {
          setLoader(false);
          setTimeout(() => {
            snackBar(Headers.apiError);
          }, 400);
        }
      };
      

    const handleRefresh = () => {
        // Handle refresh logic
    };

    const bookingRenderItem = ({ item }) => (
        <BookingCard
            title={item.title}
            bookingImage={item.bookingImage}
            description={item.description}
            onPressCard={item.onPressCard}
        />
    );

    const eventsRenderItem = ({ item }) => (
        <EventCard event={item} />
    );

    const specialtiesRenderItem = ({ item }) => (
        <SpecialtiesCard specialty={item} />
    );

    const handleCitySelect = (city) => {
      setCurrentRegionSelected(city);
      // Perform any additional actions with the selected city
    };

    const ItemSeparatorComponent = () => <div style={{ width: 16 }} />;
    const ItemSeparatorComponent2 = () => <div style={{ height: 16 }} />;
    const ItemSeparatorComponent3 = () => <div style={{ height: 16 }} />;

    return (
        <div style={styles.homeContainer}>
            <HomeHeader
        city={currentRegionSelected}
        onCityPress={() => ref.current.open()}
        refRB={ref}
        locationData={locations}
        onGetValue={handleCitySelect}
        closeModal={() => {
          ref.current.close();
        }}
      />
            <div
                ref={ref}
            // style="scroll-view"
            // style={{ flexGrow: 1, overflowY: 'scroll' }}
            >
                <CommonLoader loading={loader} />
                <div style={styles.topView}>
                    <div style={styles.nameView} >
                        <span style={styles.heyText}>Hey </span>
                        <button style={styles.nameDropDown} >
                            <span style={styles.nameText}>{name}</span>
                        </button>
                    </div>
                    <span style={styles.welcomeText}>
                        {'What can we do for you today?'}
                    </span>
                </div>
                <div style={styles.flatlistParentView}>
                    <span style={styles.listTitle}>Bookings</span>
                    <div
                        style={styles.flatlist}
                    //  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                        <BookingCard
                            title={'Doctors appointments'}
                            bookingImage={Images.appointment}
                            description={'Book for In-hospital or Video Consultation'}
                            onPressCard={() => {
                              console.log('hhhiiijjhuuiio');
                              history.push({
                                pathname: '/consult',
                                state: { specialities: specialtiesList }
                              });
                            }}
                        />
                        <BookingCard
                            title={'Health checkups'}
                            bookingImage={Images.healthCheckup}
                            description={'Book online to avail offers.'}
                            onPressCard={() => {
                                // navigation.navigate('MHCStackScreen');
                            }}
                        />
                    </div>
                </div>

                {eventData.length > 0 && (
                    <div style={styles.flatlistParentView}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={styles.listTitle}>Upcoming events</span>
                        </div>
                        <div style={styles.flatlist} >
                            {eventData.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                )}
                {/* <div style={styles.flatlistParentView}> */}
                {/* <div style={styles.flatlistParentView}> */}
                    <span style={styles.listTitle}>Specialities</span>
                    <div style={styles.flatlist}>
              {specialtiesList.map((item, index) => (
                <div key={index} >
                  <SpecialtiesCard
                    title={item.specialityName}
                    specialtiesImage={item.specialtiesImage}
                    description={item.specialityDescription}
                    specialityCardPress={() => {
                      // Handle specialty card press
                    }}
                  />
                </div>
              ))}
              
            </div>
            </div>
         </div>
    );
};

export default Home;
