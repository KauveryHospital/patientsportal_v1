import React, { useRef } from 'react';
// import { View, Image, Text, Platform, Alert } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, Fonts, SIZES, Images } from '../constants';
import { BackHeader, HomeHeader, MiddleHeader } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Home from '../components/Home';
// import Consult from '../screens/consult/Consult';
// import MHCScreen from '../screens/MHC/MHCScreen';
// import Records from '../screens/records/Records';
// import Profile from '../screens/profile/Profile';
// import FastImage from 'react-native-fast-image';
// import MyAccount from '../screens/profile/MyAccount';
// import ManageFamily from '../screens/profile/ManageFamily';
// import SingleUser from '../screens/profile/SingleUser';
// import DeleteProfile from '../screens/profile/DeleteProfile';
// import PaymentHistory from '../screens/profile/PaymentHistory';
// import TicketGenerated from '../screens/profile/TicketGenerated';
// import About from '../screens/profile/About';
// import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
// import TermsAndCondition from '../screens/profile/TermsAndCondition';
// import AddFamilyMobile from '../screens/FamilyMembers/AddFamilyMobile';
// import AddFamilyOtp from '../screens/FamilyMembers/AddFamilyOtp';
// import AddFamilySignup from '../screens/FamilyMembers/AddFamilySignup';
// import AddFamilyVerifyDetails from '../screens/FamilyMembers/AddFamilyVerifyDetails';
// import AddFamilyVerifyDetailsPrefill from '../screens/FamilyMembers/AddFamilyVerifyDetailsPrefill';
// import AddFamilySelection from '../screens/FamilyMembers/AddFamilySelection';
// import ImageCropperScreen from '../screens/profile/ImageCropperScreen';
// import ProfileImageUpdatePage from '../screens/profile/ProfileImageUpdatePage';
// import AddFamilyVerifySameUserDetails from '../screens/FamilyMembers/AddFamilyVerifySameUserDetails';
// import { AppContext } from './AppContext';
// import ConsultDetails from '../screens/consult/ConsultDetails';
// import SpecialitiesList from '../screens/consult/Specialities';
// import Specialities from '../screens/consult/Specialities';
// import DoctorsList from '../screens/consult/DoctorsList';
// import ConsultSlotBooking from '../screens/consult/ConsultSlotBooking';
// import Search from '../screens/consult/Search';
// import ConsultSlotBookingCalendar from '../screens/consult/ConsultSlotBookingCalendar';
// import SelectPatient from '../screens/consult/SelectPatient';
// import Checkout from '../screens/consult/Checkout';
// import VideoCallScreen from '../screens/home/VideoCallScreen';
// import ConsultDetailsRequest from '../screens/consult/ConsultDetailsRequest';
// import RescheduleHospitalVisit from '../screens/Reschedule/RescheduleHospitalVisit';
// import RescheduleSlotDetails from '../screens/Reschedule/RescheduleSlotDetails';
// import RescheduleConfirm from '../screens/Reschedule/RescheduleConfirm';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ConsultStack = createNativeStackNavigator();
const MHCStack = createNativeStackNavigator();
const RecordsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const FamilyMembersStack = createNativeStackNavigator();
const TabScreen = ({ st }) => {
  const dispatch = useDispatch();
  const profileImageUrlSaved = useSelector(
    state => state?.authReducer?.profileImageSaved,
  );
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName={st === '5' ? 'ProfileStackScreen' : 'HomeScreen'}
      screenListeners={({ navigation }) => ({
        state: e => {
          // Do something with the state
          console.log('state changed', e.data);

          // Do something with the `navigation` object
          if (!navigation.canGoBack()) {
            console.log("we're on the initial screen");
          }
        },
      })}
      screenOptions={({ route }) => ({
        tabBarStyle: [styles.TabStyleBar],
        tabBarLabelStyle: styles.TabLabelStyle,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        listeners={{
          tabPress: e => {
            navigation.popToTop();
          },
        }}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarActiveTintColor: COLORS.primaryColor,
          tabBarIcon: tabInfo => {
            return (
              <View style={styles.TabParentView}>
                {tabInfo.focused ? (
                  <View style={styles.TabFocusBar}></View>
                ) : null}
                <View
                  style={
                    tabInfo.focused ? styles.TabMarginTop : styles.TabMarginTop2
                  }
                />
                {tabInfo.focused ? (
                  <TabImage imageURL={Images.homeFilled} />
                ) : (
                  <TabImage imageURL={Images.home} />
                )}
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name={'ConsultStackScreen'}
        component={ConsultStackScreen}
        listeners={{
          tabPress: e => {
            navigation.popToTop();
          },
        }}
        options={{
          // tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarLabel: 'Consult',
          tabBarActiveTintColor: COLORS.primaryColor,
          tabBarIcon: tabInfo => {
            return (
              <View style={styles.TabParentView}>
                {tabInfo.focused ? (
                  <View style={styles.TabFocusBar}></View>
                ) : null}
                <View
                  style={
                    tabInfo.focused ? styles.TabMarginTop : styles.TabMarginTop2
                  }
                />
                {tabInfo.focused ? (
                  <TabImage imageURL={Images.consultFilled} />
                ) : (
                  <TabImage imageURL={Images.consult} />
                )}
              </View>
              // <View style={styles.searchTabParentView}>
              //   {tabInfo.focused ? (
              //     // <TabImage imageURL={Images.tabSearchActive} />
              //     <Image
              //       source={Images.tabSearchActive}
              //       style={styles.searchIcon}
              //       resizeMode="contain"
              //     />
              //   ) : (
              //     <Image
              //       source={Images.tabSearchActive}
              //       style={styles.searchIcon}
              //       resizeMode="contain"
              //     />
              //   )}
              // </View>
            );
          },
        }}
      />

      {/* <Tab.Screen
        name={'MHCStackScreen'}
        component={MHCStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'MHC',
          tabBarActiveTintColor: COLORS.primaryColor,
          tabBarIcon: tabInfo => {
            return (
              <View style={styles.TabParentView}>
                {tabInfo.focused ? (
                  <View style={styles.TabFocusBar}></View>
                ) : null}
                <View
                  style={
                    tabInfo.focused ? styles.TabMarginTop : styles.TabMarginTop2
                  }
                />
                {tabInfo.focused ? (
                  <TabImage imageURL={Images.MHCIconFilled} />
                ) : (
                  <TabImage imageURL={Images.MHCIcon} />
                )}
              </View>
            );
          },
        }}
      /> */}

      {/* <Tab.Screen
        name={'RecordsStackScreen'}
        component={RecordsStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Records',
          tabBarActiveTintColor: COLORS.primaryColor,
          tabBarIcon: tabInfo => {
            return (
              <View style={styles.TabParentView}>
                {tabInfo.focused ? (
                  <View style={styles.TabFocusBar}></View>
                ) : null}
                <View
                  style={
                    tabInfo.focused ? styles.TabMarginTop : styles.TabMarginTop2
                  }
                />
                {tabInfo.focused ? (
                  <TabImage imageURL={Images.recordsFilled} />
                ) : (
                  <TabImage imageURL={Images.records} />
                )}
              </View>
            );
          },
        }}
      /> */}

      <Tab.Screen
        name={'ProfileStackScreen'}
        component={ProfileStackScreen}
        initialParams={{ status: st }}
        listeners={{ tabPress: () => { } }}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: COLORS.primaryColor,
          tabBarIcon: tabInfo => {
            return (
              <View style={styles.TabParentView}>
                {tabInfo.focused ? (
                  <View style={styles.TabFocusBar}></View>
                ) : null}
                <View
                  style={
                    tabInfo.focused ? styles.TabMarginTop : styles.TabMarginTop2
                  }
                />
                {tabInfo.focused ? (
                  <FastImage
                    source={
                      profileImageUrlSaved
                        ? { uri: profileImageUrlSaved }
                        : Images.profileEmptyImage
                    }
                    resizeMode="cover"
                    style={styles.profileImageBefore}
                  />
                ) : (
                  <FastImage
                    source={
                      profileImageUrlSaved
                        ? { uri: profileImageUrlSaved }
                        : Images.profileEmptyImage
                    }
                    resizeMode="cover"
                    style={styles.profileImageBefore}
                  />
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreen = ({ navigation, params }) => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
          //header: () => <HomeHeader title="Home" />,
        }}
      />
      <HomeStack.Screen
        name={'HomeSpecialities'}
        component={Specialities}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Specialities" shadow={false} />,
        }}
      />
      <HomeStack.Screen
        name={'HomeDoctorsList'}
        component={DoctorsList}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Doctors" leftHeaderOnly={true} shadow={false} />
          ),
        }}
      />
      <ConsultStack.Screen
        name="ConsultDetails"
        component={ConsultDetails}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Doctor’s profile" />,
        }}
      />
      <ConsultStack.Screen
        name="ConsultDetailsRequest"
        component={ConsultDetailsRequest}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Doctor’s profile" />,
        }}
      />
       <ConsultStack.Screen
        name="ConsultSlotBooking"
        component={ConsultSlotBooking}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title="Select date & time"
              leftHeaderOnly={true}
              shadow={true}
            />
          ),
        }}
      />
       <ConsultStack.Screen
        name={'DoctorListSearch'}
        component={Search}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title="Book consultation"
              leftHeaderOnly={true}
              shadow={false}
              location={true}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name='SelectPatient'
        component={SelectPatient}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Select Patient" leftHeaderOnly={true} />
          ,
        }}
      />
       <HomeStack.Screen
        name={'Search'}
        component={Search}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title="Book consultation"
              leftHeaderOnly={true}
              shadow={false}
              location={true}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const ConsultStackScreen = ({ navigation }) => {
  return (
    <ConsultStack.Navigator initialRouteName="Consult">
      <ConsultStack.Screen
        name={'Consult'}
        component={Consult}
        options={{
          headerShown: false,
          header: () => <MiddleHeader title="Consult" />,
        }}
      />
      <ConsultStack.Screen
        name="ConsultDetails"
        component={ConsultDetails}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Doctor’s profile" />,
        }}
      />
      <ConsultStack.Screen
        name="ConsultDetailsRequest"
        component={ConsultDetailsRequest}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Doctor’s profile" />,
        }}
      />
      <ConsultStack.Screen
        name="ConsultSpecialities"
        component={Specialities}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Specialities" shadow={false} />,
        }}
      />
      <ConsultStack.Screen
        name={'DoctorsList'}
        component={DoctorsList}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Doctors" leftHeaderOnly={true} shadow={false} />
          ),
        }}
      />

      <ConsultStack.Screen
        name="ConsultSlotBooking"
        component={ConsultSlotBooking}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title="Select date & time"
              leftHeaderOnly={true}
              shadow={true}
            />
          ),
        }}
      />
      <ConsultStack.Screen
        name={'Search'}
        component={Search}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title="Book consultation"
              leftHeaderOnly={true}
              shadow={false}
              location={true}
            />
          ),
        }}
      />
      <ConsultStack.Screen
        name={'DoctorListSearch'}
        component={Search}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title="Doctors"
              leftHeaderOnly={true}
              shadow={false}
              location={true}
            />
          ),
        }}
      />
      <ConsultStack.Screen
        name={'ConsultSlotBookingCalendar'}
        component={ConsultSlotBookingCalendar}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Select date and time" leftHeaderOnly={true} />
          ),
        }}
      />
      <ConsultStack.Screen
        name={'SelectPatient'}
        component={SelectPatient}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Select Patient" leftHeaderOnly={true} />
          ),
        }}
      />
    </ConsultStack.Navigator>
  );
};

