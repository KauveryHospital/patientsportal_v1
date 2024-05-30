// StackScreen.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import otp from '../components/Otp';
import Login from '../components/login';
import Home from '../components/Home';
import Consult from '../components/Consult';

// Import other components as necessary

export const AuthStackScreen = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/otp" component={otp} />
  </Switch>
);
// export const FeatureGuideStackScreen = () => <Route path="/feature-guide" component={FeatureGuideComponent} />;
// export const IntroSliderStackScreen = () => <Route path="/intro-slider" component={IntroSliderComponent} />;
// export const SetProfileStackScreen = () => <Route path="/set-profile" component={SetProfileComponent} />;
// export const SignupStackScreens = () => <Route path="/signup" component={SignupComponent} />;
// export const SplashStackScreen = () => <Route exact path="/" component={SplashComponent} />;
// export const VerifyDetailsPrefillStackScreens = () => <Route path="/verify-details-prefill" component={VerifyDetailsPrefillComponent} />;
// export const VerifyDetailsStackScreens = () => <Route path="/verify-details" component={VerifyDetailsComponent} />;
// export const MainScreens = ({ status }) => <Route path="/main" render={(props) => <MainComponent {...props} status={status} />} />;
