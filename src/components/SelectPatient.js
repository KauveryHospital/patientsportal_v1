import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  familyMembersList,
  requestNow
} from '../utils/apiCalls';
import {
  patientDetails,
  patientId,
  patient_Id,
  patient_Name,
  patient_Notes
} from '../store/actions/bookingActions';
import { familyReloadData } from '../store/actions/homeActions';
import CommonButton from './CommonButton';
import CommonLoader from './CommonLoader';
import ToPayCard from './ToPayCard';
import DropDownField from './inputfield/DropDownField';
import MultilineTextInputField from './inputfield/MultilineTextInputField';
import VerifyNewAccountCreation from './modal/VerifyNewAccountCreation';
import styles from './consult.styles';
import { isResponseIsValid, snackBar } from '../utils/helpers';

const SelectPatient = () => {
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isRequest } = location.state || false;
  console.log(isRequest);

  const unitName = useSelector((state) => state?.authReducer?.unitName);
  const patientDetailsData = useSelector((state) => state?.bookingReducer?.patientDetails);
  const amount = useSelector((state) => state?.bookingReducer?.amount);
  const doctorDetails = useSelector((state) => state?.bookingReducer?.doctorDetails);
  const patientDetails = useSelector((state) => state?.bookingReducer?.patientDetails);

  const [popupLoading, setPopupLoading] = useState(false);
  const [signUpState, setSignUpState] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [nameErrorState, SetNameErrorState] = useState(false);
  const [notesErrorState, SetNotesErrorState] = useState(false);
  const [nameErrorText, SetNameErrorText] = useState('');
  const [notesErrorText, SetNotesErrorText] = useState('');
  const [loader, setLoader] = useState(false);
  const [relationData, setRelationData] = useState([]);
  const [profileCreatedPopup, setProfileCreatedPopup] = useState(false);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    const familyMembersListener = () => {
      familyMembersApiCall();
    };

    window.addEventListener('familyMembers', familyMembersListener);
    familyMembersApiCall();

    return () => {
      window.removeEventListener('familyMembers', familyMembersListener);
    };
  }, []);

  const familyMembersApiCall = async () => {
    setPopupLoading(true);
    try {
      const response = await familyMembersList();
      if (isResponseIsValid(response)) {
        setRelationData(response.data.data);
        setTimeout(() => setPopupLoading(false), 400);
      } else {
        setTimeout(() => {
          snackBar(JSON.stringify(response.data));
          setPopupLoading(false);
        }, 400);
      }
    } catch (err) {
      setTimeout(() => {
        snackBar(JSON.stringify(err));
        setPopupLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    SetNameErrorState(false);
    nextButtonValidation();
  }, [patientName]);

  const nextButtonValidation = () => {
    if (patientName === '') {
      setSignUpState(false);
    } else {
      setSignUpState(true);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = () => setKeyboardShow(true);
    const keyboardDidHideListener = () => setKeyboardShow(false);

    window.addEventListener('keydown', keyboardDidShowListener);
    window.addEventListener('keyup', keyboardDidHideListener);

    return () => {
      window.removeEventListener('keydown', keyboardDidShowListener);
      window.removeEventListener('keyup', keyboardDidHideListener);
    };
  }, []);

  const onPressCheckout = () => {
    // navigate('/checkout', { state: { passData } });
    dispatch(patient_Notes(notes));
  };

  const passData = (note) => setNotes(note);

  const onPressConfirmRequest = () => onRequestNowApiCall();

  const onRequestNowApiCall = async () => {
    setLoader(true);
    const body = {
      doctor_id: doctorDetails?._id.$oid,
      patient_id: patientDetails?.patient_id,
      notes,
      unit_name: unitName,
    };
    try {
      const response = await requestNow(body);
      if (isResponseIsValid(response)) {
        setTimeout(() => {
          setLoader(false);
          const event = new Event('requestNowData', {
            isShowPopup: true,
            item: response.data,
          });
          window.dispatchEvent(event);
          // navigate('/home');
        }, 200);
      } else {
        setLoader(false);
        setTimeout(() => {
          if (response?.data?.message) {
            snackBar(JSON.stringify(response?.data?.message));
          } else {
            snackBar('API Error');
          }
        }, 400);
      }
    } catch (err) {
      setLoader(false);
      setTimeout(() => {
        snackBar(JSON.stringify(err));
      }, 400);
    }
  };

  return (
    <div className={styles.selectPatientContainer}>
      <CommonLoader loading={popupLoading} />
      <div className={styles.fieldParentContainer}>
        <h1 className={styles.fieldTitlePatient}>Select patient for consultation</h1>
      </div>
      <div className={styles.fieldContainer}>
        <DropDownField
          fieldTitle="Select patient"
          refRB={bottomSheetRef}
          type={2}
          selectedValue={patientName}
          placeholder="Patient name"
          dropDownData={relationData}
          onGetItem={(item) => {
            setPatientName(item.name);
            dispatch(patient_Name(item.name));
            dispatch(patient_Id(item.app_profile_id));
          }}
          closeModal={() => bottomSheetRef.current?.close()}
          onPressDropDown={() => bottomSheetRef.current?.open()}
          onPressAddFamilyMember={() => {
            bottomSheetRef.current?.close();
            dispatch(familyReloadData('2'));
          }}
        />
      </div>
      <p className={styles.noteText}>
        <span className={styles.note1}>Note: </span>
        <span className={styles.note2}>
          Prescription will be provided in the name of the patient selected. If you don’t find the patient in the list{' '}
        </span>
        <span
          className={styles.note3}
          onClick={() => {
            dispatch(familyReloadData('2'));
          }}
        >
          Add Patient
        </span>
      </p>
      <div className={styles.fieldContainerNotes}>
        <MultilineTextInputField
          fieldTitle="Notes to doctor"
          placeholder="Write Description..."
          value={notes}
          handleInputChange={(text) => {
            setNotes(text.trimStart());
            dispatch(patient_Notes(text.trimStart()));
          }}
          maxLength={500}
        />
      </div>

      {!keyboardShow && (
        <div className={styles.buttonView}>
          {!isRequest && (
            <div className={styles.toPayCardView}>
              <ToPayCard amount={amount} />
            </div>
          )}

          <CommonButton
            text={isRequest ? 'Confirm request' : 'Continue'}
            isLoading={loader}
            customStyles={styles.nextButton}
            onPress={isRequest ? onPressConfirmRequest : onPressCheckout}
            requestButton={isRequest}
            disabled={!signUpState}
          />
        </div>
      )}
      <VerifyNewAccountCreation
        isModalVisible={profileCreatedPopup}
        title="Member added"
        content={`${name} is added to your family profile successfully.`}
        buttonPress={() => setProfileCreatedPopup(false)}
        closeModal={() => setProfileCreatedPopup(false)}
        buttonText="Okay"
        showNotes={false}
        showTicketID={false}
        type="success"
      />
    </div>
  );
};

SelectPatient.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default SelectPatient;