const MHCStackScreen = ({ navigation }) => {
  return (
    <MHCStack.Navigator>
      <MHCStack.Screen
        name={'MHCScreen'}
        component={MHCScreen}
        options={{
          headerShown: true,
          header: () => <MiddleHeader title="MHC" />,
        }}
      />
    </MHCStack.Navigator>
  );
};

const RecordsStackScreen = ({ navigation }) => {
  return (
    <RecordsStack.Navigator>
      <RecordsStack.Screen
        name={'Records'}
        component={Records}
        options={{
          headerShown: true,
          header: () => <MiddleHeader title="Records" />,
        }}
      />
    </RecordsStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation, route }) => {
  console.log('route.params.status', route.params.status);
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={'Profile}'}
        component={Profile}
        options={{
          headerShown: true,
          header: () => <MiddleHeader title="My profile" />,
        }}
      />
      <ProfileStack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          headerShown: true,
          header: () => <BackHeader title="My account" />,
        }}
      />
      <ProfileStack.Screen
        name="ManageFamily"
        component={ManageFamily}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Manage family added" />,
        }}
      />
      <ProfileStack.Screen
        name="SingleUser"
        component={SingleUser}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Manage family added" />,
        }}
      />
      <ProfileStack.Screen
        name="DeleteProfile"
        component={DeleteProfile}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Delete account" />,
        }}
      />
      <ProfileStack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Payment history" />,
        }}
      />
      <ProfileStack.Screen
        name="TicketGenerated"
        component={TicketGenerated}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Tickets generated" />,
        }}
      />
      <ProfileStack.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,
          header: () => <BackHeader title="About kauvery" />,
        }}
      />
      <ProfileStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Privacy policy" />,
        }}
      />
      <ProfileStack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Terms and conditions" />,
        }}
      />
      <ProfileStack.Screen
        name="ProfileImageUpdatePage"
        component={ProfileImageUpdatePage}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Set profile photo" />,
        }}
      />
      <ProfileStack.Screen
        name="ImageCropperScreen2"
        component={ImageCropperScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const TabImage = ({ imageURL }) => {
  return (
    <Image style={styles.image} resizeMode={'contain'} source={imageURL} />
  );
};

const MainScreens = ({ navigation, status }) => {
  const setLand = useSelector(
    state => state?.loginReducer?.setLandingPageNavigation,
  );
  const AppContextWrapper = ({ navigation, route }) => (
    <AppContext.Consumer>
      {props => <TabScreen st={route.params.status} />}
    </AppContext.Consumer>
  );

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'MainScreens'}
        component={AppContextWrapper}
        initialParams={{ status: status }}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="AddFamilyMobile"
        component={FamilyMembersStackScreen}
        options={{
          headerShown: false,
          header: () => <BackHeader type={1} title="Family Members" />,
        }}
      />
      <MainStack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Checkout" />,
        }}
      />
      <MainStack.Screen
        name="VideoCallScreen"
        component={VideoCallScreen}
        options={{
          headerShown: false,
          // header: () => <BackHeader title="Checkout" />,
        }}
      />
      <MainStack.Screen
        name='RescheduleHospitalVisit'
        component={RescheduleHospitalVisit}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Hospital visit" leftHeaderOnly={true} />,
        }}
      />
      <MainStack.Screen
        name='RescheduleHospitalVisitOnline'
        component={RescheduleHospitalVisit}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Video consultation" leftHeaderOnly={true} />,
        }}
      />
      <MainStack.Screen
        name='RescheduleSlotDetails'
        component={RescheduleSlotDetails}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Select date & time" leftHeaderOnly={true} />,
        }}
      />
      <MainStack.Screen
        name='RescheduleConfirm'
        component={RescheduleConfirm}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Select date & time" leftHeaderOnly={true} />,
        }}
      />
      <MainStack.Screen
        name="RescheduleTermsAndCondition"
        component={TermsAndCondition}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Terms and conditions" />,
        }}
      />

    </MainStack.Navigator>
  );
};

