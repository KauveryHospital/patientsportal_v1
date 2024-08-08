import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../navigation/AppContext';
import {
  bookingInitialize,
  createBooking,
  createBookingPayAtHospital,
  createWebHooks,
} from '../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import styles from './consult.styles';
import CommonLoader from './CommonLoader';
import DoctorProfileWithAddress from './DoctorProfileWithAddress';
// import { MultilineTextInputField } from './CommonLoader';
import ToPayCard from './ToPayCard';
import ErrorPopup from './ErrorPopup';
// import { COLORS, Headers, Images, SIZES, Vector } from '../constants';
// import { StackActions } from '@react-navigation/native';
import { checkoutSuccess } from '../store/actions/homeActions';
import { getUserInformation, setPayCheckoutSuccess, setWebHookCheckout } from '../utils/LocalStorage';
import { useHistory, useLocation } from 'react-router-dom';

const Checkout = ({ route }) => {
//   const { Auth } = useContext(AppContext);
  const history = useHistory();
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
    const selectedUnit = queryParams.get('selectedUnit');
    const fees = queryParams.get('fees');
    const time = queryParams.get('time');
    const item = JSON.parse(queryParams.get('item'));
    const data = JSON.parse(queryParams.get('data'));
    const doctorSlot = JSON.parse(queryParams.get('doctorSlot'));
    const dropdownOptions = JSON.parse(queryParams.get('dropdownOptions'));
    const name = queryParams.get('name');
    const note = queryParams.get('notes');
    const unitAddress = queryParams.get('unitAddress');
    console.log('iiiii', item);
    console.log('daaaaa', data);
    console.log('sssssss', doctorSlot);
  const profile_information = useSelector(
    (state) => state?.homeReducer?.profile_info
  );
  const notesRef = useRef();
  const checkoutScrollView = useRef();
  const radioButtonRef = useRef();
  const fileUploadRef = useRef();
  const cropViewRef = useRef();
  const refDocumentChooseRBSheet = useRef();
  const [uploadLoader, setUploadLoader] = useState(false);
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState('');
  const patientDetails = useSelector(
    (state) => state?.bookingReducer?.patientDetails
  );
  const doctorDetails = useSelector(
    (state) => state?.bookingReducer?.doctorDetails
  );
  const [cropModal, setCropModal] = useState(false);
  const [imageURI, setImageURI] = useState(false);

  const slotDetails = useSelector(
    (state) => state?.bookingReducer?.slotDetails
  );
  const slotStartTime = useSelector(
    (state) => state?.bookingReducer?.slotStartTime
  );
  const slotAddress = useSelector(
    (state) => state?.bookingReducer?.slotAddress
  );
  const amount = useSelector((state) => state?.bookingReducer?.amount);
  const consultMode = useSelector(
    (state) => state?.bookingReducer?.consultMode
  );

  const [edit, setEdit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const [notes, setNotes] = useState(note);
  const [notesErrorState, SetNotesErrorState] = useState(false);
  const [notesErrorText, SetNotesErrorText] = useState('');
  const [urlScheme, setURLScheme] = useState('');
  const [showToast, setShowToast] = useState('');
  const [isStaging, setIsStaging] = useState(false);
  const [appInvokeRestricted, setIsAppInvokeRestricted] = useState(true);
//   const [keyboardShow, setKeyboardShow] = useState(false);
  const [bookingErrorPopup, setBookingErrorPopup] = useState(false);
  const [bookingErrorContent, setBookingErrorContent] = useState('');
  const [checkoutPressed, setCheckoutPressed] = useState(false);
  const [saveEnable, setSaveEnable] = useState('');
  const [uhidList, setUhidList] = useState([]);
  const [hmsIdRaw, setHmsIdRaw] = useState('');
  const [hmsId, setHmsId] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const uploadedFileList = useSelector(
    (state) => state?.uploadBookingReducer?.file_uploaded_list
  );

  const onPressCheckout = () => {
    // onBookingCheckoutEvent();
    onCheckoutApiCall('', false);
  };

  const onPressPayAtHospital = () => {
    // onBookingPayatHospitalEvent();
    onCheckoutPayAtHospitalApiCall('', false);
  };

  useEffect(() => {
    nextButtonValidation();
  }, [uploadedFileList]);

  useEffect(() => {
    getUserInformation('User_Data').then((res) => {
      let response = JSON.parse(res);
      setUserToken(response.token);
    });

//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setKeyboardShow(true);
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setKeyboardShow(false);
//       }
//     );
//     // return () => {
//     //   keyboardDidHideListener.remove();
//     //   keyboardDidShowListener.remove();
//     // };
  }, []);

  const nextButtonValidation = () => {
    // let uploaded_file_list = uploadedFileList;
    // const errorItems = uploaded_file_list.filter(
    //   (item) => item.size_error === true
    // );
    // const isButtonEnabled = errorItems.length > 0;
    // if (!isButtonEnabled) {
    //   setSaveEnable(true);
    // } else {
    //   setSaveEnable(false);
    // }
  };

  const onCheckoutPayAtHospitalApiCall = async (hms_id, is_new_user) => {
    setCheckoutLoader(true);
    const body = {
      unit_id:
        slotDetails?.slot_type === 'Offline'
          ? slotAddress.unit_id.$oid
          : slotDetails?.unit_id?.$oid,
      slot_id: slotDetails?._id.$oid,
      doctor_id: doctorDetails?._id.$oid,
      patient_id: patientDetails?.patient_id,
      notes: patientDetails?.notes,
      booking_type: slotDetails?.slot_type,
      consult_date: `${slotDetails?.slot_date + 'T' + slotStartTime + ':00'}`,
      consult_time: `${slotDetails?.slot_date + 'T' + slotStartTime + ':00'}`,
      amount: `${amount}`,
      patient_name: patientDetails.patient_name,
      ref_time: slotStartTime,
      hms_id: hms_id,
      is_new_user: is_new_user,
      files: uploadedFileList,
    };

    try {
      const response = await createBookingPayAtHospital(body);
      if (isResponseIsValid(response)) {
        if (response?.data?.kh_user_data) {
          setCheckoutPressed(false);
          setUhidList(response.data.kh_user_data);
          setTimeout(() => {
            setCheckoutLoader(false);
            radioButtonRef.current.open();
          }, 500);
        } else {
          setCheckoutLoader(false);
          setTimeout(() => {
            if (response.data.status === 'approved') {
            //   onMakePaymentEvent('Pay at hospital');
            }
            let success_payload = {
              isShowPopup: true,
              item: response.data,
              type: 'booking',
            };
            setPayCheckoutSuccess('pay_success', JSON.stringify(success_payload));
            // navigation.navigate('HomeScreen', { screen: 'Home' });
            history.push('/home');
          }, 200);
        }
      } else {
        setCheckoutLoader(false);
        if (response?.data?.message) {
          setBookingErrorContent(response?.data?.message);
          setTimeout(() => {
            setBookingErrorPopup(true);
          }, 400);
        } else {
          let pay_load = {
            isShowPopup: true,
            item: 'pending',
            type: 'booking',
          };
          setWebHookCheckout('webhook_popup', JSON.stringify(pay_load));
          setTimeout(() => {
           history.push('/home');
          }, 500);
        }
      }
    } catch (err) {
      setCheckoutLoader(false);
      setTimeout(() => {
        snackBar(JSON.stringify(err));
      }, 400);
    }
  };

  const onCheckoutApiCall = async (hms_id, is_new_user) => {
    setLoader(true);
    const body = {
      unit_id:
        slotDetails?.slot_type === 'Offline'
          ? slotAddress.unit_id.$oid
          : slotDetails?.unit_id?.$oid,
      slot_id: slotDetails?._id.$oid,
      doctor_id: doctorDetails?._id.$oid,
      patient_id: patientDetails?.patient_id,
      notes: patientDetails?.notes,
      booking_type: slotDetails?.slot_type,
      consult_date: `${slotDetails?.slot_date + 'T' + slotStartTime + ':00'}`,
      consult_time: `${slotDetails?.slot_date + 'T' + slotStartTime + ':00'}`,
      amount: `${amount}`,
      patient_name: patientDetails.patient_name,
      ref_time: slotStartTime,
      hms_id: hms_id,
      is_new_user: is_new_user,
      files: uploadedFileList,
    };

    try {
      const response = await createBooking(body);
      if (isResponseIsValid(response)) {
        if (response?.data?.kh_user_data) {
          setCheckoutPressed(true);
          setUhidList(response.data.kh_user_data);
          setTimeout(() => {
            setLoader(false);
            radioButtonRef.current.open();
          }, 500);
        } else {
          setLoader(false);
          setTimeout(() => {
            if (response.data.status === 'approved') {
            //   onMakePaymentEvent('checkout');
            }
            let success_payload = {
              isShowPopup: true,
              item: response.data,
              type: 'booking',
            };
            setPayCheckoutSuccess('pay_success', JSON.stringify(success_payload));
            // navigation.dispatch(StackActions.popToTop());
          }, 200);
        }
      } else {
        setLoader(false);
        if (response?.data?.message) {
          setBookingErrorContent(response?.data?.message);
          setTimeout(() => {
            setBookingErrorPopup(true);
          }, 400);
        } else {
          let pay_load = {
            isShowPopup: true,
            item: 'pending',
            type: 'booking',
          };
          setWebHookCheckout('webhook_popup', JSON.stringify(pay_load));
          setTimeout(() => {
            // navigation.dispatch(StackActions.popToTop());
          }, 500);
        }
      }
    } catch (err) {
      setLoader(false);
      setTimeout(() => {
        snackBar(JSON.stringify(err));
      }, 400);
    }
  };

  const onChangeNotes = (notes) => {
    setNotes(notes);
    if (notes.length > 300) {
      SetNotesErrorState(true);
      SetNotesErrorText('Notes should be less than 300 characters.');
    } else {
      SetNotesErrorState(false);
      SetNotesErrorText('');
    }
  };

  const onPressDocumentOption = (option) => {
    refDocumentChooseRBSheet.current.close();
    setTimeout(() => {
      if (option === 'camera') {
        // Camera functionality
      } else {
        // Image library functionality
      }
    }, 300);
  };

  return (
    <div style={styles.container}>
      <Box>
        <Typography variant="h5">Checkout</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DoctorProfileWithAddress doctorDetails={doctorDetails} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ToPayCard amount={amount} />
          </Grid>
          <Grid item xs={12}>
            {/* <MultilineTextInputField
              label="Notes"
              value={notes}
              onChange={(e) => onChangeNotes(e.target.value)}
              error={notesErrorState}
              helperText={notesErrorText}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={onPressCheckout}
              disabled={!saveEnable || loader}
            >
              {loader ? <CircularProgress size={24} /> : 'Checkout'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onPressPayAtHospital}
              disabled={!saveEnable || checkoutLoader}
              style={{ marginLeft: 10 }}
            >
              {checkoutLoader ? <CircularProgress size={24} /> : 'Pay at Hospital'}
            </Button>
          </Grid>
        </Grid>
        <CommonLoader open={loader || checkoutLoader} />
        <ErrorPopup
          open={bookingErrorPopup}
          message={bookingErrorContent}
          onClose={() => setBookingErrorPopup(false)}
        />
        {/* Other components and logic here */}
      </Box>
    </div>
  );
};

export default Checkout;
