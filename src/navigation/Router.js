// Router.js
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppContext } from './AppContext';
import { thunk } from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from '../store/reducers';
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {
    AuthStackScreen,
    // FeatureGuideStackScreen,
    // IntroSliderStackScreen,
    // SetProfileStackScreen,
    // SignupStackScreens,
    // SplashStackScreen,
    // VerifyDetailsPrefillStackScreens,
    // VerifyDetailsStackScreens,
    // MainScreens,
} from './StackScreen'; // Adjust paths as necessary
// import NoNetworkPopup from '../components/modal/NoNetworkPopup'; 
import { NavigationReducer, InitialState } from '../store/reducers/NavigationReducer'; 
// import store from '../store/actions/store';

export const store = createStore(reducers, applyMiddleware(thunk));
const Router = () => {
    const [state, dispatch] = useReducer(NavigationReducer, InitialState);
    const [noInternetPopup, setNoInternetPopup] = useState(false);
console.log('state', state);
    useEffect(() => {
        dispatch({ type: 'Splash', payload: '' });
    }, []);

    useEffect(() => {
        const handleNetworkChange = () => {
            if (!navigator.onLine) {
                setNoInternetPopup(true);
            } else {
                setNoInternetPopup(false);
            }
        };

        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);

        return () => {
            window.removeEventListener('online', handleNetworkChange);
            window.removeEventListener('offline', handleNetworkChange);
        };
    }, []);

    const authContextValue = useMemo(() => ({
        Intro: () => {
            dispatch({ type: 'INTRO', payload: '1' });
        },
        Auth: () => {
            dispatch({ type: 'Authentication', payload: '2' });
        },
        tabLoad: (isProfile) => {
            dispatch({ type: 'DASHBOARD', payload: '3', isProfile: isProfile ? isProfile : '0' });
        },
        SetProfileSat: () => {
            dispatch({ type: 'SetProfileStatus', payload: '4' });
        },
        SignupUser: () => {
            dispatch({ type: 'SIGNUP', payload: '5' });
        },
        UserVerifyDetails: () => {
            dispatch({ type: 'VERIFY_DETAILS', payload: '6' });
        },
        UserVerifyDetailsPrefill: () => {
            dispatch({ type: 'VERIFY_DETAILS_PREFILL', payload: '7' });
        },
        FeatureGuide: () => {
            dispatch({ type: 'FEATURE_GUIDE', payload: '8' });
        },
    }), []);

    const chooseStack = (state, isProfile) => {
        if (state === null || state === '') {
            // return <SplashStackScreen />;
        } else if (state === '1') {
            // return <IntroSliderStackScreen />;
        } else if (state === '2') {
            return <AuthStackScreen />;
        } else if (state === '3') {
            // return <MainScreens status={isProfile} />;
        } else if (state === '4') {
            // return <SetProfileStackScreen />;
        } else if (state === '5') {
            // return <SignupStackScreens />;
        } else if (state === '6') {
            // return <VerifyDetailsStackScreens />;
        } else if (state === '7') {
            // return <VerifyDetailsPrefillStackScreens />;
        } else if (state === '8') {
            // return <FeatureGuideStackScreen />;
        }
    };

    return (
        <AppContext.Provider value={authContextValue} store={store}>
            <Provider store={store}>
            <Switch>
                {chooseStack(state.userToken, state.isProfile)}
            </Switch>
            {/* <NoNetworkPopup
                isModalVisible={noInternetPopup}
                title={'Network error!'}
                content={'Please check your internet connection'}
            /> */}
            </Provider>
        </AppContext.Provider>
    );
};

export default Router;