const FamilyMembersStackScreen = ({ navigation }) => {
  return (
    <FamilyMembersStack.Navigator>
      <FamilyMembersStack.Screen
        name={'FamilyMembers'}
        component={AddFamilyMobile}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Add family" />
          ),
        }}
      />
      <FamilyMembersStack.Screen
        name="AddFamilyOtp"
        component={AddFamilyOtp}
        options={{
          headerShown: true,
          header: () => <BackHeader title="OTP verification" />,
        }}
      />
      <FamilyMembersStack.Screen
        name="AddFamilySignup"
        component={AddFamilySignup}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Add family" n={2} />
          ),
        }}
      />
      <FamilyMembersStack.Screen
        name="AddFamilySignupTicket"
        component={AddFamilySignup}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Add family" n={3} />
          ),
        }}
      />
      <FamilyMembersStack.Screen
        name="AddFamilyVerifyDetails"
        component={AddFamilyVerifyDetails}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Verify details" n={2} />,
        }}
      />
      <FamilyMembersStack.Screen
        name="AddFamilyVerifyDetailsPrefill"
        component={AddFamilyVerifyDetailsPrefill}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader title="Add family" n={3} />
          ),
        }}
      />
      <FamilyMembersStack.Screen
        name="AddFamilySelection"
        component={AddFamilySelection}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Select an account" n={2} />,
        }}
      />
      <FamilyMembersStack.Screen
        name="AddFamilyVerifySameUserDetails"
        component={AddFamilyVerifySameUserDetails}
        options={{
          headerShown: true,
          header: () => <BackHeader title="Verify details" n={2} />,
        }}
      />
    </FamilyMembersStack.Navigator>
  );
};

