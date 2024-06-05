import React, { useEffect, useState } from 'react';
import {
    doctorsSearchListInConsultation,
    specializationList,
  } from '../utils/apiCalls';
  import {isResponseIsValid, snackBar} from '../utils/helpers';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const Specialities = ({ }) => {
  const [specialtiesList, setSpecialtiesList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [searchDoctorsList, setSearchDoctorsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(80);
  const [onMomentScroll, setOnMomentScroll] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const location=useLocation();
  const [region, setRegion] = useState('');
//   const [unitId, setUnitId] = useState('');

    const currentRegionSelected = useSelector(
      // current region
      state => state?.homeReducer?.currentRegion,
    );

  const query = new URLSearchParams(location.search);
//   const currentRegionSelected = query.get('region');
  const unitId = query.get('unitId');
  const home = query.get('home');

  console.log('Region:', currentRegionSelected);
  console.log('Unit ID:', unitId);
  console.log('Home:', home);
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const regionParam = queryParams.get('region');
//     const unitIdParam = queryParams.get('unitId');

//     if (regionParam) setRegion(regionParam);
//     if (unitIdParam) setUnitId(unitIdParam);
//   }, [location]);

  useEffect(() => {
    specialtiesListApiCall();
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
      // Assume specializationList is a function making an API call
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

  return (
    <div>
      {/* Modal content */}
      {isVisible && (
        <div>
          {/* Modal header with search bar */}
          <div>
            <button onClick={() => setIsVisible(false)}>Close</button>
            <h2>Book Consultation</h2>
            <p>Location: Your Location</p>
            <input
              type="text"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button onClick={doctorSearchListAPICall}>Search</button>
          </div>
          {/* Modal body */}
          <div>{renderSearchResults()}</div>
        </div>
      )}

      {/* Location display */}
      <div>
        <p>Location: Your Location</p>
      </div>

      {/* Search bar */}
      <div>
        <input
          type="text"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button onClick={doctorSearchListAPICall}>Search</button>
      </div>

      {/* Specialties list */}
      <div>
        {loader ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {specialtiesList.map((specialty) => (
              <li key={specialty.id}>{specialty.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Specialities;
