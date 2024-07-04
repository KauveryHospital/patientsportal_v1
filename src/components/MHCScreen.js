import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { packageDetails } from '../../store/actions/mhcActions';
import { useMixpanel } from '../mixpanel/Analytics';
import { mixpanel_event } from '../../mixpanel/app';
import styles from './MHCScreenStyles';
import CommonLoader from '../../components/CommonLoader';
import SearchBarField from '../../components/SearchBarField';
import TestCard from '../../components/TestCard';
import SwitchHeader from '../../components/header/SwitchHeader';
import { MHCListWithoutSearch } from '../../utils/apiCalls';
import { isResponseIsValid, snackBar } from '../../utils';
import { getSecondaryProfileID } from '../../utils/LocalStorage';
import DropShadow from 'react-drop-shadow';

const MHCScreen = ({ location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const status = location.state.status;

  const [testData, setTestData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [profileID, setProfileID] = useState('');
  const [recommendedTestsCount, setRecommendedTestsCount] = useState(0);
  const [mostPopularCount, setMostPopularCount] = useState(0);

  const profileInformation = useSelector(state => state.homeReducer.profile_info);
  const mixpanel = useMixpanel();

  useEffect(() => {
    getSecondaryProfileID('Secondary_Profile_ID').then(res => {
      let profile_id = JSON.parse(res);
      MHCListApiCall(profile_id, true);
    });
  }, []);

  useEffect(() => {
    const reloadUpload = () => {
      setTimeout(() => {
        getSecondaryProfileID('Secondary_Profile_ID').then(res => {
          let profile_id = JSON.parse(res);
          MHCListApiCall(profile_id, true);
        });
      }, 500);
    };
    window.addEventListener('reloadUpload', reloadUpload);

    return () => {
      window.removeEventListener('reloadUpload', reloadUpload);
    };
  }, []);

  const MHCSearchEvent = () => {
    let profile_info = profileInformation;
    let property_input = {
      'Mobile number': profile_info.mobile_number,
      Age: profile_info.age,
      Gender: profile_info.gender,
      Relationship: profile_info.relationship,
      'Is Primary User': profile_info.is_primary_user,
    };
    mixpanel.track(mixpanel_event.SEARCH_MHC_TESTS, property_input);
  };

  const MHCPageViewEvent = () => {
    let profile_info = profileInformation;
    let property_input = {
      'Mobile number': profile_info.mobile_number,
      Age: profile_info.age,
      Gender: profile_info.gender,
      Relationship: profile_info.relationship,
      'Is Primary User': profile_info.is_primary_user,
    };
    mixpanel.track(mixpanel_event.VIEW_MHC_PACKAGES_OFFERED, property_input);
  };

  const MHCViewAllEvent = title => {
    let profile_info = profileInformation;
    let property_input = {
      'Mobile number': profile_info.mobile_number,
      Age: profile_info.age,
      Gender: profile_info.gender,
      Relationship: profile_info.relationship,
      'Is Primary User': profile_info.is_primary_user,
    };
    mixpanel.track(
      title === 'Recommended tests'
        ? mixpanel_event.RECOMMENDED_TEST_VIEW_ALL
        : mixpanel_event.POPULAR_TEST_VIEW_ALL,
      property_input,
    );
  };

  const MHCListApiCall = async (profile_id) => {
    setLoader(true);
    try {
      const response = await MHCListWithoutSearch({
        page: 1,
        page_size: 2,
        profile_id: profile_id,
        test_category: '',
      });
      if (isResponseIsValid(response)) {
        setTestData(response.data.data);
        setRecommendedTestsCount(response.data.total_count);
        setMostPopularCount(response.data.total_count);
        setLoader(false);
      } else {
        setLoader(false);
        snackBar(response?.data ? response?.data : 'API Error');
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  const onPressTestCard = item => {
    dispatch(packageDetails(item));
    history.push('/testdetails', { test_id: item.id.$oid });
  };

  const onPressBookNow = item => {
    MHCBookNowEvent(item);
    dispatch(packageDetails(item));
    history.push('/selectdatelocation');
  };

  const MHCBookNowEvent = payload => {
    let profile_info = profileInformation;
    let property_input = {
      'Mobile number': profile_info.mobile_number,
      Age: profile_info.age,
      Gender: profile_info.gender,
      Relationship: profile_info.relationship,
      'Is Primary User': profile_info.is_primary_user,
      'Test name': payload.package_name,
      'Test price': Math.round(payload.discount_price),
    };
    mixpanel.track(mixpanel_event.BOOK_NOW_MHC, property_input);
  };

  const renderSectionHeader = section => {
    const handleNavigate = () => {
      MHCViewAllEvent(section.title);
      history.push('/testviewalllist', {
        title: section.title,
        test_category: section.title === 'Recommended tests' ? 'recommended_tests' : 'most_popular',
      });
    };

    const renderViewAll = (condition, count) => {
      return condition && count > 2 ? (
        <button onClick={handleNavigate} style={styles.listViewAll}>View all</button>
      ) : null;
    };

    return (
      <div>
        <div style={styles.testTitleView}>
          <h2 style={styles.listTitle_2}>{section.title}</h2>
          {renderViewAll(section.title === 'Recommended tests', recommendedTestsCount)}
          {renderViewAll(section.title === 'Most popular', mostPopularCount)}
        </div>
        <div style={styles.testListParentView}>
          {section.data.map(item => (
            <TestCard
              key={item.package_name}
              title={item.package_name}
              test_count={item.tests_count}
              off_percent={item.offer}
              fee={Math.round(item.discount_price)}
              off_fee={item.main_price}
              onPressTestCard={() => onPressTestCard(item)}
              onPressBookNow={() => onPressBookNow(item)}
            />
          ))}
        </div>
      </div>
    );
  };

  const onPressSearchBar = () => {
    MHCSearchEvent();
    history.push('/testsearch', { test_category: '' });
  };

  const ListEmptyComponent = () => {
    return (
      <div style={styles.emptyComponentContainer_mhc}>
        <h2 style={styles.emptyComponent_2}>Hey {profileInformation.name}!</h2>
        <p style={styles.emptyComponent}>There is no Master Health package available based on your 'Age' and 'Gender'. If you are looking for any of your family member kindly make sure to switch the profile.</p>
      </div>
    );
  };

  return (
    <>
      <SwitchHeader title="Select tests" nameSwitch={true} onTabRefresh={() => {}} />
      <div style={styles.container}>
        <DropShadow>
          <div style={styles.topView_3}>
            <div style={styles.searchBarContainer_mhc}>
              <SearchBarField title="Search for tests" onPress={onPressSearchBar} />
            </div>
          </div>
        </DropShadow>
        <div style={styles.contentContainer}>
          {loader ? (
            <CommonLoader loading={loader} />
          ) : (
            <div style={styles.sectionListParentContainer}>
              {testData.length === 0 ? (
                <ListEmptyComponent />
              ) : (
                testData.map(section => (
                  <div key={section.title} style={styles.sectionView}>
                    {renderSectionHeader(section)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MHCScreen;