const styles = ScaledSheet.create({
  TabLabelStyle: { fontSize: '11@s', fontFamily: Fonts.Medium },
  TabStyleBar: {
    position: 'absolute',
    height: Platform.OS == 'android' ? SIZES.height / 12 : SIZES.height / 9,
    justifyContent: 'center',
    // backgroundColor:'pink',
    //elevation: 0,
  },
  TabFocusBar: {
    height: '4@vs',
    // width: SIZES.width / 5,
    width: SIZES.width / 3,
    backgroundColor: COLORS.primaryColor,
    // borderRadius: '20@msr',
    // top: '-2.8@vs',
    top: '-3.5@vs',
    //  marginBottom: '4@msr',
  },
  TabParentView: {
    alignItems: 'center',
    backgroundColor: COLORS.whiteColor,
    //backgroundColor:'pink',
    // marginTop: '8@vs',
  },
  TabMarginTop: {
    marginTop: '4@msr',
  },
  TabMarginTop2: {
    marginTop: '8@msr',
  },
  image: {
    width: '24@s',
    height: '24@vs',
  },
  profileImageBefore: {
    width: '23@vs',
    height: '23@vs',
    backgroundColor: '#D9D9D9',
    borderRadius: '40@vs',
  },
});

export { TabScreen, MainScreens };
