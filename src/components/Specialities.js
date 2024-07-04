import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  doctorsSearchListInConsultation,
  specializationList,
} from '../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../utils/helpers';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpecialtiesCard from '../components/SpecialitiesCard';
import Images from '../constants/Images';
import styles from '../components/Specialities.styles';

const Specialities = () => {
  const [specialtiesList, setSpecialtiesList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [searchDoctorsList, setSearchDoctorsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(80);
  const [page_size, setPage_size] = useState(80);
  const [onMomentScroll, setOnMomentScroll] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const history = useHistory();

  const currentRegionSelected = useSelector(
    state => state?.homeReducer?.currentRegion,
  );

  const SpecialtiesImages = [
    Images.generalMedicine,
    Images.urology,
    Images.ent,
    Images.dermatology,
    Images.introSliderImage2,
    Images.introSliderImage3,
    Images.hospitalVisit,
    Images.introSliderImage3
  ];

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const region = query.get('region');
  const unitId = query.get('unitId');
  const home = query.get('home');
  console.log('Region and Unit ID:', region, unitId);

  useEffect(() => {
    specialtiesListApiCall(unitId, page, page_size, region);
  }, [page]);

  useEffect(() => {
    doctorSearchListAPICall();
  }, [searchData]);

  const doctorSearchListAPICall = async () => {
    setSearchLoader(true);
    try {
      const response = await fetch('your API endpoint for doctor search', {
        method: 'POST',
        body: JSON.stringify({
          unitId,
          currentRegionSelected,
          searchData,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (isResponseIsValid(data)) {
        setSearchDoctorsList(data);
      } else {
        if (data?.message) {
          snackBar(data.message);
        } else {
          snackBar('An error occurred');
        }
      }
      setSearchLoader(false);
    } catch (err) {
      setSearchLoader(false);
      snackBar('An error occurred');
    }
  };

  const specialtiesListApiCall = async (unitId, currentPage, pageSize, region) => {
    setLoader(true);
    try {
      const response = await specializationList(unitId, currentPage, pageSize, region);
      console.log('unitId and region:', unitId, region);
      console.log('Response data:', JSON.stringify(response.data.data));
      if (isResponseIsValid(response)) {
        if (currentPage === 1) {
          setSpecialtiesList(response.data.data);
          console.log('list', response.data.data)
          setNextPage(response.data.next_page);
        } else {
          setSpecialtiesList([...specialtiesList, ...response.data.data]);
          setNextPage(response.data.next_page);
        }

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

  const renderSearchResults = () => {
    if (searchDoctorsList.length === 0) {
      return <p>No data found</p>;
    }

    return (
      <ul>
        {searchDoctorsList.map((doctor) => (
          <li key={doctor.id}>{doctor.name}</li>
        ))}
      </ul>
    );
  };

  const specialtiesRenderItem = (item, index) => (
    // <div style={styles.specialtyCard}>
      <SpecialtiesCard
        key={index}
        title={item.department}
        specialtiesImage={SpecialtiesImages[0]}
        description={item.description}
        specialityCardPress={() => {
        //   history.push('/dlist', { state: { unit_ID: '', specializationID: item._id.$oid } });
        // history.push('/dlist',{ state: { unit_ID: unitId, specializationID: item._id.$oid } });
        history.push({
            pathname: '/dlist',
            state: { unitId: unitId, specializationID: item._id.$oid }
          });
        }}
      />
    // </div>
  );

  return (
    <div style={styles.pageContainer}>
      {/* Modal content */}
      {isVisible && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <button onClick={() => setIsVisible(false)} style={styles.modalButton}>Close</button>
              <h2>Book Consultation</h2>
              {/* <p>Location: Your Location</p> */}
            </div>
            <div style={styles.modalBody}>
              <input
                type="text"
                value={searchData}
                // placeholder="Search for doctors and specialties"
                onChange={(e) => setSearchData(e.target.value)}
                style={styles.searchInput}
              />
              <button onClick={doctorSearchListAPICall} style={styles.modalButton}>Search</button>
              <div style={styles.searchResults}>{renderSearchResults()}</div>
            </div>
          </div>
        </div>
      )}

      {/* Location display */}
      <div>
        {/* <p>Location: Your Location</p> */}
      </div>

      {/* Search bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={doctorSearchListAPICall} style={styles.modalButton}>Search</button>
      </div>

      {/* Specialties list */}
      <div style={styles.specialtiesContainer}>
      <div style={styles.flatlist}>
        {loader ? (
          <p>Loading...</p>
        ) : (
          specialtiesList.map((item, index) => specialtiesRenderItem(item, index))
        )}
      </div>
      </div>
    </div>
  );
};

export default Specialities;
