import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Modal,
} from 'react-bootstrap';
import DoctorCard from '../components/DoctorCard';
import Images from '../constants/Images';
import Vector from '../constants/Vector';
import {
  doctorsListInConsultation,
  doctorsListspecializationID,
  doctorsSearchListInConsultation,
} from '../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import styles from './consult.styles';

const Search = () => {
  const location = useLocation();
  const history = useHistory();
//   const { unit_ID } = location.state;  
  const currentRegionSelected = useSelector((state) => state?.homeReducer?.currentRegion);
  const [isActive1, setIsActive1] = useState(true);
  const [loader, setLoader] = useState(false);
  const [DoctorsList, setDoctorsList] = useState([]);
  const [searchDoctorsList, setSearchDoctorsList] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const data = location.state || {};
  const unit_ID = data.unitId;
  const specializationID = location.state;
  console.log(unit_ID);

  useEffect(() => {
    if (specializationID) {
      specialityDoctorListAPICall();
    } else {
      doctorListAPICall();
    }
  }, []);

  useEffect(() => {
    console.log(searchData);
    if (searchData.trim() === '') {
      doctorListAPICall();
    } else {
      setTimeout(() => {
        doctorSearchListAPICall();
      }, 500);
    }
  }, [searchData]);

  const specialityDoctorListAPICall = async () => {
    setLoader(true);
    try {
      const response = await doctorsListspecializationID(unit_ID, specializationID);
      if (isResponseIsValid(response)) {
        setDoctorsList(response.data.data);
        setLoader(false);
      } else {
        setLoader(false);
        snackBar(response?.data || 'API Error');
      }
    } catch (err) {
      setLoader(false);
      snackBar('API Error');
    }
  };

  const doctorListAPICall = async () => {
    setLoader(true);
    try {
      const response = await doctorsListInConsultation(unit_ID, currentRegionSelected);
      if (isResponseIsValid(response)) {
        setDoctorsList(response.data.data);
        setSearchDoctorsList(response.data.data);
        setLoader(false);
      } else {
        setLoader(false);
        snackBar(response?.data || 'API Error');
      }
    } catch (err) {
      setLoader(false);
      snackBar('API Error');
    }
  };

  const doctorSearchListAPICall = async () => {
    try {
      const response = await doctorsSearchListInConsultation(unit_ID, currentRegionSelected, searchData);
      if (isResponseIsValid(response)) {
        setSearchDoctorsList(response.data.data);
      } else {
        snackBar(response?.data || 'API Error');
      }
    } catch (err) {
      snackBar('API Error');
    }
  };

  const searchDoctorsRenderItem = (item) => (
    <DoctorCard
      key={item._id.$oid}
      rawData={item}
      onPress={() => {
        const it = item._id.$oid;
        history.push(item.request_only === 1 ? '/consult-details-request' : '/consult-details', { id: it });
      }}
      onPressBookNow={() => {
        const doctor_id = item._id.$oid;
        history.push('/consult-slot-booking', { doctor_id, slotCondition: item });
      }}
      statusRequest={true}
      doctorRequest={item.request_only}
    />
  );

  const onPress = () => {
    setSearchDoctorsList([]);
    setIsVisible(true);
  };

  return (
    <Container fluid style={{ backgroundColor: '#FAFAFA' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form.Control
            type="text"
            value={searchData}
            placeholder="Search for doctors and specialties"
            onChange={(e) => setSearchData(e.target.value)}
            autoFocus
            style={styles.searchBox}
          />
          {searchData !== '' && (
            <Button variant="outline-secondary" onClick={() => setSearchData('')}>
              {Vector.SearchClose}
            </Button>
          )}
          {loader ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : searchDoctorsList.length === 0 ? (
            <div className="text-center my-4">
              <p>{`Sorry we weren’t able to find any doctors, specialties named ‘${searchData}’. We have suggested some specialties and doctors below...`}</p>
              <img src={Images.searchNotFound} style={styles.noImg} />
            </div>
          ) : (
            <Row>
              {searchDoctorsList.map((item) => (
                <Col key={item._id.$oid} md={6}>
                  {searchDoctorsRenderItem(item)}
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
      <Modal show={isVisible} onHide={() => setIsVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={searchData}
            placeholder="Search for doctors and specialties"
            onChange={(e) => setSearchData(e.target.value)}
            autoFocus
            style={styles.searchBox}
          />
          {searchDoctorsList.map(searchDoctorsRenderItem)}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Search;
