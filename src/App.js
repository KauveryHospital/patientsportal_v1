import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Otp from './components/Otp';
import Login from './components/login';
import Signup from './components/Signup';
import Home from './components/Home';
import Consult from './components/Consult';
import DoctorsList from './components/DoctorsList';
import DoctorDetail from './components/DoctorDetail';
import Specialities from './components/Specialities';
import Searchdoc from './components/search';
import SelectPatient from './components/SelectPatient';
import ConsultSlotBooking from './components/ConsultSlotBooking';
import MHCScreen from './components/MHCScreen';
import SpecialitiesDoctor from './components/SpecialitiesDoctors';
import AppointmentBook from './components/AppointmentBook';
import PatientDetails from './components/PatientDetails';
import MhcList from './components/MhcList';
import MhcPackageDetails from './components/MhcPackageDetails';
import MhcBooking from './components/MhcBooking';
import Profile from './components/Profile';
import ManageFamily from './components/ManageFamily';
import AddMember from './components/AddMember';
import RemoveProfile from './components/RemoveProfile';
// import AddMember from './components/AddMember';
import AddMemberNumber from './components/AddMemberNumber';
import MemberOtp from './components/MemberOtp';
import AddMemberSelection from './components/AddMemberSelection';
import MyAccount from './components/MyAccount';
import Records from './components/Records';
import Checkout from './components/Checkout';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutKauvery from './components/AboutKauvery';
import CustomerSupport from './components/CustomerSupport';
import PaymentHistory from './components/PaymentHistory';
import Tickets from './components/Tickets';

const App = () => {
  return (
    <Router basename="/">
      <div className="app">
        <Switch>
          {/* <Route exact path="/" component={Login} /> */}
          <Route path="/otp" component={Otp} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
          <Route path="/consult" component={Consult} />
          <Route path="/dlist" component={DoctorsList} />
          <Route path="/ddetail" component={DoctorDetail} />
          <Route path="/homespecialities" component={Specialities} />
          <Route path="/search" component={Searchdoc} />
          <Route path="/selectpatient" component={SelectPatient} /> 
          <Route path="/consultslotbooking" component={ConsultSlotBooking} />
          <Route path="/mhc" component={MHCScreen} />  
          <Route path="/specialitydoctor" component={SpecialitiesDoctor} /> 
          <Route path="/appointmentbook" component={AppointmentBook} /> 
          <Route path="/patientdetails" component={PatientDetails} /> 
          <Route path="/mhclist" component={MhcList} /> 
          <Route path="/pkgdetails" component={MhcPackageDetails} /> 
          <Route path="/mhcbooking" component={MhcBooking} /> 
          <Route path="/profile" component={Profile} /> 
          <Route path="/managefamily" component={ManageFamily} /> 
          <Route path="/addmember" component={AddMember} /> 
          <Route path="/removeprofile" component={RemoveProfile} /> 
          <Route path="/addmembernumber" component={AddMemberNumber} /> 
          <Route path="/memberotp" component={MemberOtp} /> 
          <Route path="/memberselection" component={AddMemberSelection} /> 
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/records" component={Records} /> 
          <Route path="/checkout" component={Checkout} />  
          <Route path="/termsandconditions" component={TermsAndConditions} />   
          <Route path="/privacypolicy" component={PrivacyPolicy} />   
          <Route path="/aboutkauvery" component={AboutKauvery} />  
          <Route path="/customersupport" component={CustomerSupport} /> 
          <Route path="/paymenthistory" component={PaymentHistory} /> 
          <Route path="/tickets" component={Tickets} />    
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
