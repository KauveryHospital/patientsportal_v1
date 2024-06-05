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
// import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router basename="/">
      <div className="app">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/otp" component={Otp} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/consult" component={Consult} />
          <Route path="/dlist" component={DoctorsList} />
          <Route path="/ddetail" component={DoctorDetail} />
          <Route path="/homespecialities" component={Specialities} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
