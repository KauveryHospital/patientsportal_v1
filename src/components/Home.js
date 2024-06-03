import React, { useEffect, useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import SpecialtiesCard from '../components/SpecialitiesCard';
import BookingCard from '../components/BookingCard';
import CommonLoader from '../components/CommonLoader';
import Images from '../constants/Images';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import styles from './home.styles';
import {getUserInformation} from '../utils/LocalStorage';
import moment from 'moment';
// Action imports
import {
    currentRegion,
} from '../store/actions/homeActions';
import {profileImageSaved, unitNameData} from '../store/actions/authActions';
import {
  customerCareCallNo,
  customerCareNumberData,
} from '../store/actions/bookingActions';
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
import {AppContext} from '../navigation/AppContext';

const Home = () => {

  const currentRegionSelected = useSelector(
    // current region
    state => state?.homeReducer?.currentRegion,
  );

  const [city, setCity] = useState(currentRegionSelected);
  const [unitId, setUnitId] = useState('');
  const [loader, setLoader] = useState(false);
  const [locations, setLocations] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cancelBookingDetails, setCancelBookingDetails] = useState({});
  const [payAtHos, setPayAtHos] = useState(0);
  const [specialtiesList, setSpecialtiesList] = useState([]);
  const [name, setName] = useState('');
  const [reasonList, setReasonList] = useState([]);
  const [specialityCount, setSpecialityCount] = useState(0);
  const dispatch = useDispatch();
  const bottomSheetRef = useRef();
  // const { Auth } = useContext(AppContext);
  const ref = React.useRef(null);
  const history=useHistory();

  const isResponseIsValid = (response) => {
    return response && response.status === 200;
  };

  const doctorDetails = useSelector(
    // Doctor details
    state => state?.bookingReducer?.doctorDetails,
  );

  const slotDetails = useSelector(
    // Slot details
    state => state?.bookingReducer?.slotDetails,
  );

  const slotStartTime = useSelector(
    // Slot Start time
    state => state?.bookingReducer?.slotStartTime,
  );

  const slotAddress = useSelector(
    // Slot address
    state => state?.bookingReducer?.slotAddress,
  );

  const nearbyUnitsWithoutCoordinates = async () => {
    setLoader(true);
    try {
      const response = await nearbyUnitsWithoutRegion();
      if (isResponseIsValid(response)) {
        const region = response.data.current_region || response.data.regions[0];
        setCity(region);
        dispatch(currentRegion(region));
        setLocations(response.data.regions);

        let unit = response.data.data.find(it => it.is_focused === true);
        dispatch(unitNameData(unit.name));
        dispatch(customerCareNumberData(unit.customer_care));
        dispatch(customerCareCallNo(unit.customer_care_number));
        setLoader(false);
      } else {
        setLoader(false);
        snackBar(response?.data || Headers.apiError);
      }
    } catch (err) {
      setLoader(false);
      snackBar(Headers.apiError);
    }
  };

  const nearbyUnitsWithRegion = async (region) => {
    try {
      const response = await nearbyUnitsRegion(region);
      if (isResponseIsValid(response)) {
        let unit = response.data.data.find(it => it.is_focused === true);
        dispatch(customerCareNumberData(unit.customer_care));
        dispatch(customerCareCallNo(unit.customer_care_number));
      } else {
        snackBar(response?.data || Headers.apiError);
      }
    } catch (err) {
      snackBar(Headers.apiError);
    }
  };

  const nearbyUnitsWithCoordinates = async (lat, long) => {
    setLoader(true);
    try {
      const response = await nearbyUnitsCoordinates(`${lat},${long}`);
      if (isResponseIsValid(response)) {
        setLocations(response.data.regions);
        setCity(response.data.current_region);
        dispatch(currentRegion(response.data.current_region));
        setUnitId(response.data.data[0]._id.$oid);
        setLoader(false);
      } else {
        setLoader(false);
        snackBar(response?.data || Headers.apiError);
      }
    } catch (err) {
      setLoader(false);
      snackBar(Headers.apiError);
    }
  };

  const GettingLocationAccess = async () => {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            nearbyUnitsWithCoordinates(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          error => console.log('Error occurred while fetching location: ', error.message),
          { enableHighAccuracy: true, timeout: 20000 }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    } catch (err) {
      console.warn(err);
      alert('Something went wrong while accessing location.');
    }
  };

  const upcomingEventsApiCall = async () => {
    setLoader(true);
    try {
      const response = await upcomingEvents();
      if (isResponseIsValid(response)) {
        setEventData(response.data.data);
        setLoader(false);
      } else {
        setLoader(false);
        snackBar(JSON.stringify(response.data));
      }
    } catch (err) {
      setLoader(false);
      snackBar(JSON.stringify(err));
    }
  };

  const updateUpcomingEventsApiCall = async () => {
    try {
      const response = await upcomingEvents();
      if (isResponseIsValid(response)) {
        setEventData(response.data.data);
      } else {
        snackBar(JSON.stringify(response.data));
      }
    } catch (err) {
      snackBar(JSON.stringify(err));
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // pusherCallAPI();
    getFeedbackListApiCall();
    onCallProfileApi();
    upcomingEventsApiCall();
    specialtiesListApiCall(unitId, 1, 4, city);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  // const pusherCallAPI = async () => {
  //   try {
  //     await pusher.init({
  //       apiKey: '93b0b6d8756ade3792b8',
  //       cluster: 'ap2',
  //     });

  //     await pusher.subscribe({
  //       channelName: 'Kauvery',
  //       onEvent: (event) => {
  //         if (event.eventName === 'upcoming-events') {
  //           let test = JSON.parse(event.data);
  //           getUserInformation('User_Data').then(res => {
  //             let json = JSON.parse(res);
  //             test.user_id.map(e => {
  //               if (e === json.app_user_id) {
  //                 updateUpcomingEventsApiCall();
  //               }
  //             });
  //           }).catch(err => {});
  //         }
  //       },
  //     });

  //     await pusher.connect();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    nearbyUnitsWithoutCoordinates();
    GettingLocationAccess();
    // pusherCallAPI();
    getFeedbackListApiCall();
    onCallProfileApi();
    upcomingEventsApiCall();

  //   DeviceEventEmitter.addListener('locationHomeReload', event => {
  //     specialtiesListApiCall(unitId, 1, 4, event.location);
  //   });
  //   DeviceEventEmitter.addListener('reScheduleData', event => {
  //     if (event.is_reschedule === 1) {
  //       setTimeout(() => {
  //         setIsRescheduled(true);
  //       }, 500);
  //     }
  //     updateUpcomingEventsApiCall();
  //   });
  //   DeviceEventEmitter.addListener('Logout_action', () => {
  //     setTimeout(() => {
  //       Auth();
  //       snackBar('Oops! You have been logged out. Please sign-in again');
  //     }, 1200);
  //   });
  //   DeviceEventEmitter.addListener('checkoutData', event => {
  //     updateUpcomingEventsApiCall();
  //     setTimeout(() => {
  //       if (event.item) {
  //         switch(event.item.status) {
  //           case 'approved':
  //             setBookingConfirmedPopup(true);
  //             break;
  //           case 'pending':
  //             if (event.item.pay_at_hospital === 0 && event.item.payment_status === 'success') {
  //               setPendingConfirmedPopup(true);
  //             } else if (event.item.pay_at_hospital === 1) {
  //               setPayAtHosPendingConfirmedPopup(true);
  //             }
  //             break;
  //           case 'failed':
  //             if (event.item.payment_status === 'failed' && event.item.pay_at_hospital === 0) {
  //               setFailedConfirmedPopup(true);
  //             } else if (event.item.payment_status === 'success') {
  //               setFailedConfirmedPopupBooking(true);
  //             } else if (event.item.pay_at_hospital === 1) {
  //               setFailedConfirmedPopupRequest(true);
  //             }
  //             break;
  //           case 'occupied':
  //             setOccupiedConfirmedPopup(true);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     }, 500);
  //   });

  //   DeviceEventEmitter.addListener('webHookData', event => {
  //     updateUpcomingEventsApiCall();
  //     if (event.isShowPopup && event.item === 'pending') {
  //       setTimeout(() => {
  //         setWebHookErrorPopup(true);
  //       }, 500);
  //     }
  //   });

  //   DeviceEventEmitter.addListener('feedbackPopup', event => {
  //     updateUpcomingEventsApiCall();
  //     if (event.isShowPopup) {
  //       setTimeout(() => {
  //         setFeedBackPopup(true);
  //       }, 500);
  //     }
  //   });

  //   DeviceEventEmitter.addListener('requestNowData', event => {
  //     if (event.isShowPopup && event.item.message === 'success') {
  //       setTimeout(() => {
  //         setRequestId(event.item.request_id);
  //         setRequestPopup(true);
  //       }, 500);
  //     }
  //   });

  //   DeviceEventEmitter.addListener('cancelBookingData', event => {
  //     updateUpcomingEventsApiCall();
  //     if (event.isShowPopup) {
  //       setCancelBookingDetails(event.item);
  //       setPayAtHos(event.pay_at_hos);
  //       setTimeout(() => {
  //         setCancelBookingPopup(true);
  //       }, 1500);
  //     }
  //   });

  //   return () => {
  //     DeviceEventEmitter.removeAllListeners('checkoutData');
  //     DeviceEventEmitter.removeAllListeners('feedbackPopup');
  //     DeviceEventEmitter.removeAllListeners('requestNowData');
  //     DeviceEventEmitter.removeAllListeners('reScheduleData');
  //     DeviceEventEmitter.removeAllListeners('cancelBookingData');
  //     DeviceEventEmitter.removeAllListeners('locationHomeReload');
  //     DeviceEventEmitter.removeAllListeners('webHookData');
  //   };
  }, []);

  useEffect(() => {
    specialtiesListApiCall(unitId, 1, 4, city);
  }, [city]);

  const onCityPress = () => {
    bottomSheetRef.current.open();
  };

  const handleCityChange = (region) => {
    setCity(region);
    specialtiesListApiCall(unitId, 1, 4, region);
  };

  const formattedDate = moment(slotDetails?.slot_date).format('DD/MM/YYYY');
  const formattedTime = moment(slotStartTime, 'HH:mm:ss').format('hh:mm A');

  const getFeedbackListApiCall = async () => {
    try {
      const response = await getFeedbackList();
      if (isResponseIsValid(response)) {
        console.log(response.data.data, 'PAYMENT LIST');
        setReasonList(response.data?.data);
      } else {
        setTimeout(() => {
          if (response?.data) {
            snackBar(response?.data);
          } else {
            snackBar(Headers.apiError);
          }
        }, 400);
      }
    } catch (err) {
      setTimeout(() => {
        snackBar(Headers.apiError);
      }, 400);
    }
  };

  const onCallProfileApi = async () => {
    const response = await getProfileApi();
    if (isResponseIsValid(response)) {
      dispatch(profileImageSaved(response.data.photo));
      setName(response.data.name);
    }
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
      'UNIT SWITCH SPECIAL REQUEST',
    );
    try {
      const response = await specializationList1(
        unitId,
        currentPage,
        pageSize,
        region,
      );
      console.log(response, 'response');
      if (isResponseIsValid(response)) {
        console.log(response.data.data, 'response');
        setSpecialityCount(response.data.total_count);
        setSpecialtiesList(response.data.data);
        let unit = response.data.data.find(it => it.is_focused === true);
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

  const handleCitySelect = () => {
    // Open the bottom sheet when the text is clicked
    bottomSheetRef.current.open();
  };

    return (
        <div style={styles.homeContainer}>
            <HomeHeader
                city={currentRegionSelected}
                onCityPress={() => ref.current.open()}
                refRB={ref}
                locationData={locations}
                onGetValue={handleCitySelect}
                closeModal={() => ref.current.close()}
            />
            <div ref={ref}>
                <CommonLoader loading={loader} />
                <div style={styles.topView}>
                    <div style={styles.nameView}>
                        <span style={styles.heyText}>Hey </span>
                        {/* <button style={styles.nameDropDown}> */}
                            <span style={styles.nameText}>{name}</span>
                        {/* </button> */}
                    </div>
                    <span style={styles.welcomeText}>
                        {'What can we do for you today?'}
                    </span>
                </div>
                <div style={styles.flatlistParentView}>
                    <span style={styles.listTitle}>Bookings</span>
                    <div style={styles.flatlist}>
                        <BookingCard
                            title={'Doctors appointments'}
                            bookingImage={Images.appointment}
                            description={'Book for In-hospital or Video Consultation'}
                            onPressCard={() => {
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
                {/* {eventData.length > 0 && (
                    <div style={styles.flatlistParentView}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={styles.listTitle}>Upcoming events</span>
                        </div>
                        <div style={styles.flatlist}>
                            {eventData.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                )} */}
                <span style={styles.listTitle}>Specialities</span>
                <div style={styles.flatlist}>
                    {specialtiesList.map((item, index) => (
                        <div key={index}>
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
