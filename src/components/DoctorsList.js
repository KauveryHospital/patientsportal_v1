import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Modal, Spinner, Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DoctorCard from '../components/DoctorCard';
import CommonLoader from '../components/CommonLoader';
import SearchBarField from '../components/SearchBarField';
import { doctorDetails, doctorsListInConsultation, doctorsListspecializationID, doctorsSearchListInConsultation } from '../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { doctorDetailsItem } from '../store/actions/bookingActions';
import styles from './consult.styles';

const DoctorsList = () => {
  const location = useLocation();
  const data = location.state || {};
  const unit_ID = data.unitId;
  const specializationID = data.specializationID;
  const dispatch = useDispatch();
  const history = useHistory();

  const [isActive1, setIsActive1] = useState(true);
  const [loader, setLoader] = useState(false);
  const [DoctorsList, setDoctorsList] = useState([]);
  const [searchDoctorsList, setSearchDoctorsList] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(10);
  const [next_page, setNext_page] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dataList, setDataList] = useState({});
  const [docDetailLoading, setDocDetailLoading] = useState(false);

  const currentRegionSelected = useSelector(state => state?.homeReducer?.currentRegion);

  useEffect(() => {
    if (specializationID) {
      specialityDoctorListAPICall();
    } else {
      doctorListAPICall();
    }
  }, []);

  useEffect(() => {
    if (searchData.trim() === '') {
      setSearchDoctorsList([]);
    } else {
      const timeoutId = setTimeout(() => {
        doctorSearchListAPICall();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchData]);

  const specialityDoctorListAPICall = async () => {
    setLoader(true);
    try {
      const response = await doctorsListspecializationID(unit_ID, specializationID, page, page_size);
      if (isResponseIsValid(response)) {
        if (page === 1) {
          setDoctorsList(response.data.data);
        } else {
          setDoctorsList(prevDoctorsList => [...prevDoctorsList, ...response.data.data]);
        }
        setNext_page(response.data.next_page);
        setPage(page + 1);
      } else {
        snackBar(response?.data || 'API Error');
      }
    } catch (err) {
      snackBar('API Error');
    } finally {
      setLoader(false);
    }
  };

  const doctorListAPICall = async () => {
    setLoader(page === 1);
    try {
      const response = await doctorsListInConsultation(unit_ID, currentRegionSelected, page, page_size);
      if (isResponseIsValid(response)) {
        if (page === 1) {
          setDoctorsList(response.data.data);
        } else {
          setDoctorsList(prevDoctorsList => [...prevDoctorsList, ...response.data.data]);
        }
        setNext_page(response.data.next_page);
        setPage(page + 1);
      } else {
        snackBar(response?.data || 'API Error');
      }
    } catch (err) {
      snackBar('API Error');
    } finally {
      setLoader(false);
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

  const onCallDoctorDetailsApi = async id => {
    setDocDetailLoading(true);
    try {
      const response = await doctorDetails(id);
      if (isResponseIsValid(response)) {
        const rp = response.data.data;
        dispatch(doctorDetailsItem(rp));
        // Assuming navigation is handled differently in a web app
        // Example:
        history.push({
          pathname: '/selectpatient', state: { isRequest: true }});
      } else {
        snackBar(response?.data || 'API Error');
      }
    } catch (err) {
      snackBar('API Error');
    } finally {
      setDocDetailLoading(false);
    }
  };

  const requestOnPress = item => {
    onCallDoctorDetailsApi(item._id.$oid);
  };

  const doctorsRenderItem = item => (
    <DoctorCard
      key={item._id.$oid}
      rawData={item}
      onPressRequest={() => requestOnPress(item)}
      onPressBookNow={() => {
        const doctor_id = item._id.$oid;
        // Example:
        history.push({ pathname: '/consultslotbooking', state: { doctor_id: doctor_id, slotCondition: item }});
      }}
      onPress={() => {
        const it = item._id.$oid;
        // Example:
        // history.push(item.request_only === 1 ? '/consult-details-request' : '/consult-details', { id: it });
      }}
      statusRequest={true}
      doctorRequest={item.request_only}
    />
  );

  const searchDoctorsRenderItem = item => (
    <DoctorCard
      key={item._id.$oid}
      rawData={item}
      onPress={() => {
        setIsVisible(false);
        const it = item._id.$oid;
        // Example:
        // history.push(item.request_only === 1 ? '/consult-details-request' : '/consult-details', { id: it });
      }}
      statusRequest={true}
      doctorRequest={item.request_only}
    />
  );
  // console.log(searchData);
  const onPress = () => {
    setSearchDoctorsList([]);
    // Assuming navigation is handled differently in a web app
    // Example:
    history.push({
      pathname: '/search',
      state: { unitId: unit_ID, specializationID: specializationID }
    });
  };

  const loadMoreDoctors = () => {
    if (!loadingMore && next_page) {
      setLoadingMore(true);
      if (!specializationID) {
        doctorListAPICall().finally(() => setLoadingMore(false));
      } else {
        specialityDoctorListAPICall().finally(() => setLoadingMore(false));
      }
    }
  };

  const renderFooter = () => {
    if (next_page) {
      return (
        <div style={styles.footerComponent}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }
    return null;
  };

  return (
    <Container fluid style={styles.container}>
      <Modal show={isVisible} onHide={() => setIsVisible(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Book Consultation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="search">
            <input
              type="text"
              className="form-control"
              placeholder="Search for doctors and specialties"
              value={searchData}
              onChange={e => setSearchData(e.target.value)}
            />
            {searchData !== '' && (
              <Button variant="outline-secondary" onClick={() => setSearchData('')}>
                Clear
              </Button>
            )}
          </Form.Group>
          <div>
            {searchDoctorsList.map(searchDoctorsRenderItem)}
          </div>
        </Modal.Body>
      </Modal>
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={styles.topView}>
            <div style={styles.searchBarContainer}>
              <SearchBarField
                title="Search for doctors and specialties"
                value={searchData}
                onChange={e => setSearchData(e.target.value)}
                onPress={onPress}
              />
            </div>
          </div>
          {loader ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div>
              {DoctorsList.map(doctorsRenderItem)}
              {renderFooter()}
            </div>
          )}
        </Col>
      </Row>
      <CommonLoader loading={docDetailLoading} />
    </Container>
  );
};

export default DoctorsList;
